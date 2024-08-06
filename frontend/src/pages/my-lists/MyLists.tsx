import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Paper,
  Grid,
  Container,
  createTheme,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Close } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import useApiClient from "../../hooks/useApiClient";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import Swal from "sweetalert2";
import { useGetMoviesQuery } from "../../store/rtk-query/moviesApi";
import MovieListItem from "../../components/MovieListItem/index";

const api_url = import.meta.env.VITE_APP_API_URL;
const theme = createTheme();


const styles = {
  root: {
    // overflowX: "hidden",
    maxWidth: "90%",
  },
  addButton: {
    marginLeft: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#17e990",
    color: "#fff",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600,
    margin: "auto",
    borderRadius: theme.spacing(2),
    position: "relative",
  },
  contentContainer: {
    marginTop: "12vh",
    padding: theme.spacing(2),
    //background: "#0495ed",
    background: "#000",
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  contentHeading: {
    marginRight: "auto",
    color: "#fff",
    fontWeight: "bold",
  },
  movieSelect: {
    width: "100%",
  },
  selectedMovies: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: 2,
  },
};

const MyLists = () => {
  //const classes = useStyles();
  const [myLists, setMyLists] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovieTitles, setSelectedMovieTitles] = useState([]); // Store selected movie titles
  const [toEdit, setToEdit] = useState<any>(null);
  const [toDelete, setToDelete] = useState<any>(null);
  const client = useApiClient();
  const user = useAppSelector(selectUser);

  const [movies, setMovies] = useState([]);

  let queryParams = {
    perPage: 10000,
  }

  const { data: moviesData, isLoading: moviesLoading } = useGetMoviesQuery(queryParams)


  useEffect(() => {
    const storedEmail = user?.email;
    document.body.style.overflowX = "hidden";
    setUserEmail(storedEmail);
    if (storedEmail) {
      getMyLists();
    }

    fetchMovies();
  }, []);

  const getMyLists = async () => {
    client
      .getMyList()
      .then((res) => {
        setMyLists(res);
      })
      .catch((err) => {
        console.error(err);
      });
    /*try {
      const res = await axios.get(`${api_url}lists/my-list/${email}`, {
        headers: {
          token: "",
        },
      });
      setMyLists(res.data);
    } catch (err) {
      console.log(err);
    }*/
  };

  const fetchMovies = async () => {
    setMovies(moviesData?.movies)
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setToEdit(null);
    setIsModalOpen(false);
  };

  const handleAddList = async () => {
    try {
      const res = await axios.post(
        `${api_url}lists`,
        {
          title: newListTitle,
          email: userEmail,
          content: selectedMovies,
        },
        {
          headers: {
            token: "",
          },
        }
      );

      if (res.status === 201) {
        setMyLists([...myLists, res.data]);
      }

      setIsModalOpen(false);
      setNewListTitle("");
      setSelectedMovies([]);
      setSelectedMovieTitles([]);
      console.log(selectedMovieTitles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (toEdit) {
      setNewListTitle(toEdit.title);
      setSelectedMovies(
        movies.filter((movie) => toEdit.content.includes(movie._id))
      );
    } else {
      setNewListTitle("");
      setSelectedMovies([]);
    }
  }, [toEdit]);

  const handleMovieSelection = (event) => {
    const selectedMovieIds = event.target.value;

    // Map selected movie ids to an array of objects with _id and title
    const selectedMoviesData = movies
      .filter((movie) => selectedMovieIds.includes(movie._id))
      .map((movie) => ({ _id: movie._id, title: movie.title }));

    setSelectedMovies(selectedMoviesData);

    // Get the selected movie titles
    const selectedTitles = selectedMoviesData.map((movie) => movie.title);

    setSelectedMovieTitles(selectedTitles);
  };

  const updateList = useCallback(() => {
    if (toEdit) {
      const data = {
        title: newListTitle,
        content: selectedMovies.map((movie) => movie._id),
      };
      client
        .updateList(toEdit._id, data)
        .then(() => {
          getMyLists();
          fetchMovies();
          setToEdit(null);

          Swal.fire({
            title: "",
            text: "updated",
            icon: "success",
            timer: 1500,
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "",
            text: "failed",
            icon: "error",
            timer: 1500,
          });
        });
    }
  }, [toEdit, newListTitle, selectedMovies]);

  const deleteList = (id: string | number) => {
    client
      .deleteList(id)
      .then(() => {
        getMyLists();
        fetchMovies();
        setToDelete(null);

        Swal.fire({
          title: "",
          text: "deleted",
          icon: "success",
          timer: 1500,
        });
      })
      .then((err) => {
        console.error(err);
        Swal.fire({
          title: "",
          text: "failed",
          icon: "error",
          timer: 1500,
        });
      });
  };

  return (
    <>
      <Navbar />
      <div
        className='sm:h-[100px]'
      />
      <Container sx={styles.root}>
        {/* <Paper sx={styles.contentContainer}>
          <Typography variant="h4" style={styles.contentHeading}>
            My Lists
          </Typography>

          <Button
            variant="contained"
            sx={styles.addButton}
            className="gradientButton"
            onClick={handleOpenModal}
            startIcon={<Add />}
          >
            Add New List
          </Button>
        </Paper> */}

        <div
          className="leading-[32px]  font-[500] text-[20px] text-white"
        >
          My List
        </div>
        {myLists?.[0] ? <List list={{
          ...myLists?.[0],
          title: ""
        }} /> : undefined}
        {/* <Grid container spacing={2} className='!mt-3 relative'>
          {myLists?.[0]?.content?.map((movieId, index) => (
            <Grid item xs={6} sm={4} md={2} lg={2} key={index}>
              <div className='relative hover:z-[200] hover:!w-[300px] transition-all duration-200 shadow-md'>
                <MovieListItem
                  movieId={movieId}
                  layoutType="grid"
                />
              </div>
            </Grid>
          ))}
        </Grid> */}

      </Container>
    </>
  );
};

export default MyLists;
