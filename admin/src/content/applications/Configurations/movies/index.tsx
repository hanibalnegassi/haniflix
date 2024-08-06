import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Drawer,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@mui/material';
import AddMovieForm from './forms/AddMovieForm';
import { Close, Delete, Edit } from '@mui/icons-material';
import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import toast from 'react-hot-toast';
import { useDeleteMovieMutation, useGetMoviesQuery } from 'src/store/rtk-query/moviesApi';
import MovieSortPopup from 'src/components/SortFilters/MovieSortPopup';

import { useFormik } from 'formik';

import spinnerSvg from 'src/assets/svgs/spinner.svg'
import Pagination from 'src/components/Pagination';

import { BiSearch } from "react-icons/bi";

import { SocketContext } from 'src/contexts/SocketContext'
import { useCheckScrapingMutation, useScrapeAllMoviesMutation, useStopScrapingMutation } from 'src/store/rtk-query/scraperApi';
import { useSyncMoviesToDbMutation } from 'src/store/rtk-query/miscApi';


function Movies() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [items, setItems] = useState<Movie[]>([]);
  const [toEdit, setToEdit] = useState<Movie | null>(null);
  const [toDelete, setToDelete] = useState<Movie | null>(null);

  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const client = useApiClient();

  const [totalMoviesProcessed, setTotalProcessed] = React.useState<undefined | number>(undefined)
  const [totalMoviesToProcess, setTotalToProcess] = React.useState<undefined | number>(undefined)
  const [lastMovieProcessed, setLastMovie] = React.useState<undefined | any>(undefined)

  const { socket } = React.useContext(SocketContext)

  //filter
  const [showSortFilter, setShowSort] = React.useState(false)
  const initialFormValues = {
    activeSort: ''
  }
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
    }
  })

  const itemsPerPage = 20;
  const [page, setPage] = React.useState(1);


  let queryParams = {
    ...(formik.values.activeSort && { orderBy: formik.values.activeSort }),
    perPage: itemsPerPage,
    page,
    searchTerm
  }

  const { data: moviesData, isLoading: moviesLoading, refetch } = useGetMoviesQuery(queryParams)

  const [deleteMovie, deleteMovieState] = useDeleteMovieMutation()
  const [scrapeAllMovies, scrapeAllMoviesState] = useScrapeAllMoviesMutation()
  const [syncMovies, syncMoviesState] = useSyncMoviesToDbMutation()
  const [checkScraping, checkScrapingState] = useCheckScrapingMutation()
  const [stopScraping, stopScrapingState] = useStopScrapingMutation()

  const pageCount = moviesData?.totalMovies
    ? Math.ceil(moviesData.totalMovies / queryParams.perPage)
    : 0;

  React.useEffect(() => {
    refetch()
    onCheckScraping()
  }, [])

  React.useEffect(() => {
    socket?.on("scrapeDetails", (message) => {
      setTotalProcessed(message?.processed)
      setTotalToProcess(message?.total)
      if (message?.movie) {
        setLastMovie(message?.movie)
      }
    });
  }, [socket])

  const onCheckScraping = async () => {
    const res = await checkScraping()

    if (res?.data) {
      if (res?.data?.total) {
        setTotalToProcess(res?.data?.total)
      }
      if (res?.data?.processed) {
        setTotalProcessed(res?.data?.processed)
      }
      // toast.success('Scraping completed successfully', { position: 'top-right' });
    }
    // else {
    //   toast.error('Error encountered during scraping', { position: 'top-right' });
    // }
  }

  const getData = useCallback(() => {
    console.log('callback')
    refetch()
    // client.getMovies().then((data) => {
    //   toast.dismiss();
    //   setItems(data);
    // });
  }, []);

  const getItemFromId = useCallback(
    (id: number | string) => {
      return items.find((item) => item._id === id);
    },
    [items]
  );
  const deleteItem = useCallback((item) => {
    if (item == null) return;
    // toast.loading('loading...', { position: 'top-right' });

    deleteMovie(item?._id)
      .then(() => {
        toast.dismiss();
        toast.success('deleted', { position: 'top-right' });
        setToDelete(null);

        refetch()
        // getData();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
        setToDelete(null);
      });
  }, []);

  const onStopScraping = async () => {

    const res = await stopScraping()

    if (res?.data) {
      toast.success(res?.data?.message || 'Scraping stopped successfully', { position: 'top-right' });
    }
    else {
      toast.error(res?.error?.data?.message || 'Error encountered while stopping', { position: 'top-right' });
    }
  }

  const onScrapeAllMovies = async (type) => {

    const body = {
      type
    }

    const res = await scrapeAllMovies(body)

    if (res?.data) {
      toast.success('Scraping completed successfully', { position: 'top-right' });
    }
    else {
      toast.error(res?.error?.data?.message || 'Error encountered during scraping', { position: 'top-right' });
    }
  }

  const onSyncMovies = async () => {

    const res = await syncMovies({})

    if (res?.data) {
      toast.success('Sync completed successfully', { position: 'top-right' });
    }
    else {
      toast.error(res?.error?.data?.message || 'Error encountered during sync', { position: 'top-right' });
    }
  }



  useEffect(() => {
    if (toEdit != null) {
      const item = toEdit;

      if (item) setOpenAddModal(true);
      else setOpenAddModal(false);
    }
  }, [toEdit]);

  useEffect(() => {
    if (!openAddModal) setToEdit(null);
  }, [openAddModal]);

  const handlePageChange = (data) => {
    const selectedPage = (parseInt(data?.selected) + 1) || 0;
    setPage(selectedPage)
  };

  // Function to handle changes in searchTerm
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setPage(1)
  };


  const renderScraperInfo = () => {

    return (
      <div className='w-full px-7 mt-2 flex gap-4 items-center'>
        <div className='space-y-2 flex flex-col'>
          <Button
            className='!h-[30px] w-[200px]'
            variant="contained" onClick={() => onSyncMovies()}>
            {
              syncMoviesState.isLoading ? "sync in progress.." : 'Sync Movies To Db'
            }
          </Button>
          <Button
            className='!h-[30px] w-[100px]'
            variant="contained" onClick={() => onScrapeAllMovies("all")}>
            Pull All
          </Button>
          {/* <Button
            className='!h-[30px] w-[150px]'
            variant="contained" onClick={() => onScrapeAllMovies("failed_movies")}>
            Pull Red Font(s)
          </Button> */}

        </div>
        <div className='text-sm w-full flex gap-[50px] items-center'>
          {
            totalMoviesProcessed || totalMoviesToProcess ?
              <div>
                <div>
                  {totalMoviesProcessed} of {totalMoviesToProcess} movies processed
                </div>
                <div className='mt-1 text-xs'>
                  {lastMovieProcessed ?
                    <>
                      <div >
                        {lastMovieProcessed?.title}
                      </div>
                      <div
                      >success: <span style={{
                        color: lastMovieProcessed?.success == true ? 'green' : 'red'
                      }}>{lastMovieProcessed?.success?.toString()}</span>
                      </div>
                      <div
                      >Retries: <span >{lastMovieProcessed?.retryCount}</span>
                      </div>
                    </>
                    : undefined
                  }
                </div>
              </div>
              : undefined
          }
          {scrapeAllMoviesState.isLoading && <img src={spinnerSvg} alt="Spinner" />}
          {/* <div></div>  */}
          {
            totalMoviesProcessed || totalMoviesToProcess ?
              <Button
                // style={{ backgroundColor: 'red', marginLeft: 'auto' }}
                className='!mr-10 !bg-[red] !ml-[auto] absolute'
                variant="contained" onClick={onStopScraping}>
                {stopScrapingState.isLoading ? '' : "Cancel"}
              </Button>
              :
              <div></div>
          }
        </div>
      </div>
    )
  }

  let input_class =
    "text-[#030424] max-w-[400px] mx-4 bg-[#fff] border-2 border-[#E7E7E7] hover:border-[#AAAAAA] focus-within:border-[#AAAAAA] p-2 pl-[22px] font-medium rounded-[11px] text-[18px] flex items-center h-[44px] min-w-[150px] justify-between";



  return (
    <>
      <Helmet>
        <title>Movies - Configurations</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <div className='px-7 flex flex-wrap sm:flex-nowrap w-full '>
            <div className='flex gap-2'>
              <Button variant="contained" onClick={() => setOpenAddModal(true)}>
                Add Movie
              </Button>

            </div>
            <div className={`${input_class} flex-1`}>
              <input
                placeholder="e.g Spiderman"
                className="w-full h-full"
                value={searchTerm ? searchTerm : ""}
                onChange={handleSearch}
              />
              <BiSearch size={22} color="#B3B3B3" />
            </div>
            <MovieSortPopup
              open={showSortFilter}
              onClick={() => setShowSort(!showSortFilter)}
              initialValues={initialFormValues}
              formik={formik}
            />
            {(moviesLoading || deleteMovieState.isLoading) ?
              <img src={spinnerSvg} alt="Spinner" />
              : undefined}
          </div>
          {renderScraperInfo()}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table /*sx={{ minWidth: 650 }}*/ aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Link</TableCell>
                    <TableCell align="right">is serie</TableCell>
                    <TableCell align="right">Genres</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moviesData?.movies?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" className={`${row?.failedDuringScrape ? '!text-[red]' : ''}`} scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="right">
                        <a href={row.video} target="_blank">see</a>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.isSeries ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align="right">
                        {row.genre?.map((_genre, index) => {
                          return <span className="capitalize" key={_genre?._id}>
                            {' '}{_genre?.title}{row.genre.length != (index + 1) ? ',' : undefined}
                          </span>
                        })}
                        {/*row.tags?.map((tag) => (
                          <Chip
                            key={tag.id}
                            color="primary"
                            label={tag.name}
                            sx={{ marginLeft: 1 }}
                          />
                        ))*/}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ p: '10px' }}
                          aria-label="menu"
                          onClick={() => setToEdit(row)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ p: '10px' }}
                          onClick={() => setToDelete(row)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={"flex items-center justify-center"}>
              <Pagination
                onPageChange={handlePageChange}
                pageCount={pageCount}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={openAddModal}
          onClose={() => {
            setOpenAddModal(false);
          }}
        >
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              id="modal-modal-title"
              variant="h2"
              component="h2"
              align="center"
              marginTop={3}
            >
              {toEdit ? 'Update a movie' : 'Add a movie'}
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 5,
                  cursor: 'pointer'
                }}
                onClick={() => setOpenAddModal(false)}
              >
                <Close />
              </span>
            </Typography>
            <Box padding={5}>
              <AddMovieForm
                callback={getData}
                item={toEdit ? toEdit : null}
              />
            </Box>
          </Box>
        </Drawer>

        <Dialog
          open={toDelete != null}
          onClose={() => setToDelete(null)}
          aria-labelledby="delete tag group"
          aria-describedby="Dialog displayed to confirm tag group delete"
        >
          <DialogTitle id="alert-dialog-title">Delete movie</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete {toDelete?.title} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setToDelete(null)}>Cancel</Button>
            <Button onClick={() => deleteItem(toDelete)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Movies;
