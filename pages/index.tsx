import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [difference, setDifference] = useState(0);

  const target = new Date("2023-05-26 09:00:00");
  //const target = new Date("2023-01-26 01:59:00");

  const calcTimer = () => {
    const now = new Date();
    const d = target.getTime() - now.getTime();
    console.log(d);
    setDifference(d);
  };

  useEffect(() => {
    calcTimer();
    const interval = setInterval(calcTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const pad2 = val => val.toString().padStart(2, '0');

  const imagesCount = 10;
  const secondsPerImage = 5;
  const getActiveImageNum = () => Math.floor((minutes * 60 + seconds) % (imagesCount * secondsPerImage) / secondsPerImage);

  return (
    <div className="container">
      <Head>
        <title>ЕГЭ Таймер</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {difference < 0 ? (
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
              <div className="timer-group">
                <div className="timer-label">До ЕГЭ по химии осталось:</div>
                <div className="timer">
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
            </div>
          </div>
          {[...Array(imagesCount).keys()].map(num => (
            <Image
              key={num}
              alt="background image"
              className={getActiveImageNum() === num ? 'visible' : 'hidden'}
              src={`/image_${num}.jpg`}
              fill
              quality={100}
              priority
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
