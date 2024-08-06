import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
const api_url = import.meta.env.VITE_APP_API_URL;

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [movie, setMovie] = useState<any>({});
  const client = useApiClient();
  const [isLike, setIsLike] = useState<boolean | null>(null);
  const [trailer, setTrailer] = useState<string>("");
  const navigate = useNavigate();

  const getMovie = () => {
    client
      .getMovie(item)
      .then((res: any) => {
        setMovie(res);
        setTrailer(res.trailer);
        setIsLike(res.like);
      })
      .then((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMovie();
    /*const getMovie = async () => {
      try {
        const res = await axios.get(api_url + "movies/find/" + item, {
          headers: {
            token: "",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log("An error occured: " + err);
      }
    };
    getMovie();*/
  }, [item]);

  const applyLikeInFrontend = (action: "like" | "dislike") => {
    setIsLike((cur) => {
      if (cur == null && action == "like") return true;
      if (cur == null && action == "dislike") return false;
      if (cur == true && action == "like") return null;
      if (cur == true && action == "dislike") return false;
      if (cur == false && action == "like") return true;
      if (cur == false && action == "dislike") return null;
    });
  };

  const like = useCallback(() => {
    client
      .likeMovie(item)
      .then(() => { })
      .catch((err) => {
        console.error(err);
      });
  }, [item, client]);

  const dislike = useCallback(() => {
    client
      .dislikeMovie(item)
      .then(() => { })
      .catch((err) => {
        console.error(err);
      });
  }, [item, client]);

  // const trailer = movie?.trailer;
  return (
    <>
      {/*<Link to={{ pathname: "/watch", movie: movie }}>*/}
      <div
        className="listItem"
        // style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.img} alt="" />
        <PlayArrow className="playArrow" />
        <h4 className="title">{movie.title}</h4>
        <div
          style={{
            background: "rgb(0, 0, 0, 0.5)",
            position: "absolute",
            width: "100%",
            height: "100%",
            //userSelect: "none",
          }}
          className="details"
        >
          <div
            style={{
              // background: "yellow",
              height: "50%",
              position: "absolute",
              overflow: "hidden",
              bottom: 0,
              textOverflow: "ellipsis",
              fontSize: 10,
              lineHeight: 1.3,
              margin: 5,
            }}
          >
            <div style={{ display: "flex" }}>
              <Link
                to={`/watch/${movie._id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div style={{ width: "90%" }}>
                  <h4>{movie.title}</h4>
                  <span>
                    {movie?.desc?.length >= 100
                      ? movie?.desc?.substring(0, 100) + "..."
                      : movie?.desc}
                  </span>
                </div>
              </Link>
              <div style={{ width: "10%" }}>
                <div
                  onClick={() => {
                    applyLikeInFrontend("like");
                    like();
                  }}
                  style={{ marginBottom: 10 }}
                >
                  {isLike === true ? (
                    <ThumbUp
                      className="icon"
                      style={{ width: 20, height: 15, margin: 0 }}
                    />
                  ) : (
                    <ThumbUpAltOutlined
                      className="icon"
                      style={{ width: 20, height: 15, margin: 0 }}
                    />
                  )}
                </div>
                <div
                  onClick={() => {
                    applyLikeInFrontend("dislike");
                    dislike();
                  }}
                >
                  {isLike === false ? (
                    <ThumbDown
                      className="icon"
                      style={{ width: 20, height: 15, margin: 0 }}
                    />
                  ) : (
                    <ThumbDownOutlined
                      className="icon"
                      style={{ width: 20, height: 15, margin: 0 }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*</Link>*/}
    </>
  );
}
