import { Suspense } from "react";
import List from "../../components/list/List";
import MovieDetailsFull from "../../components/MovieDetailsFull/index";
import Navbar from "../../components/navbar/Navbar";
import { addClassNames } from "../../store/utils/functions";
import { useParams } from "react-router-dom";
import { useGetContinueWatchingListQuery } from "../../store/rtk-query/listsApi";


const Movie = () => {
    const { movieId } = useParams()

    const { data: continueWatchingListData, isLoading: continueWatchingLoading, refetch: refetchContinueWatching } = useGetContinueWatchingListQuery({}, {
        refetchOnMountOrArgChange: true,
    })

    return (
        <div className="overflow-hidden pb-10 relative !bg-black">
            <Navbar />
            <div className='fixed top-0 right-0 left-0 z-[900]'>
                <MovieDetailsFull
                    movieId={movieId}
                />
            </div>


            <div className={addClassNames(
                'overflow-hidden mt-[65vh] relative z-[10] pt-[0px]'
            )}>
                <div
                    className='fixed z-[200] top-[65vh] left-0 right-0 h-[7vh] bg-gradient-to-b from-black to-transparent'
                >

                </div>
                <Suspense
                    fallback={<div style={{ backgroundColor: "black" }}>Loading...</div>}
                >
                    <div className='mx-[20px] sm:mx-[80px] overflow-x-hidden'>
                        <div>

                            {
                                continueWatchingListData?.list ?
                                    <List list={{
                                        ...continueWatchingListData?.list,
                                        title: "For You"
                                    }} />
                                    : undefined
                            }
                        </div>


                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default Movie;