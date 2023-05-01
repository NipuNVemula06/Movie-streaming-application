import React, { useState } from "react";
import "./Banner.css";
import { BsFillPlayFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper";
import "swiper/swiper-bundle.min.css";

const Banner = () => {
  return (
    <div className="banner">
      <Swiper
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Scrollbar]}
      >
        {movies.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="banner_content">
              <img src={item.image} alt={item.title} className="banner_image" />
              <div className="banner_moviecontent">
                <span className="banner_movietitle">{item.title}</span>
                <span className="banner_moviedesc">{item.description}</span>
                <div className="banner_button_container">
                  <span className="banner_moviebutton">
                    <BsFillPlayFill className="banner_button_icon" />
                    Play
                  </span>
                  <span className="banner_moviebutton1">
                    <BsFillPlayFill className="banner_button_icon" />
                    Watch Trailer
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

const movies = [
  {
    id: 1,
    title: "Terminator: Dark Fate",
    image: "./assets/banner3.jpg",
    description:
      "Decades after Sarah Connor prevented Judgment Day, a lethal new Terminator is sent to eliminate the future leader of the resistance. In a fight to save mankind, battle-hardened Sarah Connor teams up with an unexpected ally and an enhanced super soldier to stop the deadliest Terminator yet.",
    type: "movie",
    link: "oxy8udgWRmo",
  },
  {
    id: 2,
    title: "Arcane",
    image: "./assets/banner1.jpg",
    description:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    type: "tv",
    link: "fXmAurh012s",
  },
  {
    id: 3,
    title: "Ant-Man And The Wasp: Quantumania",
    image: "./assets/banner2.jpg",
    description:
      "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    type: "movie",
    link: "ZlNFpri-Y40",
  },
  {
    id: 4,
    title: "Clock",
    image: "./assets/banner4.jpg",
    description:
      "On the eve of her 38th birthday, a woman desperately attempts to fix her broken biological clock.",
    type: "movie",
    link: "5h3WqGDpeYs",
  },
];
