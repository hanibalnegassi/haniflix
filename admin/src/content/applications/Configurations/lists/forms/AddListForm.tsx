import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  generateUtilityClass
} from '@mui/material';
import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import { TagsInput } from 'react-tag-input-component';
import toast from 'react-hot-toast';
import { List } from '@api/client/dist/lists/types';
import { useCreateListMutation, useGetListByIdQuery, useUpdateListMutation } from 'src/store/rtk-query/listsApi';
import { useGetMovieQuery, useGetMoviesQuery } from 'src/store/rtk-query/moviesApi';
// import { DatePicker } from '@mui/x-date-pickers';

interface AddMovieProps {
  callback?: Function | null;
  item?: List | null;
}

const AddListForm: React.FC<AddMovieProps> = ({ callback, item }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [content, setContent] = useState<Movie[]>([]);
  const client = useApiClient();

  const [updateList, updateListState] = useUpdateListMutation()
  const [createList, createListState] = useCreateListMutation()

  const { data: listData, isLoading: listLoading, refetch: refetchListData } = useGetListByIdQuery(item?._id, {
    skip: !item?._id
  })

  // const moviesData = listData?.list?.content

  const itemsPerPage = 100000;


  let queryParams = {
    perPage: itemsPerPage,
  }

  const { data: moviesData, isLoading: moviesLoading, refetch } = useGetMoviesQuery(queryParams)

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData?.movies)
    }
  }, [moviesData])


  const reset = () => {
    setTitle('');
    setDescription('');
    setType('');
    setGenre('');
    setContent([]);
  };

  const populate = useCallback(
    (list: List) => {
      setTitle(list.title);
      setType(list.type);
      setGenre(list.genre);
      setContent(
        movies.filter((movie) => list.content?.includes(movie._id as any))
      );
    },
    [movies]
  );

  // const getMovies = () => {
  //   client
  //     .getMovies()
  //     .then((res) => {
  //       setMovies(res?.movies);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const save = useCallback(async () => {
    const data = {
      title,
      content: content.map((c) => c._id) as any,
      type,
      genre
    };
    toast.loading('saving...', { position: 'top-right' });

    const res = await createList(data)

    if (res?.data) {
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });
      callback?.()
    }
    else {
      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
      console.error(res);
    }
  }, [title, description, type, genre, content]);

  const update = useCallback(async () => {
    const data = {
      title,
      description,
      type,
      genre,
      content: content.map((c) => c._id) as any
    };
    console.log(data);
    toast.loading('saving...', { position: 'top-right' });

    const res = await updateList({ itemId: item._id, data })

    if (res?.data) {
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });
      callback?.()
    }

    else {
      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
      console.error(res);
    }
  }, [title, description, type, genre, item, content]);

  const selectItems = useMemo(() => {
    const arr = [];

    for (const movie of movies) {
      arr.push(
        <MenuItem key={movie._id} value={movie._id}>
          <Checkbox checked={content.map((m) => m._id).includes(movie._id)} />
          <ListItemText primary={movie.title} />
        </MenuItem>
      );
    }
    return arr;
  }, [movies, content]);

  useEffect(() => {
    // getMovies();
    if (item != null) {
      populate(item);
    }
    console.log(item?.title);
  }, [item]);

  useEffect(() => {
    if (item != null) {
      populate(item);
    }
  }, [movies]);

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
      >
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
          label="Type (either movies or series)"
          fullWidth
          required
          value={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setType(event.target.value?.trim());
          }}
        />
        <TextField
          label="Genre (only one per list)"
          fullWidth
          required
          value={genre}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setGenre(event.target.value?.trim());
          }}
        />

        {movies?.length > 0 ? (
          <FormControl fullWidth sx={{ marginLeft: 1, marginTop: 2 }}>
            <InputLabel htmlFor="content">Content</InputLabel>
            <Select
              value={content.map((m) => m._id)}
              onChange={(e) => {
                const ids = e.target.value;
                const tmpMovies = [];
                for (const id of ids) {
                  const movie = movies.find((m) => m._id === id);
                  if (movie) {
                    tmpMovies.push(movie);
                  }
                }
                setContent([...tmpMovies]);
              }}
              renderValue={() => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {content.map((tag) => (
                    <Chip key={tag._id} label={tag.title} />
                  ))}
                </Box>
              )}
              id="content"
              label="Grouping"
              placeholder="Select tags"
              multiple
            >
              {selectItems}
            </Select>
          </FormControl>
        ) : null}

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
      </Box>
    </>
  );
};

export default AddListForm;
