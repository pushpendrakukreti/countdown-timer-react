import React, { useState, useEffect } from "react";

function Countdown() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [countdownTime, setCountdownTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseTime, setPauseTime] = useState(0);

    useEffect(() => {
        let timer;

        if (isRunning && !isPaused) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning, isPaused]);

    useEffect(() => {
        if (time === 0) {
            setIsRunning(false);
        }
    }, [time]);

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
        setPauseTime(time);
    };

    const handleResume = () => {
        setIsPaused(false);
        setTime(pauseTime);
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTime(countdownTime);
    };

    const handleReset = () => {
        setIsPaused(false);
        setTime(countdownTime);
    };

    const handleCountdownChange = (event) => {
        setCountdownTime(Number(event.target.value));
        setTime(Number(event.target.value));
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="countdown">
            <h1>Countdown Timer App</h1>
            <br />
            <div className="ct-div">
                <label className="label-ct">Countdown Time (in seconds): </label>
                <input
                    min={0}
                    type="number"
                    value={countdownTime}
                    onChange={handleCountdownChange}
                />
            </div>
            <div className="label-ct-2">Time: {formatTime(time)}</div>
            {!isRunning && !isPaused && (
                <button className="start" onClick={handleStart} disabled={countdownTime === 0}>
                    Start
                </button>
            )}
            {isRunning && !isPaused && (
                <>
                    <button className="pause" onClick={handlePause}>Pause</button>
                    <button className="stop" onClick={handleStop}>Stop</button>
                </>
            )}
            {isPaused && (
                <>
                    <button className="resume" onClick={handleResume}>Resume</button>
                    <button className="stop" onClick={handleStop}>Stop</button>
                </>
            )}
            <button className="reset" onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Countdown;
