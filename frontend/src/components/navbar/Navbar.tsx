import React, { useState, useEffect } from "react";
// import NavLogo1 from "../../Assets/Images/Nav-logo.png";
import NavLogo1 from "../../Assets/Images/Haniflix.png";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/reducers/auth";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { addClassNames } from "../../store/utils/functions";

import { useGetUserQuery } from "../../store/rtk-query/usersApi";
import styles from "./navbar.module.scss";

import { LogoutIcon, SearchIcon, SettingsIcon } from "../../Assets/svgs/tsSvgs";

import ChangeAvatarModal from "../ChangeAvatarModal";
import SettingsSidebar from "../SettingsSideBar";

import { IoIosArrowDown } from "react-icons/io";
import { useGetMoviesQuery } from "../../store/rtk-query/moviesApi";

import { Transition } from "@headlessui/react";

type Props = {
  onSelectMovie?: (movie: Movie) => {};
};

const Navbar = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAppSelector(selectUser);
  // const userName = user?.fullname;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loginCalled, setLoginCalled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const authReducer = useAppSelector((state) => state.auth);
  const userId = user?._id;

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: refetchUserData,
  } = useGetUserQuery(userId);

  const [showSettings, setShowSettings] = React.useState<boolean>(false);
  const [showChangeAvatar, setShowChangeAvatar] =
    React.useState<boolean>(false);
  const [isFirstChangeAvatar, setIsFirstChangeAvatar] =
    React.useState<boolean>(false);

  // TODO: UNCOMMENT TO RETURN AVATAR MODAL
  // useEffect(() => {
  //   if (userId) {
  //     let first = localStorage.getItem(`fisrtAvatarTime_${userId}`);
  //     if (!first) {
  //       setIsFirstChangeAvatar(true);
  //       setShowChangeAvatar(true);
  //     }
  //   }
  // }, [userId, user]);
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

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const onLogout = () => {
    dispatch(logout());

    // window.location.href = "/";
  };

  const makeImageUrl = (url) => {
    const BASE_URL = import.meta.env.VITE_APP_API_URL;

    let imageSuffix = url?.replace("/api/", "");
    let finalUrl = `${BASE_URL}${imageSuffix}`;

    return finalUrl;
  };

  // const width = () => {
  //   navigate("/search", { state: { search: searchTerm } });
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" || event.keyCode === 13) {
  //     handleSearch();
  //   }
  // };

  const renderMobileMenuList = () => {
    // mobile view disabled
    return;
  };

  const renderMobileMenuToggle = () => {
    // mobile view disabled
    return;
  };

  const renderDesktopMenu = () => {
    return (
      <div className={styles["desk-container"]} id="nav-desktop-container">
        <div
          className={styles["left"]}
          style={{ width: "100%", height: "100px" }}
        >
          <Link className={styles["link"]} to="/">
            <span>Home</span>
          </Link>

          <Link className={styles["link"]} to="/tv-shows">
            <span>TV Shows</span>
          </Link>

          <Link className={styles["link"]} to="/movies">
            <span>Movies</span>
          </Link>

          <a className={styles["link"]} href="#my-list">
            <span>My List</span>
          </a>
        </div>
        <div className={styles["right"]}>
          <div
            className={addClassNames(
              styles["inputWrapper"],
              "backdrop-blur-md border border-[#ffffff50]",
              showSearchDropdown
                ? "border-b-[0] rounded-b-[0] rounded-t-[5px]"
                : "rounded-[5px]"
            )}
          >
            <div className="w-full flex items-center relative px-[8px] ">
              <div className="cursor-pointer">
                <SearchIcon className="icon" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="px-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Transition
              as={"div"}
              className="relative w-full "
              show={showSearchDropdown}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={addClassNames(
                  "border-[#ffffff50] backdrop-blur-md border bg-[#ffffff29] overflow-y-auto h-60",
                  styles["search_results"]
                )}
              >
                {searchMoviesData?.movies?.map((movie) => {
                  return (
                    <div
                      onClick={() => {
                        props.onSelectMovie?.(movie);
                        setSearchTerm("");
                      }}
                      className="flex items-center my-[8px] py-[4px] px-[8px] cursor-pointer"
                    >
                      <div className="">
                        <div className="h-[40px] w-[27px]">
                          <img className="!w-[27px] h-full " src={movie?.img} />
                        </div>
                      </div>
                      <div className="text-[14px] font-[500] ml-3 ">
                        {movie?.title}
                        {"  "}({movie?.year})
                      </div>
                    </div>
                  );
                })}
              </div>
            </Transition>
          </div>
          <div
            onClick={() => {
              setShowChangeAvatar(true);
            }}
            // className="cursor-pointer bg-zinc-300 rounded-[100px] h-[45px] !w-[45px] border sm:mr-2"
          >
            <img
              src={userData?.avatar ? makeImageUrl(userData?.avatar) : NavLogo1}
              alt=""
              className="w-[45px] h-full rounded-[100px]"
            />
          </div>

          {/* <div
            onClick={() => {
              setShowChangeAvatar(true);
            }}
            // className="cursor-pointer bg-zinc-300 rounded-[100px] h-[45px] !w-[45px] border sm:mr-2"
          >
            <img
              src={userData?.avatar ? makeImageUrl(userData?.avatar) : NavLogo1}
              alt=""
              className="w-[45px] h-full rounded-[100px]"
            />
          </div> */}

          <div
            className={addClassNames(
              styles["profile"],
              "relative ml-[6px] cursor-pointer"
            )}
          >
            <div className="h-[45px] w-[25px] text-white flex items-center justify-start">
              <IoIosArrowDown />
            </div>
            <div className={addClassNames(styles["options"], " !text-black ")}>
              <div className={styles["menu"]}>
                {/* <span
                  onClick={() => {
                    setShowChangeAvatar(true)
                  }}
                  className='flex items-center justify-between'>
                  <div className="" >
                    Change Your Profile Picture
                  </div>
                  <ProfileIcon />
                </span> */}
                <span
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-between"
                >
                  <div className="">Settings</div>
                  <SettingsIcon />
                </span>
                <div className="h-[1px] bg-[#4B4B4B] w-full" />
                <span
                  className="flex items-center justify-between cursor-pointer !pb-[0px]"
                  onClick={onLogout}
                >
                  <span className="!pl-[0px]">Logout</span>
                  <LogoutIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={
          isScrolled
            ? addClassNames(styles["navbar"], styles["scrolled"])
            : styles["navbar"]
        }
      >
        {renderDesktopMenu()}
        {renderMobileMenuToggle()}
        {renderMobileMenuList()}
        {/* <GenresDropdown /> */}
      </div>
      <SettingsSidebar
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <ChangeAvatarModal
        first={isFirstChangeAvatar}
        show={showChangeAvatar}
        onClose={() => {
          setIsFirstChangeAvatar(false);
          setShowChangeAvatar(false);
        }}
      />
    </>
  );
};

export default Navbar;
