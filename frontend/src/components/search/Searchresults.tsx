import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SearchListItem from "./searchlistItem/SearchListItem";
import { addClassNames } from "../../store/utils/functions";
import { useGetMoviesQuery } from "../../store/rtk-query/moviesApi";
import MovieListItem from "../MovieListItem/index";

import { useLocation } from 'react-router-dom';

import {
  SearchIcon
} from '../../Assets/svgs/tsSvgs'

const api_url = import.meta.env.VITE_APP_API_URL;

import styles from './search.module.scss'
import List from "../list/List";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5vh",
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

const Searchresults = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();

  React.useEffect(() => {
    if (location.state.search) {
      setSearch(location.state.search)
    }
  }, [location.state])


  let queryParams = {
    searchTerm: search
  }

  const { data: moviesData, isLoading: moviesLoading, refetch, isFetching } = useGetMoviesQuery(queryParams, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  })

  const handleSearch = (e) => {
    const searchString = e.target.value.toLowerCase();
    setSearch(searchString);
  };

  const { filteredMovies, moreToExplore } = React.useMemo(() => {
    if (search?.trim() == '') return []

    let filtered = moviesData?.movies

    //render only first 4 results
    // Render only first 4 results
    const firstFour = filtered?.slice(0, 4);
    const moreToExplore = filtered?.slice(4, 8);

    return {
      filteredMovies: firstFour,
      moreToExplore: moreToExplore
    }
  }, [search, moviesData])

  let listCarouselData = {
    content: []
  }

  if (filteredMovies) {
    let content = filteredMovies?.map((movie) => movie?._id)
    listCarouselData.content = content
  }

  const renderMoreToExplore = () => {
    if (!moreToExplore || moreToExplore?.length === 0) return;

    return (
      <div className="flex items-center space-x-[8px] space-y-[5px] flex-wrap mt-5">
        <div className="text-[20px] text-[#B8B4B4] font-[500]">
          More to explore:
        </div>
        {moreToExplore?.map((movie) => (
          <div
            className="cursor-pointer h-[40px] px-[13px] flex items-center bg-[#FFFFFF1A] rounded-[50px] border border-[#FFFFFF1A]"
            key={movie.id}
            onClick={() => {
              setSearch(movie.title)
            }}
          >
            {movie.title.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className='w-[3.4px]' />} {/* Add space between words */}
                {search.split(" ").includes(word.toLowerCase()) ? (
                  <span className="font-[600]">{word}</span>
                ) : (
                  <span className="font-[300]">{word}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  };



  return (
    <Container className={classes.root}>
      <div className={styles["inputWrapper"]}>
        <div className=''>
          <SearchIcon className="icon" />
        </div>
        <input
          placeholder="Search movies"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {renderMoreToExplore()}
      {filteredMovies?.length === 0 && search !== "" && (
        <h1 className='text-white'>No Movies Found...</h1>
      )}


      {listCarouselData ? <List list={listCarouselData} /> : undefined}


      {/* <Grid container spacing={2} className=' !mt-3'>
        {filteredMovies?.map((movie, index) => (
          <Grid item xs={6} sm={4} md={2} lg={2} key={index}>
            <div className='relative hover:z-[200] shadow-md'>
              <MovieListItem
                movieObj={movie}
                refetchFn={refetch}
                layoutType="grid"
              />
            </div>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
};

export default Searchresults;
