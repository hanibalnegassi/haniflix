import { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
} from "@mui/material";
import Pagination from "./Pagination";
import MovieListItem from "./MovieListItem";
import { useGetGenresQuery } from "../store/rtk-query/genresApi";
import { useGetMoviesQuery } from "../store/rtk-query/moviesApi";
import Icon from "./icon";
import { Movie } from "../store/types";
import { motion, AnimatePresence } from "framer-motion";
import WatchPopup from "../pages/watchPopup/WatchPopup";


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

const getCurrentYear = () => new Date().getFullYear();

const years = Array.from({ length: getCurrentYear() - 1900 + 1 }, (_, i) => 1900 + i).reverse();

const GenreResults = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [movieYear, setMovieYear] = useState<number | undefined>(undefined);
  const navigate = useNavigate()
  const [movieToPlay, setMovieToPlay] = useState();
  const [playerAxis, setPlayerAxis] = useState({ x: 0, y: 0 });
  const { id: genreId } = useParams();
  const { data: genresData, isLoading: genresLoading, error: genresError } = useGetGenresQuery({}, { refetchOnMountOrArgChange: true });

  const itemsPerPage = 2000;
  const [page, setPage] = useState(1);

  const queryParams = {
    genreId,
    perPage: itemsPerPage,
    page,
    searchTerm: search,
    ...(movieYear && { movieYear }),
  };

  const { data: moviesData, isLoading: moviesLoading, error: moviesError, refetch } = useGetMoviesQuery(queryParams, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const pageCount = moviesData?.totalMovies
    ? Math.ceil(moviesData.totalMovies / queryParams.perPage)
    : 0;

  const selectedGenre = useMemo(() => {
    if (!genresData) return undefined;
    return genresData?.genres?.find((item) => item?._id === genreId);
  }, [genresData, genreId]);

  const handlePageChange = (data) => {
    const selectedPage = parseInt(data?.selected) + 1 || 0;
    setPage(selectedPage);
  };

  const handleSearch = (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    setSearch(searchString);
  };

  const handleYearChange = (e) => {
    const year = e.target?.value;
    setMovieYear(year);
  };


  if (genresError || moviesError) {
    return <div>Error loading data</div>;
  }

  const onClickPlayMovie = (movie: Movie, axis: any) => {
    onPlayMovie?.(movie, axis);
  };


  const onPlayMovie = (movie, axis) => {
    setTimeout(() => {
      setMovieToPlay(movie);
    }, 100);
    setPlayerAxis(axis);
  };

  const onLeaveMovie = (movie) => {
    setMovieToPlay(null);
  };
  const playerVariant = {
    hidden: {
      // scale: 1,
      borderRadius: 20,
      x: "-50%",
      y: "-50%",
      width: "11vw",
      height: "13.5vw",
      opacity: 0.2,
      left: playerAxis.x,
      top: playerAxis.y,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    visible: {
      // scale: 1,
      borderRadius: 0,
      x: "-50%",
      y: "-50%",
      width: "100vw",
      height: "100vh",
      opacity: 1,
      left: "50%",
      top: "50%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (

    <div className={`home flex p-3 gap-3 relative`}>
      <div className=" homedarkbg m-auto fixed left-0 top-0 right-0 bottom-0">
        <AnimatePresence>
          {movieToPlay && (
            <motion.div
              key={"MoviePlayer"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={playerVariant}
              className="fixed z-[400] overflow-hidden"
              style={{
                left: `${playerAxis.x}px`,
                top: `${playerAxis.y}px`,
              }}
            >
              <WatchPopup
                movieToPlay={movieToPlay}
                onLeaveMovie={onLeaveMovie}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full h-full relative z-[1] overflow-x-hidden	 overflow-y-scroll CustomScroller">
          <div className="w-[calc(100%-20px)] h-[calc(100vh-20px)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-fit flex-grow flex-shrink rounded-2xl p-6 xl:p-10 flex flex-col gap-4 sm:gap-6 xl:gap-5">

              <div className="flex gap-2 sm:flex-row justify-between relative z-10">
                <div className="flex gap-6 text-white ">
                  <button className="text-white "
                    // style={{marginLeft:"-1px"}}
                    onClick={() => navigate('/')} onTouchStart={(e) => { e.preventDefault(); navigate('/') }}>
                    <Icon name={"Home"} />
                  </button>
                </div>

                <div
                  className={`inputWrapperHover relative flex items-center w-72 px-3 bg-dark gap-2 py-3  overflow-hidden group duration-500`}
                >
                  <Icon name={"Search"} />
                  <input
                    type="text"
                    placeholder="Search"
                    className="min-w-0 bg-transparent placeholder:text-muted text-white w-56 absolute left-12"
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              {/* <FormControl>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                id="year-select"
                value={movieYear || ""}
                label="Year"
                onChange={handleYearChange}
                className="bg-white h-[45px] w-[90px] text-black"
                sx={{ color: 'black' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

              <p className="text-base xl:text-lg capitalize">{selectedGenre?.title}</p>
              {moviesData?.movies?.length === 0 &&
                (search !== "" || movieYear !== undefined) && (
                  <h1 className="text-white mt-6">No Movies Found...</h1>
                )}

              <Grid container spacing={2} className="mt-3 sm:mx-[20px] relative">
                {moviesData?.movies?.map((movie, index) => (
                  <Grid item xs={6} md={12 / 7} key={index}>
                    <div className="relative hover:z-[200] shadow-md">
                      <MovieListItem
                        movieObj={movie}
                        movieId={movie._id}
                        // onHover={handleHover}
                        refetchFn={refetch}
                        layoutType="grid"
                        onPlayMovie={onClickPlayMovie}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
              {/* <div className="flex items-center justify-center">
              <Pagination
                onPageChange={handlePageChange}
                pageCount={pageCount}
                itemsPerPage={itemsPerPage}
              />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreResults;
