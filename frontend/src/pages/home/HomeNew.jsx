import React, { Suspense, useEffect, useState } from "react";
import { logout, selectUser } from "../../store/reducers/auth";
import NavLogo1 from "../../Assets/Images/Haniflix.png";
import HaniPic from "../../Assets/Images/Hani.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/rtk-query/usersApi";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import { useGetGenresQuery } from '../../store/rtk-query/genresApi';
import useApiClient from "../../hooks/useApiClient";
import CloseIcon from '@mui/icons-material/Close';
import {
    useGetContinueWatchingListQuery,
    useGetMyListQuery,
    useGetRandomListsQuery,
} from "../../store/rtk-query/listsApi";
import { addClassNames } from "../../store/utils/functions";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./home.scss";
import Icon from "../../components/icon";
import poster from "../../Assets/Images/poster.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMoviesQuery } from "../../store/rtk-query/moviesApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WatchPopup from "../watchPopup/WatchPopup";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";
import SettingsSidebar from "../../components/SettingsSideBar";
import ModelPopup from "../../components/ModelPopup";
import GenresDropdown from "../../components/GenresDropdown";

const responsiveCarousel = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const api_url = import.meta.env.VITE_APP_API_URL;

const HomeNew = ({ type = null }) => {
    const [lists, setLists] = useState([]);
    const [currentTab, setCurrentTab] = useState("trending");
    const [currentNav, setCurrentNav] = useState("");
    const [genre] = useState(null);
    const client = useApiClient();
    const [hasSearch, setHasSearch] = useState(false);
    const [movieToPlay, setMovieToPlay] = useState();
    const [playerAxis, setPlayerAxis] = useState({ x: 0, y: 0 });

    const [showLogout, setShowLogout] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showProfilepic, setShowProfilepic] = useState(false);
    const [isFirstChangeAvatar, setIsFirstChangeAvatar] = useState(false);
    const [isLeftPanelOpen, setisLeftPanelOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const {
        data: continueWatchingListData,
        isLoading: continueWatchingLoading,
        refetch: refetchContinueWatching,
    } = useGetContinueWatchingListQuery(
        {},
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const { data: randomListData, isLoading: randomListLoading,
        refetch: refetchAll, } =
        useGetRandomListsQuery(
            {},
            {
                refetchOnMountOrArgChange: true,
            }
        );

        const { data: genresData, isLoading, error } = useGetGenresQuery({}, {
            refetchOnMountOrArgChange: true,
        });

        const genres = genresData?.genres

    const { data: myListData, isLoading: myListLoading, refetch: refetchmyList } = useGetMyListQuery({
        searchTerms: "",
    });
    useEffect(() => {
        refetchmyList();
        refetchContinueWatching();
        refetchAll();
        // console.log('continueWatchingListData: ', continueWatchingListData)
        // console.log('myListData: ', myListData)
    }, []);



    const [movieToShow, setMovieToShow] = React.useState(undefined);

    const [appHeight, setAppHeight] = useState(window.innerHeight);
    const [appWidth, setAppWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setAppHeight(window.innerHeight); // Update appHeight
            setAppWidth(window.innerWidth); // Update appWidth
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize); // Clean up listener
    }, [setAppHeight, setAppWidth]);

    useEffect(() => {
        setLists(randomListData);
        // console.log('randomListData: ', randomListData)
    }, [type, genre, randomListData]);

    const onHoverOverMovie = (movie) => {
        setMovieToShow(movie);
    };


    const duplicateArray = (lists || []).map((singleItem) => ({
        ...singleItem,
        content: continueWatchingListData?.list?.content,
    }));

    const test = false;

    const [searchTerm, setSearchTerm] = useState("");

    let queryParams = {
        searchTerm,
    };

    const {
        currentData: searchMoviesData,
        isLoading: moviesLoading,
        refetch,
        isFetching,
    } = useGetMoviesQuery(queryParams, {
        // pollingInterval: 10000,
        refetchOnMountOrArgChange: true,
    });

    
    // console.log("searchMoviesData: ", searchMoviesData)
    const showSearchDropdown = React.useMemo(() => {
        let show = false;

        if (searchTerm == "" || !searchTerm) {
            return false;
        }

        if (moviesLoading || searchMoviesData) {
            show = true;
        }

        return show;
    }, [searchMoviesData, moviesLoading]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setHasSearch(!!inputValue.trim());

        if (!!inputValue.trim()) {
        }

        setSearchTerm(e.target.value);
    };

    const tabVariant = {
        hidden: {},
        visible: {},
        exit: {},
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

    const tabChildVariant = {
        hidden: {
            opacity: 0,
            x: -40,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
        },
        exit: {
            opacity: 0,
            x: 40,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
        },
    };

    const parentTransition = { staggerChildren: 0.1 };

    const variantGroup = { tabVariant, tabChildVariant, parentTransition };

    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
        setSearchTerm("");
        setHasSearch(false);
        setisLeftPanelOpen(false);
    };

    const handleNavClick = (navId) => {
        setCurrentNav(navId);
        setSearchTerm("");
        setHasSearch(false);
        setShowSettings(false);
        setShowProfilepic(false);
        setisLeftPanelOpen(false);
        setMovieToShow();
    };

    const user = useAppSelector(selectUser);
    const userId = user?._id;
    const {
        data: userData,
        isLoading: userDataLoading,
        refetch: refetchUserData,
    } = useGetUserQuery(userId);

    const makeImageUrl = (url) => {
        const BASE_URL = import.meta.env.VITE_APP_API_URL;

        let imageSuffix = url?.replace("/api/", "");
        let finalUrl = `${BASE_URL}${imageSuffix}`;

        return finalUrl;
    };

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const onPlayMovie = (movie, axis) => {
        setTimeout(() => {
            setMovieToPlay(movie);
        }, 100);
        setPlayerAxis(axis);
    };

    const onLeaveMovie = (movie) => {
        setMovieToPlay();
    };

    const handleLogoutClick = () => {
        setShowLogout(true);
        setisLeftPanelOpen(false);
    };
    const handleLogoutCancel = () => {
        setShowLogout(false);
    };
    const handleLogoutConfirm = () => {
        setShowLogout(false);
        dispatch(logout());
    };
    const handleSettingClick = () => {
        setShowSettings(true);
        setShowProfilepic(false);
        setisLeftPanelOpen(false);
        setMovieToShow();
    };
    const handleSettingClose = () => {
        setShowSettings(false);
    };
    const handleProfilepicClick = () => {
        setShowProfilepic(true);
        setMovieToShow();
        setShowSettings(false);
        setisLeftPanelOpen(false);
    };
    const handleProfilepicClose = () => {
        setShowProfilepic(false);
    };


    const centerPanelSize =
        "w-[calc(100%-20px)]";

    return (
        <>
            <div id="background_wrap"></div>
            <div className="home flex p-3 gap-3 relative">
                <div className=" homedarkbg fixed left-0 top-0 right-0 bottom-0">
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

                    <div
                        className={`${centerPanelSize} h-[calc(100vh-20px)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
                    >

<div className="navbar flex gap-2 flex-col md:flex-row sm:flex-row justify-between relative z-10">
                                    <div className="flex gap-6 items-center">
                                        <button onClick={handleLogoutClick} onTouchStart={(e) => { e.preventDefault(); handleLogoutClick(); }}>
                                            <Icon name={"Logout"} hovered={showLogout} />
                                        </button>
                                        <button onClick={() => navigate('/settings')} onTouchStart={(e) => { e.preventDefault(); navigate('/settings') }}>
                                            <Icon name={"Setting"} hovered={showSettings} />
                                        </button>
                                            <GenresDropdown />
                                    </div>

                                    <div
                                        className={`inputWrapperHover relative flex items-center w-72 px-3 bg-dark gap-2 py-3  overflow-hidden group duration-500`}
                                    >
                                        <Icon name={"Search"} />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="min-w-0 bg-transparent placeholder:text-muted text-white w-56 absolute left-12"
                                            value={searchTerm}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>
                        <div className="w-full h-full relative z-[1] overflow-y-scroll CustomScroller">

                            <div
                                className={`w-full h-fit flex-grow flex-shrink rounded-2xl p-6 xl:p-10 flex flex-col gap-4 sm:gap-6 xl:gap-5`}
                            >

                                
                                <div className="list-container"></div>

                                {searchTerm !== '' && searchMoviesData?.movies ? (
                                    <>
                                        <motion.div variants={tabChildVariant}>
                                            <List
                                                onPlayMovie={onPlayMovie}
                                                ifTitle='Search Result'
                                                onHoverMovie={onHoverOverMovie}
                                                isObject={true}
                                                genres={genres}
                                                list={{
                                                    content: searchMoviesData?.movies
                                                }}
                                            />
                                        </motion.div>
                                    </>
                                ) : undefined}
                                {continueWatchingListData?.list?.[0]?.content?.length > 0 ? (
                                    <>
                                        <motion.div variants={tabChildVariant}>
                                            <List
                                                onPlayMovie={onPlayMovie}
                                                ifTitle='Continue Watching'
                                                onHoverMovie={onHoverOverMovie}
                                                genres={genres}
                                                list={{
                                                    ...continueWatchingListData?.list,
                                                }}
                                            />
                                        </motion.div>
                                    </>
                                ) : undefined}
                                {myListData?.[0]?.content?.[0] ? (
                                    <>
                                        <motion.div variants={tabChildVariant}>
                                            <List
                                                onPlayMovie={onPlayMovie}
                                                onHoverMovie={onHoverOverMovie}
                                                ifTitle='My list'
                                                genres={genres}
                                                list={{
                                                    ...myListData?.[0],
                                                }}
                                            />
                                        </motion.div></>
                                ) : undefined}
                                {lists?.map((list) => (
                                    <motion.div
                                        key={list._id}
                                        variants={tabChildVariant}
                                    >
                                        <List
                                            onPlayMovie={onPlayMovie}
                                            onHoverMovie={onHoverOverMovie}
                                            genres={genres}
                                            key={list._id}
                                            list={list}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showLogout && (
                        <ModelPopup className="signout-modal bg-slate-950/[.9]">
                            <CloseIcon onClick={handleLogoutCancel} className={addClassNames('crossModal')} />

                            <p className="text-lg mb-2">Sign Out</p>
                            <p className="text-base">
                                Are you sure you want to sign out?
                            </p>

                            <div className="mt-5 flex gap-5 justify-center">
                                <button
                                    className="theme_button_danger"
                                    onClick={handleLogoutCancel}
                                >
                                    Cancel
                                </button>
                                <button className={"theme_button_danger"}
                                    style={{
                                        borderColor: '#14f59e',
                                        background: '#14f59e1f',
                                        color: '#14f59e',
                                    }}
                                    type="submit"
                                    onClick={handleLogoutConfirm}>
                                    Sign Out
                                </button>
                            </div>
                        </ModelPopup>
                    )}
                </AnimatePresence>
            </div >
        </>
    );
};

export default HomeNew;
