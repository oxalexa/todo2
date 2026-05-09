import { useState, useEffect, memo, useRef } from "react";
import { fadeInLeft, reduceMotion } from "../styles";
import { getRandomGreeting } from "../utils";
import styled from "@emotion/styled";

export const AnimatedGreeting = memo(() => {
  const [randomGreeting, setRandomGreeting] = useState<string>(() => getRandomGreeting());
  const [greetingKey, setGreetingKey] = useState<number>(0);

  const animationFrameIdRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    const updateInterval = 6000;

    const updateGreeting = (timestamp: number) => {
      if (timestamp - lastUpdateTimeRef.current >= updateInterval) {
        lastUpdateTimeRef.current = timestamp;
        const newGreeting = getRandomGreeting();
        setRandomGreeting(newGreeting);
        setGreetingKey((prev) => prev + 1);
      }

      animationFrameIdRef.current = requestAnimationFrame(updateGreeting);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateGreeting);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <GreetingText key={greetingKey} className="animated-greeting">
      {randomGreeting}
    </GreetingText>
  );
});

const GreetingText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  margin-top: 4px;
  margin-left: 8px;
  font-style: italic;
  opacity: 0.75;
  will-change: transform, opacity;
  animation: ${fadeInLeft} 0.5s ease-in-out;
  ${({ theme }) => reduceMotion(theme)}
  @media print {
    display: none;
  }
`;
