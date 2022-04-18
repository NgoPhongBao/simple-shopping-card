import React from "react";
import { useSpring, animated } from "react-spring";

export default function AnimatedNum({
  number = 0,
  isMoney = 0,
  duration = 500,
}) {
  const style = useSpring({
    number: number,
    from: {
      number: 0,
    },
    config: {
      duration: duration,
    },
  });
  return (
    <animated.div style={{ ...style }}>
      {style.number.to((value) => {
        return isMoney
          ? new Intl.NumberFormat().format(value.toFixed(0))
          : value.toFixed(0);
      })}
    </animated.div>
  );
}
