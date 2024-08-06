import React, { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
  generateUtilityClass,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import { TagsInput } from 'react-tag-input-component';
import toast from 'react-hot-toast';
// import { DatePicker } from '@mui/x-date-pickers';

import spinnerSvg from '../../../../../assets/svgs/spinner.svg'
import { useScrapeWebsiteMutation } from 'src/store/rtk-query/scraperApi';
import { useCreateMovieMutation, useUpdateMovieMutation } from 'src/store/rtk-query/moviesApi';
import GenresDropdown from 'src/components/GenresDropdown';


interface AddMovieProps {
  callback?: Function | null;
  item?: Movie | null;
}

interface MovieDetails {
  title: string;
  description: string;
  trailerUrl: string;
  imageUrl: string;
  largestImageUrl: string;
  ageRating: string;
  genre: string;
  yearOfRelease: string;
  duration: string;
}

const AddMovieForm: React.FC<AddMovieProps> = ({ callback, item }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [trailerLink, setTrailerLink] = useState<string>('');
  const [imageLink, setImageLink] = useState<string>('');
  const [largeImageLink, setLargeImageLink] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [ageRating, setAgeRating] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [isSerie, setIsSerie] = useState<boolean>(false);
  const client = useApiClient();


  //url for pulling
  const [scrapeUrl, setScrapeUrl] = React.useState<string>('')
  const [isScraping, setIsScraping] = React.useState<boolean>(false)

  const [scrapeWebsiteApi, scrapeWebsiteState] = useScrapeWebsiteMutation()

  const [createMovie, createMovieState] = useCreateMovieMutation()
  const [updateMovie, updateMovieState] = useUpdateMovieMutation()

  //genres
  const [genreObjs, setGenreObjs] = React.useState<any[]>([])

  const genreDropDownRef = React.useRef()

  // determine if form is in update movie mode
  const isUpdateMode = item == undefined || item == null

  const reset = () => {
    setTitle('');
    setDescription('');
    setVideoLink('');
    setImageLink('');
    setLargeImageLink('');
    setYear('');
    setTrailerLink('');
    setGenres([]);
    setIsSerie(false);
    setAgeRating('')
    setDuration('')
  };

  const populate = (movie: Movie) => {
    setTitle(movie.title);
    setDescription(movie.desc);
    setVideoLink(movie.video);
    setImageLink(movie.img);
    setLargeImageLink(movie.imgTitle);
    setYear(movie.year);
    setTrailerLink(movie.trailer);

    setIsSerie(movie?.isSeries ?? false);
    setDuration(movie.duration)
    setAgeRating(movie.ageRating)

    // const movieGenresStringArr = []
    // movie.genre?.forEach((_genre) => {
    //   movieGenresStringArr.push(_genre?.title)
    // })


    setGenreObjs(movie.genre);


    // setName(tagGroup.name);
    // setDescription(tagGroup.description);
    // setTags(tagGroup?.tags ? [...tagGroup.tags] : []);
  };

  const save = useCallback(async () => {

    const data = {
      title,
      desc: description,
      video: videoLink,
      img: imageLink,
      imgTitle: largeImageLink,
      trailer: trailerLink,
      year,
      genre: genreObjs,
      isSeries: isSerie,
      ageRating: ageRating,
      duration: duration
    };
    toast.loading('saving...', { position: 'top-right' });

    const res = await createMovie(data)
    // .then(() => {
    if (res?.data) {
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });
      callback?.()

      //just incase there are new genres
      genreDropDownRef?.current?.refetchGenresFn()
    }

    else {
      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
      console.error(res);
    }
    // });
  }, [
    title,
    description,
    videoLink,
    imageLink,
    year,
    trailerLink,
    genres,
    isSerie,
    genreObjs
  ]);

  const update = async () => {

    const genreIds = genreObjs?.map((genreObj) => {
      if (genreObj?.type == "new") {
        return genreObj;
      }
      return genreObj?._id
    })

    //mix of object and genre ids
    const genre = [
      ...genreIds
    ]


    const data = {
      title,
      desc: description,
      video: videoLink,
      img: imageLink,
      imgTitle: largeImageLink,
      trailer: trailerLink,
      year,
      genre,
      isSeries: isSerie,
      ageRating: ageRating,
      duration: duration
    };


    toast.loading('saving...', { position: 'top-right' });

    const res = await updateMovie({ itemId: item._id, data })

    if (res?.data) {
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });

      callback?.()

      //just incase there are new genres
      genreDropDownRef?.current?.refetchGenresFn()
    }

    else {
      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
      console.error(res);
    }
  }


  useEffect(() => {
    if (item != null) {
      populate(item);
    }
  }, [item]);

  const onSubmitMovieScrapeUrl = async () => {
    if (!scrapeUrl) {
      toast.error('Please enter url', { position: 'top-right' })
      return;
    }

    const data = {
      url: scrapeUrl
    }


    const res = await scrapeWebsiteApi(data);
    let movieDetails = res?.data

    if (movieDetails?.title) {
      let newMovieDetails: MovieDetails = movieDetails

      setTitle(newMovieDetails.title);
      setDescription(newMovieDetails.description);
      setImageLink(newMovieDetails.imageUrl);
      console.log('newMovieDetails.largestImageUrl ', newMovieDetails.largestImageUrl)
      setLargeImageLink(newMovieDetails.largestImageUrl);
      setYear(newMovieDetails.yearOfRelease);

      setScrapeUrl('')
      setAgeRating(newMovieDetails.ageRating)
      setDuration(newMovieDetails.duration)


      //genres
      if (Array.isArray(newMovieDetails?.genre)) {
        let newGenres = []

        let strToArry = newMovieDetails?.genre

        strToArry?.forEach((_str) => {
          newGenres.push({
            _id: `${Date.now()}${Math.random() * 1000}`,
            type: 'new',
            title: _str
          })
        })

        setGenreObjs(newGenres);
      }
    }

  }

  const renderAutoPopulateMovieSection = () => {
    return (
      <Accordion className='mb-5 border-b-2  py-2'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className='font-[600]'
        >
          Auto fill movie details?
        </AccordionSummary>
        <AccordionDetails>
          <div className='text-sm font-[600]'>
            Pull from <span className='underline text-black'><a target='_blank' href="https://reelgood.com/">https://reelgood.com/</a></span>
          </div>
          <TextField
            label="Movie Url"
            fullWidth
            focused
            value={scrapeUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setScrapeUrl(event.target.value)
            }}
          />
          <div className='flex gap-2'>
            <Button variant="contained" onClick={onSubmitMovieScrapeUrl}>
              Pull
            </Button>
            {scrapeWebsiteState.isLoading ?
              <img src={spinnerSvg} alt="Spinner" />
              : undefined}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
      >
        {renderAutoPopulateMovieSection()}
        {imageLink ? (
          <Box
            sx={{
              width: '100%',
              height: '100px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img src={imageLink} style={{ height: '100%' }} />
          </Box>
        ) : null}
        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <TextField
          label="Trailer link"
          fullWidth
          value={trailerLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTrailerLink(event.target.value);
          }}
        />
        <TextField
          label="Video link"
          fullWidth
          value={videoLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVideoLink(event.target.value);
          }}
        />
        <TextField
          label="Image link"
          fullWidth
          value={imageLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setImageLink(event.target.value);
          }}
        />
        <TextField
          label="Large Image link"
          fullWidth
          value={largeImageLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLargeImageLink(event.target.value);
          }}
        />
        <TextField
          label="Year"
          fullWidth
          value={year}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setYear(event.target.value);
          }}
        />
        <TextField
          label="Age rating"
          fullWidth
          value={ageRating}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAgeRating(event.target.value);
          }}
        />
        <TextField
          label="Duration"
          fullWidth
          value={duration}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDuration(event.target.value);
          }}
        />
        {/*<DatePicker
          label={'"year"'}
          openTo="year"
          value={year}
          onChange={(date) => setYear(date)}
        />*/}

        <Box
          margin={1}
          sx={{
            '& .MuiTextField-root': { m: 1 }
          }}
        >
          <Typography>Genres</Typography>
          <GenresDropdown
            setGenres={setGenreObjs}
            genres={genreObjs}
            ref={genreDropDownRef}
          />
        </Box>

        <Box
          margin={1}
          sx={{
            '& .MuiTextField-root': { m: 1 }
          }}
        >
          <Checkbox
            checked={isSerie}
            onClick={() => setIsSerie((cur) => !cur)}
          />{' '}
          <Typography component={'span'}>Is serie</Typography>
        </Box>

        <Box marginLeft={1} marginTop={3}>
          {item ? (
            <Button variant="contained" onClick={update}>
              Update
            </Button>
          ) : (
            <Button variant="contained" onClick={save}>
              Save
            </Button>
          )}
        </Box>
        {(createMovieState.isLoading || updateMovieState.isLoading) ?
          <img src={spinnerSvg} alt="Spinner" />
          : undefined}
      </Box>
    </>
  );
};

export default AddMovieForm;
