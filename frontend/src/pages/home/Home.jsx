import React, { Suspense, useEffect, useState } from "react";
import { logout, selectUser } from "../../store/reducers/auth";
import NavLogo1 from "../../Assets/Images/Haniflix.png";
import HaniPic from "../../Assets/Images/Hani.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/rtk-query/usersApi";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import useApiClient from "../../hooks/useApiClient";
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
import MovieListItem from "../../components/MovieListItem";
import { Link, useLocation } from "react-router-dom";
import WatchPopup from "../watchPopup/WatchPopup";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";
import SettingsSidebar from "../../components/SettingsSideBar";
import ModelPopup from "../../components/ModelPopup";
import MovieDetailPanel from "../../components/MovieDetailPanel";

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

const Home = ({ type = null }) => {
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

  //const [movies, setMovies] = useState([]);

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

  const { data: randomListData, isLoading: randomListLoading } =
    useGetRandomListsQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: myListData, isLoading: myListLoading, refetch: refetchmyList } = useGetMyListQuery({
    searchTerms: "",
  });
  useEffect(() => {
    refetchmyList();
    console.log('myListData: ', myListData)
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

  // console.log('window.innerHeight ', window.innerHeight)
  // console.log('appHeight ', appHeight)

  const heroHeight = appHeight * 0.65;
  const slidersHeight = appHeight * 0.35;

  useEffect(() => {
    setLists(randomListData);
  }, [type, genre, randomListData]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onHoverOverMovie = (movie) => {
    setMovieToShow(movie);
  };

  const TabsList = [
    {
      id: "trending",
      src: "tab=trending",
      title: "Trending",
      icon: "Spark",
    },
    {
      id: "continueWatching",
      src: "tab=continueWatching",
      title: "Continue Watching",
      icon: "Play",
    },
  ];

  const NavsList = [
    {
      id: "home",
      src: "/",
      title: "Home",
      icon: "Home",
    },
    {
      id: "movies",
      src: "/movies",
      title: "Movies",
      icon: "Movies",
    },
    {
      id: "tvSeries",
      src: "/tv-shows",
      title: "TV Series",
      icon: "TV",
    },
    {
      id: "myList",
      src: "/my-list",
      title: "My List",
      icon: "Heart",
    },
  ];

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

  const leftPanelSize =
    "w-[70vw] sm:w-[230px] xl:w-[280px] transition-all duration-500";
  const rightPanelSize =
    "w-[calc(100%-20px)] sm:w-[230px] xl:w-[280px] transition-all duration-500";

  const centerPanelSize =
    "w-[calc(100%-20px)] sm:w-[calc(100%-230px-230px-40px)] xl:w-[calc(100%-280px-280px-40px)]";

  return (
    <>
      {test ? (
        <div className="home relative !bg-black" id="my-list">
          <Navbar onSelectMovie={(movie) => setMovieToShow(movie)} />
          <div
            style={{
              height: heroHeight,
            }}
            className="fixed top-0 right-0 left-0 z-[900] "
          >
            <Featured movieObj={movieToShow} type={type} />
          </div>

          <div
            style={{
              marginTop: heroHeight,
            }}
            className={addClassNames(" relative z-[10] pt-[0px] pb-6")}
          >
            <div
              style={{ top: heroHeight }}
              className="fixed z-[200] left-0 right-0 h-[25px] bg-gradient-to-b from-black to-transparent"
            ></div>
            <Suspense
              fallback={
                <div style={{ backgroundColor: "black" }}>Loading...</div>
              }
            >
              <div className="mx-[20px] sm:mx-[80px] overflow-x-hidden">
                <div>
                  {continueWatchingListData?.list ? (
                    <List
                      onPlayMovie={onPlayMovie}
                      onHoverMovie={onHoverOverMovie}
                      list={{
                        ...continueWatchingListData?.list,
                        title: "Continue Watching",
                      }}
                    />
                  ) : undefined}
                </div>

                <div>
                  {myListData?.[0] ? (
                    <List
                      onPlayMovie={onPlayMovie}
                      onHoverMovie={onHoverOverMovie}
                      list={{
                        ...myListData?.[0],
                        title: "My List",
                      }}
                    />
                  ) : undefined}
                </div>

                {lists?.map((list) => (
                  <List
                    onPlayMovie={onPlayMovie}
                    onHoverMovie={onHoverOverMovie}
                    key={list._id}
                    list={list}
                  />
                ))}
              </div>
            </Suspense>
          </div>
        </div>
      ) : undefined}

      <div className="home flex p-3 gap-3 relative">

        <div className="rightBlob1" style={{
          left: '-20%',
          top: '0',
          width: '25vw',
          height: '25vw',
          filter: "blur(150px)",
          opacity: "0.5"
        }}></div>
        <div className="rightBlob1" style={{
          left: '10%',
          top: '15%',
          width: '25vw',
          height: '25vw',
          filter: "blur(150px)",
          opacity: "0.5"
        }}></div>

        <div className="centerBlob2" style={{
          top: '90%',
          right: "10%",
          height: "40vw",
          width: "40vw",
          opacity: ".60"
        }}></div>
        <div className="centerBlob3" style={{
          top: '85%',
          right: "90%",
          height: "40vw",
          width: "40vw",
          opacity: ".60"
        }}></div>

        <div className="fixed left-0 top-0 right-0 bottom-0">
          {/* leftPanel */}
          <div
            // style={{ boxShadow: "10px 0px 30px 0 #111" }}
            className={`${leftPanelSize} absolute h-[calc(100vh-20px)] ${isLeftPanelOpen ? "left-[10px]" : "sm:left-[10px] -left-[100vw]"
              } top-[10px] overflow-hidden z-[9]`}
          >
            {/* <div className="leftBlob1"></div>
            <div className="leftBlob2"></div>
            <div className="leftBlob3"></div> */}

            <div className="w-full h-full relative z-[10] overflow-y-auto CustomScroller">
              <div
                className={`w-full h-fit rounded-2xl  flex-shrink-0 py-10 px-4 xl:px-8 flex flex-col gap-5`}
              >
                <div className="flex sm:hidden justify-end p-2">
                  <button
                    onClick={() => {
                      setisLeftPanelOpen(false);
                    }}
                  >
                    <Icon name={"Close"} />
                  </button>
                </div>
                <div className="relative z-10 py-6 xl:py-16 flex flex-col items-center gap-2">
                  <img
                    onClick={handleProfilepicClick}
                    src={
                      userData?.avatar
                        ? makeImageUrl(userData?.avatar)
                        : NavLogo1
                    }
                    // src={HaniPic}
                    alt=""
                    className="bg-[#ffffff10] w-10 h-10 xl:w-16 xl:h-16 object-cover rounded-xl  xl:rounded-3xl cursor-pointer"
                  />
                  <p className="text-xl xl:text-2xl">{userData?.username}</p>
                  <div className="flex items-center gap-5 mt-3 xl:mt-5">
                    <button onClick={handleLogoutClick}>
                      <Icon name={"Logout"} hovered={showLogout} />
                    </button>
                    <button onClick={handleSettingClick}>
                      <Icon name={"Setting"} hovered={showSettings} />
                    </button>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col gap-7 xl:gap-8">
                  {NavsList.map((item) => {
                    let isActiveTab =
                      item.id === currentNav || isActive(item.src);
                    return (
                      <Link
                        to={item.src}
                        key={item.id}
                        onClick={() => {
                          handleNavClick(item.id);
                        }}
                        className="bg-transparent flex items-center gap-3 group cursor-pointer"
                      >
                        <Icon name={item.icon} hovered={isActiveTab} />
                        <p
                          className={`${isActiveTab ? "text-white" : "text-muted"
                            } text-base xl:text-xl transition-all duration-500 group-hover:text-white`}
                        >
                          {item.title}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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

          {/* centerPanel */}
          <div
            className={`${centerPanelSize} h-[calc(100vh-20px)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
          >
            {/* <div className="centerBlob1"></div>
            <div className="centerBlob3"></div>
            <div className="centerBlob2"></div> */}

            <div className="w-full h-full relative z-[1] overflow-y-scroll CustomScroller">
              <div
                className={`w-full h-fit flex-grow flex-shrink rounded-2xl p-6 xl:p-10 flex flex-col gap-10 sm:gap-6 xl:gap-10`}
              >
                <h1 className="relative z-10 text-5xl font-semibold capitalize flex justify-between items-center">
                  {/* <span>
                    {showProfilepic
                      ? "Profile Picture"
                      : showSettings
                        ? "Setting"
                        : type || "home"}
                  </span> */}
                  {showSettings && (
                    <button
                      className="hidden sm:block"
                      onClick={handleSettingClose}
                    >
                      <Icon name={"Close"} />
                    </button>
                  )}
                  {showProfilepic && (
                    <button
                      className="hidden sm:block"
                      onClick={handleProfilepicClose}
                    >
                      <Icon name={"Close"} />
                    </button>
                  )}

                  <button
                    className="block sm:hidden"
                    onClick={() => {
                      setisLeftPanelOpen(true);
                    }}
                  >
                    <img
                      src={
                        userData?.avatar
                          ? makeImageUrl(userData?.avatar)
                          : NavLogo1
                      }
                      // src={HaniPic}
                      alt=""
                      className="bg-[#ffffff10] w-10 h-10 object-cover rounded-xl cursor-pointer"
                    />
                  </button>
                </h1>

                {type != "my list" && !showSettings && !showProfilepic && (
                  <div className="flex gap-10 flex-col-reverse sm:flex-row justify-between relative z-10">
                    <div className="flex gap-6 xl:gap-10">
                      {TabsList.map((item) => {
                        let isActiveTab = item.id === currentTab && !hasSearch;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              handleTabClick(item.id);
                            }}
                            className="bg-transparent flex items-center gap-2 group cursor-pointer"
                          >
                            <Icon name={item.icon} hovered={isActiveTab} />
                            <p
                              className={`${isActiveTab ? "text-white" : "text-muted"
                                } text-base xl:text-xl transition-all duration-500 group-hover:text-white whitespace-nowrap`}
                            >
                              {item.title}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className={`relative flex items-center gap-2 py-3 rounded-xl overflow-hidden group transition-all duration-500 ${hasSearch
                        ? "w-72 px-3 bg-dark"
                        : "bg-dark sm:bg-transparent px-3 sm:px-0 w-72 sm:w-6 hover:w-72 hover:px-3 hover:bg-dark"
                        }`}
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
                )}

                {type != "my list" && !showSettings && !showProfilepic && (
                  <AnimatePresence>
                    {!showSearchDropdown ? (
                      <>
                        {currentTab === "trending" && (
                          <motion.div
                            key="trending"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={tabVariant}
                            transition={parentTransition}
                            className="relative z-10 flex flex-col gap-8 sm:gap-5"
                          >
                            {lists?.map((list) => (
                              <motion.div
                                key={list._id}
                                variants={tabChildVariant}
                              >
                                <List
                                  onPlayMovie={onPlayMovie}
                                  onHoverMovie={onHoverOverMovie}
                                  key={list._id}
                                  list={list}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}

                        {currentTab === "continueWatching" && (
                          <motion.div
                            key="continueWatching"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={tabVariant}
                            transition={parentTransition}
                            className=" relative z-10"
                          >
                            {continueWatchingListData?.list ? (
                              <motion.div variants={tabChildVariant}>
                                <List
                                  onPlayMovie={onPlayMovie}
                                  onHoverMovie={onHoverOverMovie}
                                  list={{
                                    ...continueWatchingListData?.list,
                                  }}
                                />
                              </motion.div>
                            ) : undefined}
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <motion.div
                        key="searchedList"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={tabVariant}
                        transition={parentTransition}
                        className={"relative z-10"}
                      >
                        <motion.div
                          variants={tabChildVariant}
                          className="flex flex-wrap gap-[2vw]"
                        >
                          {searchMoviesData?.movies?.map((movie, i) => {
                            return (
                              <div className="!w-[24vw] sm!w-[11vw]">
                                <MovieListItem
                                  key={i}
                                  index={i}
                                  movieId={movie._id}
                                  onHover={onHoverOverMovie}
                                  onPlayMovie={onPlayMovie}
                                // movieObj={list}
                                // onHover={onHoverMovie}
                                />
                              </div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {type === "my list" && !showSettings && !showProfilepic && (
                  <AnimatePresence>
                    <motion.div
                      key="searchedList"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabVariant}
                      transition={parentTransition}
                      className={"relative z-10"}
                    >
                      <motion.div
                        variants={tabChildVariant}
                        className="flex flex-wrap gap-[2vw]"
                      >

                        {myListData?.[0]?.content.map((movie, i) => {
                          return (
                            <div className="!w-[24vw] sm!w-[11vw]">
                              <MovieListItem
                                key={i}
                                index={i}
                                movieId={movie}
                                onHover={onHoverOverMovie}
                                onPlayMovie={onPlayMovie}
                              // onHover={onHoverMovie}
                              />
                            </div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {showProfilepic && (
                  <AnimatePresence>
                    <motion.div
                      key="AvatarModel"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabVariant}
                      transition={parentTransition}
                      className={"relative z-10"}
                    >
                      <ChangeAvatarModal
                        first={isFirstChangeAvatar}
                        show={showProfilepic}
                        variants={tabChildVariant}
                        onClose={() => {
                          setIsFirstChangeAvatar(false);
                          setShowProfilepic(false);
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {showSettings && (
                  <AnimatePresence>
                    <motion.div
                      key="SettingPanel"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabVariant}
                      transition={parentTransition}
                      className={"relative z-10"}
                    >
                      <SettingsSidebar
                        variantGroup={variantGroup}
                        show={showSettings}
                        onClose={handleSettingClose}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          {/* rightPanel */}
          <div
            className={`${rightPanelSize} absolute h-[calc(100vh-20px)] ${movieToShow ? "right-[10px]" : "sm:right-[10px] -right-[100vw]"
              } top-[10px] overflow-hiddenz-[5]`}
          >
            {/* <div className="rightBlob1"></div> */}
            <div className="w-full h-full relative z-[6] overflow-y-auto CustomScroller">
              <AnimatePresence>
                <div
                  className={`w-full h-fit rounded-2xl  flex-shrink-0 py-10 px-4 xl:px-8 flex flex-col gap-5`}
                >
                  <div className="flex sm:hidden justify-start p-2">
                    <button
                      onClick={() => {
                        setMovieToShow();
                      }}
                    >
                      <Icon name={"Close"} />
                    </button>
                  </div>
                  <MovieDetailPanel
                    type={type === "TV series" ? "TV series" : "Movie"}
                    movieToShow={movieToShow}
                    onPlayMovie={onPlayMovie}
                    onHoverMovie={onHoverOverMovie}
                  />
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showLogout && (
            <ModelPopup>
              <p className="text-lg mb-2">Sign Out</p>
              <p className="text-base text-muted">
                Are you sure you want to sign out?
              </p>

              <div className="mt-10 flex gap-5 justify-center">
                <button
                  className="theme_button_danger"
                  onClick={handleLogoutCancel}
                >
                  Cancel
                </button>
                <button className="theme_button" onClick={handleLogoutConfirm}>
                  Sign Out
                </button>
              </div>
            </ModelPopup>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
