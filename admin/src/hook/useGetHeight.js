import { useEffect, useState } from "react";

export default function useGetHeight(elRef) {
  const [h, setH] = useState(0);
  let _window = {};
  if (typeof window !== "undefined") {
    _window = window;
  }
  const [width, setWidth] = useState(_window ? _window.innerWidth : 2000);

  useEffect(() => {
    if (_window) {
      const handleResize = () => {
        setWidth(_window.innerWidth);
      };
      _window.addEventListener("resize", handleResize);
      return () => {
        _window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (elRef && elRef.current) {
        elRef.current.style.height = "auto";
        setH(elRef.current.offsetHeight);
      }
    }, 50);
  }, [elRef, width]);
  return !h ? "auto" : h + "px";
}
