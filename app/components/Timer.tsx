import React, { useRef, useState, useEffect } from 'react';

interface Props {
  seconds: number;
  handleConfirm: () => void; // khai báo kiểu của prop handleConfirm
}

const formatTime = (time: number): string => {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return `${minutes}:${seconds}`;
};

const Timer: React.FC<Props> = ({ seconds, handleConfirm }) => { // truyền prop handleConfirm vào component Timer
  const [countdown, setCountdown] = useState<number>(seconds);
  const [isLastMinute, setIsLastMinute] = useState<boolean>(false);
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
      handleConfirm(); // gọi hàm handleConfirm
    } else if (countdown === 59) {
      setIsLastMinute(true);
    }
  }, [countdown]);

  return (
    <h2 className={`text-3xl ${isLastMinute ? 'text-red-500' : ''}`}>
      {formatTime(countdown)}
    </h2>
  );
};

export default Timer;