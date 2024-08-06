import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./watch.scss";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";

import { Helmet } from "react-helmet";

export default function WatchPopup({ movieToPlay, onLeaveMovie }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const client = useApiClient();

  const getMovie = (id: string) => {
    client
      .getMovie(id)
      .then((res) => {
        setMovie(res);
        console.log(res);
      })
      .then((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMovie(movieToPlay?.id);
  }, [movieToPlay?.id]);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="watch ">
        <div className="back cursor-pointer" onClick={onLeaveMovie}>
          <ArrowBackOutlined />
          Go Back
        </div>
        <VideoPlayer isEnded={onLeaveMovie} videoId={movieToPlay?._id} videoUrl={movieToPlay?.video} isTrailer={false} />
      </div>
    </>
  );
}
