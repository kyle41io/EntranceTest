 import React, { useRef } from 'react'
 import { useState, useEffect } from 'react';

interface Props {
  seconds: number;
}

const formatTime = (time: number): string => {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = '0' + minutes;
  if (seconds <= 10) seconds = '0' + seconds;

  return `${minutes}:${seconds}`;
};
export default function Timer({ seconds }: Props) {
  const [countdown, setCountdown] = useState<number>(seconds);
  const timerId = useRef<number | undefined>();

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      setCountdown((prev: number) => prev - 1);
    }, 1000);
    return () => {
      if (timerId.current) {
        window.clearInterval(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown <= 0 && timerId.current) {
      window.clearInterval(timerId.current);
      alert("Hết thời gian làm bài!");
    }
  }, [countdown]);

  return <h2>{formatTime(countdown)}</h2>;
}