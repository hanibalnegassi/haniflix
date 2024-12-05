import Box from "@mui/material/Box";
import { useCallback } from "react";
import { FaFacebookF } from "react-icons/fa";
import { PiInstagramLogoFill, PiTiktokLogoFill, PiXLogoFill, PiYoutubeLogoFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';

import GradientStarIcon from "../../components/GradientStars";
import ImageTicker from "../../components/TickerImages";
import { addClassNames } from "../../store/utils/functions";
import AppAccordion from "./AppAccordion";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import "../../Assets/css/styles.scss";
import styles from "./welcome.module.scss";

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
  '/movies posters/Bad Boys Ride or Die.png',
  '/movies posters/Beetlejuice Beetlejuice.png',
  '/movies posters/Civil War.png',
  '/movies posters/DEADPOOL & WOLVERINE.png',
  '/movies posters/Despicable Me 4.png',
  '/movies posters/Furiosa A Mad Max Saga.png',
  '/movies posters/Godzilla x Kong he New Empire.png',
  '/movies posters/INSIDE OUT 2.png',
  '/movies posters/Kingdom of the Planet of the Apes.png',
  '/movies posters/KUNG FU PANDA 4.png',
  '/movies posters/MOANA 2.png',
  '/movies posters/SMILE.png',
  '/movies posters/The Fall Guy.png',
  '/movies posters/TWISTERS.png',
  '/movies posters/Venom The Last Dance.png',
];

const LOGOS = [
  "/affiliate logos/DREAMWORKS STUDIOS.png",
  "/affiliate logos/LIONSGATE.png",
  "/affiliate logos/PARAMOUNT.png",
  "/affiliate logos/SONY PICTURES.png",
  "/affiliate logos/UNIVERSAL.png",
  "/affiliate logos/WALT DISNEY PICTURES.png",
  "/affiliate logos/WARNER BROS.png",
  "/affiliate logos/20_century_studio.webp",
  "/affiliate logos/amazon_mgm.webp"
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

const reviews = [
  {
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
  }
]

const socialIcons = [
  { Icon: PiYoutubeLogoFill, url: '#' },
  { Icon: PiTiktokLogoFill, url: '#' },
  { Icon: PiXLogoFill, url: '#' },
  { Icon: PiInstagramLogoFill, url: '#' },
  { Icon: FaFacebookF, url: '#' }
];

// LogoWrapper
const GradientDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  background: 'linear-gradient(180deg, rgba(30, 34, 45, 0) 0%, #0f152b 100%)',
}));

