import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useCreateGenreMutation, useDeleteGenreMutation, useGetGenresQuery } from 'src/store/rtk-query/genresApi';

import toast from 'react-hot-toast';

type Props = {
    setGenres: React.Dispatch<any>;
    genres: any
}

const GenresDropdown = React.forwardRef((props, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: genresData, isLoading, isError, refetch: refetchGenres } = useGetGenresQuery();

    const [createGenreMutation, createGenreState] = useCreateGenreMutation();
    const [deleteGenreMutation, deleteGenreState] = useDeleteGenreMutation();

    const [genreToDelete, setGenreToDelete] = useState<any | null>(null);

    const { genres, setGenres } = props


    React.useImperativeHandle(ref, () => ({
        refetchGenresFn() {
            refetchGenres()
        }
    }));


    // React.useEffect(() => {
    //     setGenres(genresData?.genres)
    // }, [])

    //    console.log('genresData ')


    const filteredGenres = genresData?.genres?.filter(genre => genre.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
    };

    const handleGenreSelect = (genre) => {
        setGenres([...genres, genre]);
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    const handleAddGenre = async () => {
        const newGenre = { id: Date.now(), type: 'new', title: searchTerm };

        // Create the genre on the server using createGenreMutation
        const res = await createGenreMutation(newGenre)

        console.log('res ', res)

        if (!res.data) {
            alert('error adding genre')
            return
        }

        const newGenreFromDb = res?.data;

        setGenres([...genres, newGenreFromDb]);

        setSearchTerm('');
        setIsDropdownOpen(false);
        refetchGenres()
    };

    const handleDeleteGenre = async (genreId) => {

        // Delete the genre on the server using deleteGenreMutation
        const res = await deleteGenreMutation(genreId)

        if (res?.data) {
            toast.success('Genre deleted', { position: 'top-right' });

            //update Genres tags selection
            let newGenres = [...genres]
            newGenres = newGenres.filter((genre) => genre?._id != genreId)
            setGenres(newGenres)
            refetchGenres()

        } else {
            toast.error('Error deleting genre', { position: 'top-right' });
        }

        setGenreToDelete(null)
    };

    const onRemoveFromeSelected = (genreId) => {
        let newGenres = [...genres]
        newGenres = newGenres.filter((genre) => genre?._id != genreId)

        setGenres(
            newGenres
        );
    }

    const renderTags = () => {
        return (
            <div className='flex flex-wrap gap-2'>
                {genres?.map((_genre) => {
                    return (
                        <div key={_genre?._id} className='flex items-center gap-2 bg-[#e5e7eb] text-sm p-2 rounded-[20px] text-black  '>
                            <div className="capitalize"> {_genre?.title}</div>
                            <div
                                onClick={() => onRemoveFromeSelected(_genre?._id)}
                                className='cursor-pointer  '>x</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="">
                <div className="border border-gray-300 p-2 rounded-md w-full">

                    {renderTags()}
                    <input
                        type="text"
                        placeholder="Search or add genres..."
                        value={searchTerm}
                        className='py-2'
                        onChange={handleSearchTermChange}
                    //   onBlur={() => setIsDropdownOpen(false)}
                    />
                </div>
                <div className='relative'>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full top-[6px] bg-white shadow-md rounded-md">
                            {isLoading && <div className="p-4">Loading genres...</div>}
                            {isError && <div className="p-4 text-red-500">Error fetching genres!</div>}
                            {!isLoading && !isError && (
                                <div className="flex flex-col">
                                    {filteredGenres.length > 0 && (
                                        <ul className="py-2 overflow-auto">
                                            {filteredGenres.map((genre) => (
                                                <li
                                                    key={genre._id}
                                                    className="cursor-pointer hover:bg-gray-100 p-2 flex items-center justify-between"
                                                    onClick={() => handleGenreSelect(genre)}
                                                >
                                                    <div>{genre.title}</div>
                                                    <div className="underline text-sm" onClick={() => setGenreToDelete(genre)}>
                                                        Delete genre
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {filteredGenres.length === 0 && searchTerm.length > 0 && (
                                        <div className="cursor-pointer p-2 text-sm bg-blue-500 text-white rounded-md w-[fit-content] px-3"
                                            onClick={handleAddGenre}>
                                            Add New Genre
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Dialog
                open={genreToDelete != null}
                onClose={() => setGenreToDelete(null)}
                aria-labelledby="delete-genre"
                aria-describedby="Dialog to confirm genre deletion"
            >
                <DialogTitle id="alert-dialog-title">Delete Genre</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {genreToDelete?.title} genre?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGenreToDelete(null)}>Cancel</Button>
                    <Button onClick={() => handleDeleteGenre(genreToDelete._id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
})

export default GenresDropdown;
