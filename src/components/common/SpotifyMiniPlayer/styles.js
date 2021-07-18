import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const SpotifyMiniPlayerWrapper = styled.div`
  width: 100%;
  height: 114px;

  .loading-container {
    width: 114px;
    height: 114px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spotify-player {
    display: flex;
    padding: 12px;

    .spotify-song-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .spotify-song-name {
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 15ch;
      }

      .spotify-play-button {
        display: inline-block;
        font-size: 24px;
        margin-left: 12px;
        .anticon {
          cursor: pointer;
        }
      }
    }

    .spotify-album-art {
      border-radius: 100%;
      overflow: hidden;
      width: 84px;
      height: 84px;
      margin-right: 12px;

      img {
        width: 84px;
        height: 84px;
        object-fit: cover;
      }
    }

    .spotify-artist-name {
      font-size: small;
      white-space: nowrap;
      overflow: hidden;
      max-width: 15ch;
      margin-bottom: 8px;
    }

    .spotify-call-to-action {
      color: ${Theme.COLORS.ON_ACCENT};
      font-weight: 500;

      img {
        margin-right: 4px;
        width: 20px;
      }
    }
  }
`;
