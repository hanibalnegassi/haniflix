import { PlayArrow, AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert 2
import "./featured.scss";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import useApiClient from "../../hooks/useApiClient";
import { addClassNames } from "../../store/utils/functions";

import moviePlaceholderSvg from '../../Assets/svgs/moviePlaceholder.svg'

import { useSelector } from 'react-redux'
import { useDislikeMovieMutation, useGetMovieQuery, useGetRandomMoviesMutation, useLikeMovieMutation } from "../../store/rtk-query/moviesApi";
import { useAddMovieToDefaultListMutation } from "../../store/rtk-query/listsApi";

import {
  IconButton,
  Typography,
} from "@mui/material";

import {
  Check,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown
} from "@mui/icons-material";
import CircularProgress from '@mui/material-next/CircularProgress';
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";
import MovieDetailsFull from "../MovieDetailsFull/index";
import { Movie } from "../../store/types";

type MetaInfoItem = {
  text: string
}

type Props = {
  type: any;
  movieObj?: Movie
}

export default function Featured(props: Props) {
  const { type } = props;
  const client = useApiClient();

  const userReducer = useSelector((state) => state.auth)

  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


  const [getRandomMovie, getRandomMovieState] = useGetRandomMoviesMutation()

  const movieObj = props.movieObj


  useEffect(() => {
    onGetRandomMovie();
  }, [type]);

  const onGetRandomMovie = useCallback(async () => {

    const res = await getRandomMovie(type)

    if (!res?.data) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching content.",
        icon: "error",
      });
    }
  }, [type]);



  return (
    <MovieDetailsFull
      movieId={movieObj ? movieObj?._id : getRandomMovieState?.data?._id}
      movieDataProps={movieObj ? undefined : getRandomMovieState?.data}
    />
  );
}
