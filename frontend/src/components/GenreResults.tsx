import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SearchListItem from "../components/search/searchlistItem/SearchListItem";


import { addClassNames } from "../store/utils/functions";
import { useGetMoviesQuery } from "../store/rtk-query/moviesApi";

import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { useGetGenresQuery } from "../store/rtk-query/genresApi";


const api_url = import.meta.env.VITE_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "12vh",
    width: "85%",
    margin: "auto",
    color: "white",
    gap: "2",
    minHeight: "calc(100vh - 56px)",
    marginBottom: "56px",
  },
  input: {
    width: "100%",
    marginBottom: "2rem",
    "& input": {
      color: "black",
    },
  },
}));

const GenreResults = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const { id: genreId } = useParams();
  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()

  const itemsPerPage = 20;
  const [page, setPage] = React.useState(1);

  let queryParams = {
    genreId,
    perPage: itemsPerPage,
    page,
  }

  const { data: moviesData, isLoading: moviesLoading } = useGetMoviesQuery(queryParams)

  const pageCount = moviesData?.totalMovies
    ? Math.ceil(moviesData.totalMovies / queryParams.perPage)
    : 0;


  const selectedGenre = React.useMemo(() => {
    if (!genresData) return;

    let selected = genresData?.genres?.find((item) => item?._id == genreId)
    return selected
  }, [genresData, genreId])



  const handlePageChange = (data) => {
    const selectedPage = data?.selected || 0;
    setPage(selectedPage)
  };



  return (
    <Container className={classes.root}>


      {moviesData?.movies?.length === 0 && search !== "" && (
        <h1 className='text-white'>No Movies Found...</h1>
      )}

      <div className='text-4xl font-bold mt-2 capitalize'>
        {selectedGenre?.title} genre
      </div>

      <Grid container spacing={2} className='!mt-3'>
        {moviesData?.movies?.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SearchListItem movie={movie} />
          </Grid>
        ))}
      </Grid>
      <div className={"flex items-center justify-center"}>
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Container>
  );
};

export default GenreResults;