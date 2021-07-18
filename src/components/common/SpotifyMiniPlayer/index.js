import {
  LoadingOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SpotifyMiniPlayerWrapper } from "./styles";
import SpotifyIcon from "../assets/spotify-logo.png";
import { LoadMoreWrapper } from "../../Splits/ConversationView/styles";
import { Spin } from "antd";

export default function SpotifyMiniPlayer({ url }) {
  const [spotifyMeta, setSpotifyMeta] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef(new Audio());

  useEffect(() => {
    let a = audioElem.current;
    a.onended = () => setIsPlaying(false);

    return () => {
      a.pause();
      a.onended = null;
    };
    // eslint-disable-next-line
  }, [spotifyMeta]);

  const playPauseAudio = () => {
    let a = audioElem.current;
    console.log(isPlaying);
    if (isAudioPlaying(a)) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play();
      setIsPlaying(true);
    }
  };
  const isAudioPlaying = (audelem) => {
    return !audelem.paused;
  };

  useEffect(() => {
    const urlSegments = new URL(url).pathname.split("/");
    const trackId = urlSegments.pop() || urlSegments.pop(); // Handle potential trailing slash

    axios
      .get("/rest/v1/spotify/getTrackInfo", {
        params: {
          track_id: trackId,
        },
      })
      .then((result) => {
        if (result.data.status === 200) {
          audioElem.current.src = result.data.result.preview_url;
          setSpotifyMeta(result.data.result);
          console.log(result.data.result.preview_url);
        }
      });

    // eslint-disable-next-line
  }, []);

  const loadingIcon = (
    <LoadMoreWrapper>
      <LoadingOutlined style={{ fontSize: 24 }} spin />
    </LoadMoreWrapper>
  );

  if (!spotifyMeta)
    return (
      <SpotifyMiniPlayerWrapper>
        <div className="loading-container">
          <Spin indicator={loadingIcon} />
        </div>
      </SpotifyMiniPlayerWrapper>
    );

  return (
    <SpotifyMiniPlayerWrapper>
      <div className="spotify-player">
        <div className="spotify-album-art">
          <img src={spotifyMeta.album.images[1].url} alt={spotifyMeta.name} />
        </div>
        <div className="spotify-meta-container">
          <div className="spotify-song-title">
            <div class="spotify-song-name">{spotifyMeta.name}</div>
            <div
              aria-label="play/pause"
              onClick={playPauseAudio}
              className="spotify-play-button"
            >
              {isPlaying === true ? (
                <PauseCircleFilled />
              ) : (
                <PlayCircleFilled />
              )}
            </div>
          </div>
          <div className="spotify-artist-name">
            {spotifyMeta.artists[0].name}
          </div>
          <a
            className="spotify-call-to-action"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={SpotifyIcon} alt="" Play on Spotify />
            Play on Spotify
          </a>
        </div>
      </div>
    </SpotifyMiniPlayerWrapper>
  );
}
