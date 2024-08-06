import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
  Check
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import moviePlaceHolderSvg from '../../../Assets/svgs/moviePlaceholder.svg'
import { addClassNames } from "../../../store/utils/functions";
import { useDislikeMovieMutation, useLikeMovieMutation } from "../../../store/rtk-query/moviesApi";

import Swal from 'sweetalert2'
import { useAddMovieToDefaultListMutation } from "../../../store/rtk-query/listsApi";

import { useNavigate } from 'react-router-dom'

export default function SearchListItem({ movie, refetch }) {
  const navigate = useNavigate()

  const [likeMovie, likeMovieState] = useLikeMovieMutation()
  const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation()
  const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation()


  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onLikeMovie = async () => {
    const res = await likeMovie(movie?._id)

    if (!res?.data) {
      showSwal("Error Liking movie", '', "error");
      return
    }
    refetch?.()
  }

  const onDislikeMovie = async () => {
    const res = await dislikeMovie(movie?._id)

    if (!res?.data) {
      showSwal("Error disliking movie", '', "error");
      return
    }
    refetch?.()
  }

  const onAddToList = async () => {
    const res = await addToMyList(movie?._id)

    if (!res?.data) {
      showSwal("Error encountered", '', "error");
      return
    }
    refetch?.()
    //  showSwal("Added to list", '', 'success')
  }

  // Trim the description to a maximum of 100 characters
  const trimmedDesc =
    movie?.desc && movie.desc.length > 80
      ? `${movie.desc.slice(0, 80)}...`
      : movie?.desc;

  const renderGenres = () => {

    return (<div>
      {movie?.genre?.map((_genre, index) => {
        return <span

          key={_genre?._id}>{_genre?.title}{index + 1 != movie?.genre?.length ? ', ' : ''}</span>
      })}
    </div>)
  }

  function formatNumber(number) {

    if (number < 1000) {
      return number.toString(); // No abbreviation for numbers less than 1000
    } else if (number < 1000000) {
      return `${(number / 1000).toFixed(1)}k`; // Abbreviate thousands with "k"
    } else {
      return `${(number / 1000000).toFixed(1)}M`; // Abbreviate millions with "M"
    }
  }


  return (
    <Card>
      <Link to={`/watch/${movie._id}`}>
        <div className='h-[200px]'>
          <CardMedia
            component="img"
            className='h-full'
            alt={movie?.title}
            image={movie?.img ? movie?.img : moviePlaceHolderSvg}
            title={movie?.title}
          />
        </div>
      </Link>
      <CardContent>
        <Typography variant="h6" component="div">
          {movie?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {movie?.duration} | +{movie?.limit} | {movie?.year}
        </Typography>
        <Typography variant="body2" paragraph>
          {trimmedDesc}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {
            renderGenres()
          }
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => navigate(`/watch/${movie?._id}`)}
          aria-label="play">
          <PlayArrow />
        </IconButton>
        <IconButton
          onClick={onAddToList}
          aria-label="add">
          {movie?.isInDefaultList ? <Check /> : <Add />}
        </IconButton>
        <IconButton
          onClick={onLikeMovie}
          className='flex gap-1'
          aria-label="thumb up">
          {
            movie?.currentUserLiked ? <ThumbUp /> : <ThumbUpAltOutlined />
          }
          <div className='text-sm'>{formatNumber(movie?.likesCount)}</div>
        </IconButton>
        <IconButton
          onClick={onDislikeMovie}
          className='flex gap-1'
          aria-label="thumb down">
          {
            movie?.currentUserDisliked ? <ThumbDown /> : <ThumbDownOutlined />
          }
          <div className='text-sm'>{formatNumber(movie?.dislikesCount)}</div>

        </IconButton>
      </CardActions>
    </Card>
  );
}
