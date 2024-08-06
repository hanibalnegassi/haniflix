import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./watch-trailer.scss";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";

import { Helmet } from "react-helmet";

export default function WatchTrailer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const client = useApiClient();
  const params = useParams();


  const getMovie = (id: string) => {
    client
      .getMovie(id)
      .then((res) => {
        setMovie(res);
      })
      .then((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMovie(params.id);
  }, [params.id]);
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="watch">
        <div
          className="back cursor-pointer" onClick={handleGoBack}>
          <ArrowBackOutlined />
          Go Back
        </div>
        <VideoPlayer videoId={movie?._id} videoUrl={movie?.trailer} isTrailer />
      </div>
    </>
  );
}
