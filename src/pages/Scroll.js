import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <div
          className={`scrolltotop${isVisible ? " show" : ""}`}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <AiOutlineArrowUp />
        </div>
      )}
    </>
  );
};

export default Scroll;
