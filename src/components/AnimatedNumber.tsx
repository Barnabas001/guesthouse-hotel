import { useEffect, useState } from "react";
import { useInView } from "../hooks";

interface Props {
  target: number;
  suffix?: string;
}

export default function AnimatedNumber({ target, suffix = "" }: Props) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const increment = target / 60;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
