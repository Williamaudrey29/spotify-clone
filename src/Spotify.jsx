const baseURL = "https://accounts.spotify.com/authorize";
const clientID = "a511fe18c9b74ada93a2943f33219038";
const redirectURI = "http://localhost:5173/";
const scope = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-read-email",
  "user-read-private",
];
export const URL = `${baseURL}?response_type=token&client_id=${clientID}&scope=${scope.join(
  "%20"
)}&redirect_uri=${redirectURI}`;
