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
import AddListForm from './forms/AddListForm';
import { Close, Delete, Edit } from '@mui/icons-material';
import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import toast from 'react-hot-toast';
import { List } from '@api/client/dist/lists/types';
import { useDeleteListMutation, useGetAdminListsQuery } from 'src/store/rtk-query/listsApi';

import { useFormik } from 'formik';
import spinnerSvg from 'src/assets/svgs/spinner.svg'
import ListSortPopup from 'src/components/SortFilters/ListSortPopup';

function Lists() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [toEdit, setToEdit] = useState<Movie | null>(null);
  const [toDelete, setToDelete] = useState<Movie | null>(null);
  const client = useApiClient();

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

  let queryParams = {
    ...(formik.values.activeSort && { orderBy: formik.values.activeSort }),
  }

  const { data: adminListData, isLoading: adminListsLoading, refetch } = useGetAdminListsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  })

  const [deleteList, deleteListState] = useDeleteListMutation()


  const getData = useCallback(() => {
    refetch()
    // toast.loading('loading...', { position: 'top-right' });
    // client.getAdminLists().then((data) => {
    //   toast.dismiss();
    //   console.log(data);
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
    toast.loading('loading...', { position: 'top-right' });

    deleteList(item?._id)
      .then(() => {
        toast.dismiss();
        toast.success('deleted', { position: 'top-right' });
        setToDelete(null);
        getData();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
        setToDelete(null);
      });
  }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    if (toEdit != null) {
      const item = toEdit
      if (item) setOpenAddModal(true);
      else setOpenAddModal(false);
    }
  }, [toEdit]);

  useEffect(() => {
    if (!openAddModal) setToEdit(null);
  }, [openAddModal]);

  return (
    <>
      <Helmet>
        <title>Lists - Configurations</title>
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
          <div className='px-7 flex w-full justify-between'>
            <div className='flex gap-2'>
              <Button variant="contained" onClick={() => setOpenAddModal(true)}>
                Add List
              </Button>
              {(adminListsLoading || deleteListState.isLoading) ?
                <img src={spinnerSvg} alt="Spinner" />
                : undefined}
            </div>
            <ListSortPopup
              open={showSortFilter}
              onClick={() => setShowSort(!showSortFilter)}
              initialValues={initialFormValues}
              formik={formik}
            />
          </div>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table /*sx={{ minWidth: 650 }}*/ aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Movies</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Genre</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminListData?.map((row) => (
                    <TableRow
                      key={row?._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.title}
                      </TableCell>
                      <TableCell align="right">
                        {row?.content?.length}
                      </TableCell>
                      <TableCell align="right">{row?.type}</TableCell>
                      <TableCell align="right">{row?.genre}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ p: '10px' }}
                          aria-label="menu"
                          onClick={() => {
                            setToEdit(row);
                          }}
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
              {toEdit ? 'Update a list' : 'Add a list'}
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
              <AddListForm
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

export default Lists;
