import styled from "styled-components";
import image from "../assets/image.jpg";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../context/context";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 90px;
  background-color: #181818;
  bottom: 0;
  left: 0;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
`;
const TrackImage = styled.img`
  width: 56px;
  height: 56px;
`;
const TrackName = styled.span`
  font-weight: 600;
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
`;
const TrackArtist = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #999;
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  /* row-gap: 10px; */
`;
const PlayerCtrl = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 20px;
  span {
    font-size: 20px;
    cursor: pointer;
    &:nth-child(3) {
      font-size: 40px;
      transition: all 0.25s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;
const ProgressContainer = styled.div`
  width: 150%;
  height: 5px;
  border-radius: 3px;
  background-color: green;
  position: relative;
`;
const ProgressPointer = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 100rem;
  background-color: #eee;
  top: -50%;
  left: 0;
  transform: translateY(-15%);
  cursor: pointer;
`;
const ExtraCtrl = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
  ion-icon {
    font-size: 20px;
  }
`;

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};
const Footer = () => {
  const baseURL = "https://api.spotify.com/v1";
  const { data, dispatch } = useContext(DataContext);
  const [curTrack, setTrack] = useState(track);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Home test",
        getOAuthToken: (cb) => {
          cb(data.token);
        },
        volume: 0.5,
      });
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        tranPlayback(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
      });
      player.connect();
    };
  }, []);

  const tranPlayback = (device_id) => {
    axios
      .put(
        `${baseURL}/me/player`,
        {
          device_ids: [device_id],
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((res) => {
        console.log("tranfer playback", res);
      });
  };
  const play = (trackID, position) => {
    axios
      .put(
        `${baseURL}/me/player/play`,
        {
          uris: [`spotify:track:${trackID}`],
          position_ms: position,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPlaying(true);
        console.log("play request", res);
      });
  };
  const pause = () => {
    axios
      .put(
        `${baseURL}/me/player/pause`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((res) => {
        setPlaying(false);
        console.log("pause request", res);
      });
  };
  const getArtistsName = (artists) => {
    artists.reduce((initial, artist) => {
      initial.push(artist.name);
      return initial;
    }, []);
  };
  console.log(curTrack);
  return (
    <Container>
      <TrackInfo>
        <TrackImage src={image} alt="" width={56} height={56} />
        <div>
          <TrackName>{"curTrack?.name"}</TrackName>
          <TrackArtist>
            {"getArtistsName(curTrack?.artists).join()"}
          </TrackArtist>
        </div>
      </TrackInfo>
      <PlayerContainer>
        <PlayerCtrl>
          <span>
            <ion-icon name="repeat"></ion-icon>
          </span>
          <span>
            <ion-icon name="play-skip-back"></ion-icon>
          </span>
          <span>
            <ion-icon name="play-circle"></ion-icon>
          </span>
          <span>
            <ion-icon name="play-skip-forward"></ion-icon>
          </span>
          <span>
            <ion-icon name="shuffle"></ion-icon>
          </span>
        </PlayerCtrl>
        <ProgressContainer>
          <ProgressPointer></ProgressPointer>
        </ProgressContainer>
      </PlayerContainer>
      <ExtraCtrl>
        <ion-icon name="volume-high"></ion-icon>
        <input type="range" id="vol" name="vol" min="0" max="50"></input>
      </ExtraCtrl>
    </Container>
  );
};

export default Footer;
