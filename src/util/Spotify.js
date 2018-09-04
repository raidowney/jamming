const clientId = '05fa8d5b27544ebf9684712e38cf7b8d';
const redirectURI = 'https://rdowney-jamming.surge.sh';
const spotifyBaseURL = 'https://api.spotify.com/v1';
let accessToken = '';
let expiresIn = '';

const Spotify = {
  getAccessToken() {
      if (accessToken) {
        return accessToken;
      } else if (window.location.href.match(/access_token=([^&]*)/) &&
             window.location.href.match(/expires_in=([^&]*)/)) {

      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const auth = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      window.location = auth;
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (playlistName === '' || trackURIs.length == 0) {
      return;
    }

    accessToken = this.getAccessToken();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `application/json`
    };
    const userId = await fetch(`${spotifyBaseURL}/me`, {headers: headers})
      .then(response => {
        if (response.ok) {
          return response.json();
        } throw new Error ('Request failed!');
      }, networkError => {
        console.log(networkError.message)
      }).then(jsonResponse => {
        return jsonResponse.id
      });

    try{
      return await fetch(`${spotifyBaseURL}/users/${userId}/playlists`,
        {
          method: 'POST',
          body: JSON.stringify({name: playlistName}),
          headers: headers
        }
      ).then(response => {
        if (response.ok) {
           return response.json();
        }throw new Error ('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(playlistResponse => {
        const playlistID = playlistResponse.id;

        return fetch(`${spotifyBaseURL}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          body: JSON.stringify({uris: trackURIs}),
          headers: headers
         });
      })
     } catch(error){
       console.log(error);
     }
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(`${spotifyBaseURL}/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      }
    })
  }
};

export default Spotify;