export default function Welcome() {
  const navigate = useNavigate();

  const onSignUp = useCallback(() => navigate('/register'), []);

  const getStartedBtn = (
    <button
      className="theme_button_danger mx-auto my-1 block"
      style={{
        borderColor: '#14f59e',
        background: '#14f59e1f',
        color: '#14f59e',
      }}
      onClick={onSignUp}
    >
      Get Started
    </button>
  );

  const socialIconsDiv = (
    <div className="flex items-center justify-between mx-auto gap-1 lg:gap-3 lg:-mt-2" style={{ maxWidth: 300 }}>
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
  );

  return (
    <div className={styles["welcomePage-outer"] + ' w-full'}>
      <div className={styles["welcomePage"] + ' w-full h-full relative z-[1] overflow-y-scroll CustomScroller'}>
        <Box className={addClassNames(styles["top"], "ml-[40px] mr-[40px]")}>
          <div
            className={addClassNames(
              styles["wrapper"],
              "flex pt-9  items-center justify-between"
            )}
          >
            <Link to={"/"} className={styles["link"] + " no-underline"}>
              <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>
            </Link>
            <div className="flex items-center space-x-[10px]">
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

        {/* <div className={styles["get-started-section"]}>
          <br />
        </div> */}

        <div className={styles["middle-text-section"]}>
          <section className="mb-4">
            <div className={styles["middle-text-innersection"]}>
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="font-semibold"
              >
                <SwiperSlide className="flex flex-col items-center justify-center">
                  <h1>Discover The <span className="gradient-text">ULTIMATE </span>Streaming Service</h1>
                  {getStartedBtn}
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center justify-center">
                  <h1>
                    Unlimited <span className="gradient-text">•</span>
                    {" "}Ad-Free <span className="gradient-text">•</span>
                    {" "}Award-Winning <span className="gradient-text">•</span>
                    {" "}4K Movies & TV Shows
                    {" "}<span className="gradient-text">FOR ONLY 99₵/MONTH</span>
                  </h1>
                  {getStartedBtn}
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center justify-center">
                  <h1>Join <span className="gradient-text">20M+</span> Satisfied Users</h1>
                  {getStartedBtn}
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center justify-center">
                  <h1>Enjoy 1 Month <span className="gradient-text">FREE</span> On Us</h1>
                  {getStartedBtn}
                </SwiperSlide>
              </Swiper>
            </div>
          </section>

          <center>
            <img src="/images/homeSS.png" style={{
              zIndex: "10",
              position: 'relative'
            }} />
          </center>

          <center>
            <h1 className="font-semibold">
              See What <span className="gradient-text">20M+</span> Satisfied Users Are Enjoying
            </h1>
          </center>
          <ImageTicker images={images} />

          <section>
            <center>
              <h1 className="font-semibold">See What <span className="gradient-text">20M+</span> Satisfied Users Are Saying</h1>
            </center>
            {/* Not Mobile */}
            <div className="justify-center hidden md:flex">
              <div className="w-full lg px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reviews.map((x, index) => (
                    <div key={index} className={styles["reviews-box"] + ` p-4`}>
                      <p className="gradient-text2" style={{ fontSize: '24px' }}>{x.name}</p>
                      <p>{x.description}</p>
                      <div style={{ display: 'flex' }}>
                        {Array.from({ length: x.stars }, () => 0).map(() => <GradientStarIcon />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="block md:hidden">
              <Swiper
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
              >
                {reviews.map((x, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles["reviews-box"] + ` p-4`}>
                      <p className="gradient-text2" style={{ fontSize: '24px' }}>{x.name}</p>
                      <p>{x.description}</p>
                      <div style={{ display: 'flex' }}>
                        {Array.from({ length: x.stars }, () => 0).map(() => <GradientStarIcon />)}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <center>
            <h1 className="font-semibold">Our <span className="gradient-text">PARTNERS</span></h1>
          </center>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-9">
            {LOGOS.map((item: string) => (
              <GradientDiv>
                <img className="invert" src={item} width="200" />
              </GradientDiv>
            ))}
          </div>

          <center>
            <h1 className="font-semibold">Frequently Ask <span className="gradient-text">QUESTIONS </span></h1>
          </center>

          <div className={addClassNames(
            styles["app-accordion"], "mx-[70px]")}>
            <AppAccordion items={accordionItems} />
          </div>

          <button
            className="theme_button_danger block m-auto my-9"
            style={{
              borderColor: '#14f59e',
              background: '#14f59e1f',
              color: '#14f59e',
            }}
            onClick={onSignUp}
          >
            Get Started
          </button>

          <center>
            <h1 className="font-semibold"><span className="gradient-text">CONNECT</span> With Us</h1>
          </center>
          <div className={addClassNames(
            styles["footer-hme"], "flex justify-between items-center gap-4")}
          >
            {/* Only Mobile */}
            <div className="block md:hidden text-center">
              {socialIconsDiv}
            </div>
            <div className="flex-none w-[285px] text-center">
              <p>© 2024 HANIFLIX . All rights reserved.</p>
            </div>

            {/* Not Mobile */}
            <div className="hidden md:block">
              {socialIconsDiv}
            </div>

            <div className="flex-none w-[285px] text-center">
              <Link to='/privacy-policy'>Privacy policy</Link>
              &nbsp;&nbsp;&nbsp;
              <Link to='/terms-service'>Terms of service</Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
