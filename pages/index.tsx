import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // const target = new Date("2023-05-26 09:00:00");
  const target = new Date("2023-01-25 23:59:59");

  const calcTimer = () => {
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    setDays(d);

    const h = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    setHours(h);

    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    setMinutes(m);

    const s = Math.floor((difference % (1000 * 60)) / 1000);
    setSeconds(s);

    if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
      setPartyTime(true);
    }
  };

  useEffect(() => {
    calcTimer();
    const interval = setInterval(calcTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad2 = val => val.toString().padStart(2, '0');

  return (
    <div className={styles.container}>
      <Head>
        <title>Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {partyTime ? (
        <>
          <h1>Happy new year!</h1>
          <video autoPlay loop muted>
            <source src="/party.mp4" />
          </video>
        </>
      ) : (
        <>
          <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="time">{pad2(days)}</span>
                <span className="label">Дней</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{pad2(hours)}</span>
                <span className="label">Часов</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{pad2(minutes)}</span>
                <span className="label">Минут</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{pad2(seconds)}</span>
                <span className="label">Секунд</span>
              </div>
            </div>
          </div>
          <Image
            alt="background image"
            src="/image.webp"
            layout="fill"
            quality={100}
          />
        </>
      )}
    </div>
  );
};

export default Home;
