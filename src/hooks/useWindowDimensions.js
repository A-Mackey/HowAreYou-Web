import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    windowWidth: 1,
    windowHeight: 1,
  });

  useEffect(() => {
    setWindowDimensions({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    function handleResize() {
      setWindowDimensions({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
