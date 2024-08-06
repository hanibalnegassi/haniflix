import { useCallback, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";
// import { login } from "../../context/login/apiCalls";
import {
  Box,
  createTheme
} from "@mui/material";
import "../../Assets/css/styles.scss";

import { addClassNames } from "../../store/utils/functions";
import styles from "./welcome.module.scss";

import { ChevronDown, TranslateIcon } from "../../Assets/svgs/tsSvgs";
import AppAccordion from "./AppAccordion";

import { MdPeopleAlt } from "react-icons/md";
import { PiTiktokLogoFill } from "react-icons/pi";

import { PiXLogoFill } from "react-icons/pi";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import CustomButton from "../../components/GradientButton";
import ImageTicker from "../../components/TickerImages";
import GradientStarIcon from "../../components/GradientStars";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState<string | false>("none");

  // const authReducer = useAppSelector(state = state.auth)

  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate(`/register?email=${email}`);
  }, [email]);

  const handleExpand = (panel: string) => {
    setExpanded((curr) => (curr == panel ? "none" : panel));
  };

  const images = [
    "https://img.rgstatic.com/content/movie/b3c57191-35fb-4cc7-9f6f-351566bee2fa/poster-185.jpg",
    "https://img.rgstatic.com/content/movie/c77578d5-2736-4da6-9e8e-269509c5ef61/poster-185.webp",
    "https://img.rgstatic.com/content/movie/7a7e9292-8bd8-4223-b1c5-671b7e2cb6f8/poster-185.webp",
    "https://img.rgstatic.com/content/movie/0e1d4611-31e0-4fb9-aeb8-18e45aa3924b/poster-185.webp",
    'https://img.rgstatic.com/content/movie/c88a48d6-68b8-43f3-8891-e5038371705d/poster-185.webp',
    'https://img.rgstatic.com/content/movie/faffaca7-7850-4381-8002-0d07517cbb0d/poster-185.webp',
    'https://img.rgstatic.com/content/movie/7217441d-fe26-4313-9b8e-32adc49a6aec/poster-185.webp',
    'https://img.rgstatic.com/content/movie/e615349d-102c-497e-ac32-fb651a858553/poster-185.webp',
    'https://img.rgstatic.com/content/movie/326395f3-3c7c-44e9-812e-6cbb88396f2d/poster-185.webp',
    'https://img.rgstatic.com/content/movie/3a9a800d-b80a-4e4c-ab9e-c8a9e538410c/poster-185.webp',

  ];
  const accordionItems = [
    {
      id: "panel1",
      title: "What is Haniflix?",
      content: `Haniflix is the ultimate streaming service offering thousands of award-winning 4K movies & TV show ad-free FOR ONLY 99₵/MONTH!`,
    },
    {
      id: "panel2",
      title: "How much does Haniflix cost?",
      content: `Stream thousands of movies & TV shows FOR ONLY 99₵/MONTH!`,
    },
    {
      id: "panel3",
      title: "Where can I watch?",
      content: `Sign in with your Haniflix account to watch instantly on the web at www.haniflix.com anywhere on any device including computers, smart TVs, smart phones, tablets, streaming media players, and game consoles FOR ONLY 99₵/MONTH!`,
    },
    {
      id: "panel4",
      title: "How do I cancel?",
      content: `Haniflix is flexible. There are no pesky contracts or commitments. You can easily cancel your account online in two clicks. There are no cancellation fees. Start or stop your account anytime. Stream worry free FOR ONLY 99₵/MONTH!`,
    },
    {
      id: "panel5",
      title: "What can I watch on Haniflix?",
      content: `Haniflix has thousands of award-winning 4K movies & TV shows in all genres including action & adventure, animation, biography, children, crime, documentary, drama, family, fantasy, horror, mystery, romance, science-fiction, sport, thriller, and western FOR ONLY 99₵/MONTH!`,
    },
    {
      id: "panel6",
      title: "Is Haniflix good for kids?",
      content: `Haniflix offers thousands of movies & TV shows for kids FOR ONLY 99₵/MONTH!`,
    },
  ];

  const reviews = [{
    name: "Sarah D -",
    description: `"I've tried several streaming services, but none compare to Haniflix. The recommendations are spot on, and I love how easy it is to navigate through the content. It's become a staple in our household!"`,
    stars: 5
  },
  {
    name: "Michael R -",
    description: `"Haniflix has completely changed the way I watch TV. The original content is top-notch, and I find myself eagerly waiting for new releases. Plus, the ability to watch anywhere, anytime is a game-changer!"`,
    stars: 5
  },
  {
    name: "David M -",
    description: `"I was hesitant to try another streaming service, but Haniflix exceeded my expectations. The variety of options is impressive, and I appreciate the personalized suggestions. It's become my go-to for entertainment!"`,
    stars: 5
  }]

  const socialIcons = [
    { Icon: PiTiktokLogoFill, url: '#' },
    { Icon: PiXLogoFill, url: '#' },
    { Icon: PiInstagramLogoFill, url: '#' },
    { Icon: FaFacebookF, url: '#' }
  ];
  return (
    <div className={styles["welcomePage-outer"]}>
      <div className={styles["welcomePage"] + ' w-full h-full relative z-[1] overflow-y-scroll CustomScroller'}>
        <div className="absolute pointer-events-none top-0 right-0 left-0 h-[60px] bg-gradient-to-b from-black to-transparent"></div>
        <Box
          className={addClassNames(styles["top"], "ml-[40px] mr-[40px]")}

        // style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className={addClassNames(
              styles["wrapper"],
              " flex pt-9  items-center justify-between "
            )}
          >
            <a href={"/"} className={styles["link"]}>
              <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>

            </a>
            <div className="flex items-center space-x-[10px]">
              {/* <button
              className={addClassNames(
                styles["app_button"],
                "!w-[fit-content] px-[12px] flex items-center space-x-[7px]"
              )}
            >
              <TranslateIcon className="mr-2" />
              English
              <ChevronDown />
            </button> */}


              <button
                className={"theme_button_danger"}
                style={{
                  borderColor: '#14f59e',
                  background: '#14f59e1f',
                  color: '#14f59e',
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </Box>

        {/* <div className="rightBlob1" style={{
        left: '-20%',
        top: '0',
        width: '25vw',
        height: '25vw',
        filter: "blur(150px)",
        opacity: "0.5"
      }}></div> */}
        <div className={styles["get-started-section"]}>
          <h1>Discover The  <span className="gradient-text">ULTIMATE </span>Streaming Service</h1>
          <br />

          <button
            className={"theme_button_danger"}
            style={{
              borderColor: '#14f59e',
              background: '#14f59e1f',
              color: '#14f59e',
            }}
            onClick={onSignUp}
          >
            Get Started
          </button>
        </div>

        <div className={styles["middle-gradient-section"]}></div>
        <div className={styles["middle-text-section"]}>
          <div className={styles["middle-text-innersection"]}>
            <h1 className="font-semibold"> 
              Unlimited <span className="gradient-text"> • </span> Ad-Free <span className="gradient-text"> • </span>  Award-Winning <span className="gradient-text"> • </span>  4K Movies & TV Shows <span className="gradient-text"> FOR ONLY 99₵/MONTH</span>
              <br />
              <br />
              Join <span className="gradient-text"> 20M+ SATISFIED </span> Users

              <br />
              <br />
              Enjoy <span className="gradient-text">1 MONTH FREE TRIAL </span>
            </h1>
          </div>

          {/* <div className="centerBlob1"></div> */}
          {/* <div className="centerBlob3" style={{
          right: '20%',
          top: '6%',
        }}></div>
        <div className="centerBlob2" style={{
          top: '17%',
          height: "40vw"
        }}></div>
        <div className="centerBlob3" style={{
          right: '0%',
          top: '35%',
          height: "40vw",
          opacity: "0.4"
        }}></div>

        <div className="centerBlob2" style={{
          top: '35%',
          right: "100%",
          height: "40vw",
          opacity: ".60"
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
        }}></div> */}

          <center>
            <img src="/images/homeSS.png" style={{
              zIndex: "10",
              position: 'relative'
            }} />
          </center>


          <center>
            <h1  className="font-semibold"><span className="gradient-text">POPULAR </span></h1>
          </center>
          <div style={{
            maxWidth: "1120px",
            margin: 'auto',
            padding: "40px 0px",
            marginBottom: "60px"
          }}>
            <ImageTicker images={images} />
          </div>



          <center>
            <h1  className="font-semibold">See What  <span className="gradient-text">20M+ SATISFIED USERS </span>Are Saying</h1>
          </center>




          <div className="flex justify-center">
            <div className="w-full lg px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map(x => <div className={styles["reviews-box"] + ` p-4`}>
                  <p className="gradient-text2" style={{ fontSize: '24px' }}>{x.name}</p>
                  <p>{x.description}</p>
                  <div style={{ display: 'flex' }}>
                    {Array.from({ length: x.stars }, () => 0).map(() => <GradientStarIcon />)}
                  </div>
                </div>)}
              </div>
            </div>
          </div>






          <center>
            <h1  className="font-semibold">Frequently Ask <span className="gradient-text">QUESTIONS </span></h1>
          </center>



          <div className={addClassNames(
            styles["app-accordion"], "mx-[70px]")}>
            <AppAccordion items={accordionItems} />
          </div>




          <center>
            <h1  className="font-semibold">Join <span className="gradient-text">HANIFLIX </span>Today</h1>

            <button
              className={"theme_button_danger"}
              style={{
                borderColor: '#14f59e',
                background: '#14f59e1f',
                color: '#14f59e',
                marginBottom: '35px'
              }}
              onClick={onSignUp}
            >
              Get Started
            </button>


            {/* <img
            src={Logo}
            width="170px"
            alt="App logo"
            loading="lazy"
          /> */}
          </center>

          <div className="flex items-center justify-between  max-w-250px mx-auto" style={{ maxWidth: '250px' }}>
            {socialIcons.map((item, index) => (
              <Link key={index} to={item.url}>
                <svg width="50" height="50" viewBox="0 0 24 24">
                  {/* Define the linear gradient */}
                  <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="53.93%" stopColor="#14FA9B" />
                      <stop offset="77.59%" stopColor="#128EE9" />
                    </linearGradient>
                  </defs>

                  {/* Border circle */}
                  <circle cx="12" cy="12" r="11" fill="transparent" stroke='url(#starGradient)' strokeWidth="1" />

                  {/* Your SVG icon with gradient fill */}
                  <g transform="translate(7 7) scale(0.6)" >
                    <item.Icon style={{ fill: 'url(#starGradient)' }} className={styles["socialIcons"]} />
                  </g>
                </svg>
              </Link>
            ))}
          </div>
          <hr style={{ marginTop: "35px", marginBottom: "35px" }} />
          <div className={addClassNames(
            styles["footer-hme"], "flex justify-between")}>
            <div className="flex-none"> {/* Left column */}
              <p>© 2024 HANIFLIX . All rights reserved.</p>
            </div>
            <div className="flex-none"> {/* Right column */}
              <Link  className="font-semibold" to='/privacy-policy'>Privacy Policy</Link>  <Link  className="font-semibold" to='/terms-service'>Terms & Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
