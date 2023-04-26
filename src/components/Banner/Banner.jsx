import React from "react";
import "./Banner.css";
import { BsFillPlayFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

const Banner = () => {
  return (
    <div className="banner">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
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
                    <BsFillPlayFill size={24} />
                    Play
                  </span>
                  <span className="banner_moviebutton1">
                    <BsFillPlayFill size={24} />
                    Trailer
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
    title: "Justice League",
    image: "./assets/banner1.jpg",
    description:
      "Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne enlists the help of his newfound ally Diana Prince to face an unprecedented threat. Together, Batman and Wonder Woman recruit a team of metahumans to form the Justice League, an alliance of heroes with extraordinary abilities. As they join forces to save the world from the malevolent Steppenwolf and his army of parademons, the newly formed Justice League must put aside their differences and come together to protect the planet from an otherworldly invasion. With thrilling action, epic battles, and iconic DC Comics characters, 'Justice League' is a superhero blockbuster that brings the beloved heroes to life on the big screen.",
  },
  {
    id: 2,
    title: "Intersteller",
    image: "./assets/banner2.jpg",
    description:
      "From acclaimed director Christopher Nolan comes 'Interstellar,' a breathtaking science fiction epic that follows a team of explorers as they journey through a wormhole in search of a new habitable planet. With Earth facing an environmental and agricultural crisis, a group of astronauts led by Cooper, a former NASA pilot, must brave the unknown dangers of space and confront mind-bending phenomena to save humanity. As they voyage through distant galaxies and encounter awe-inspiring phenomena, the crew must grapple with their own mortality, love, sacrifice, and the limits of human understanding. With mesmerizing visuals, thought-provoking concepts, and powerful performances, 'Interstellar' is an unforgettable cinematic experience that pushes the boundaries of science fiction storytelling.",
  },
  {
    id: 3,
    title: "Terminator: Dark Fate",
    image: "./assets/banner3.jpg",
    description:
      "In 'Terminator: Dark Fate,' a deadly new Terminator is sent from the future to hunt down a young woman named Dani Ramos. With humanity's fate at stake once again, Sarah Connor, the original Terminator's target, and a T-800 Terminator join forces to protect Dani and prevent the deadly machine from altering the course of history. As they evade the relentless pursuit of the advanced Terminator, they uncover shocking secrets and face heart-pounding challenges in a race against time. 'Terminator: Dark Fate' is a high-octane science fiction action film that brings back the iconic characters and intense thrills that made the franchise a global phenomenon.",
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    image: "./assets/banner4.jpg",
    description:
      "Peter Parker, also known as Spider-Man, faces his greatest challenge yet in 'Spider-Man: No Way Home.' As his secret identity is exposed and his world is turned upside down, Peter seeks help from his mentor, Doctor Strange, to undo the dangerous consequences of a spell gone wrong. But the situation becomes even more complicated when villains from other dimensions start appearing in his reality, threatening not only his own existence but the entire multiverse. With the fate of not just his world, but all of reality at stake, Spider-Man must team up with allies from different universes to face an unprecedented threat. Packed with action, humor, and unexpected twists, 'Spider-Man: No Way Home' promises to be a thrilling and game-changing chapter in the Spider-Man saga.",
  },
];
