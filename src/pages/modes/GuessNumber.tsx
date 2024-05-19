/* eslint-disable react-hooks/exhaustive-deps */
import Heart from "@/components/Icon/Heart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRandomMessage } from "@/lib/utils";
import useGameState from "@/store/useGameStatus";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";

import error from '../../assets/error.mp3';
import fail from '../../assets/fail.mp3';
import correct from '../../assets/correct.mp3';
import countdownSound from '../../assets/countdown.mp3';


interface GuessNumberProps { }

const GuessNumber: React.FC<GuessNumberProps> = () => {
    const {
        gameStatus,
        startGame,
        endGame,
        loading,
        setLoading,
        guess,
        setGuess,
        message,
        setMessage,
        guessList,
        setGuessList,
        lives,
        setLives,
        countdown,
        setCountdown,
        resetGame,
    } = useGameState();
    const [number, setNumber] = useState(0);

    function play(sound: string){
        new Audio(sound).play();
    }


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [loading, countdown]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (+value >= 1 && +value <= 100 || value === '')) {
            setGuess(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !loading && guess.trim() !== '') {
            handleGuess();
        }
    };

    const fetchRandomNumber = async () => {
        setLoading(true);
        setTimeout(() => {
            setNumber(Math.floor(Math.random() * 100) + 1);
            setLoading(false);
        }, 3000);
    };

    const handleStartGame = () => {
        play(countdownSound);
        fetchRandomNumber();
        startGame();
    };

    const handleGuess = () => {
        const guessNumber = parseInt(guess, 10);
        if (isNaN(guessNumber)) {
            setMessage({ text: getRandomMessage('invalidNumber'), color: "text-red-500" });
            return;
        }

        if (guessList.some(item => item.guess === guess)) {
            setMessage({ text: getRandomMessage('alreadyGuessed'), color: "text-red-500" });
            setGuess("");
            return;
        }

        let newMessage = "";
        let color = "";
        if (guessNumber === number) {
            newMessage = getRandomMessage('correctGuess') + ` The number was ${number}`;
            color = "text-green-500";
            play(correct);
            endGame();
        } else if (guessNumber < number) {
            newMessage = getRandomMessage('lowGuess');
            // eğer son can ise ses çalma diperlerinde çal
            lives !== 1 ? play(error) : null;
            color = "text-red-500";
        } else {
            newMessage = getRandomMessage('highGuess');
            lives !== 1 ? play(error) : null;
            color = "text-purple-500";
        }

        setGuessList([...guessList, { guess: guess, message: newMessage, color }]);
        setMessage({ text: newMessage, color });

        if (guessNumber !== number) {
            const remainingLives = lives - 1;
            setLives(remainingLives);
            if (remainingLives <= 0) {
                setMessage({ text: getRandomMessage('gameOver') + ` The number was ${number}`, color: "text-red-500" });
                play(fail);
                endGame();
            }
        }

        setGuess("");
    };

    const handleReset = () => {
        resetGame();
    };

    return (
        <>
            <Card className="w-full h-5/6">
                <CardHeader className="text-center border-b-[1px]">
                    <CardTitle>You</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center h-5/6">
                    {gameStatus === "idle" && (
                        <Button onClick={handleStartGame} className="w-full">
                            <span className="text-2xl">Start</span>
                        </Button>
                    )}
                    {gameStatus === "playing" && (
                        <>
                            <div className="text-3xl mb-4">
                                {loading ? (
                                    <div className="countdown">
                                        <div className="countdown-circle">
                                            <div className="countdown-circle-inner"></div>
                                        </div>
                                        <div className="countdown-text">{countdown}</div>
                                    </div>
                                ) : (
                                    "Your Guess Here"
                                )}
                            </div>
                            <div className={`text-3xl mb-4 ${message.color}`}>
                                {message.text}
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                {guessList.map((item, index) => (
                                    <div key={index} className={`text-2xl ${item.color}`}>
                                        {item.guess}: {item.message}
                                    </div>
                                ))}
                            </div>
                            {gameStatus === "playing" && !loading && (
                                <div className="text-2xl mb-4 flex gap-x-2">
                                    {Array.from({ length: lives }).map((_, index) => (
                                        <Heart key={index} filled={index < lives} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    {gameStatus === "finished" && (
                        <>
                            <div className={`text-3xl mb-4 ${message.color}`}>
                                {message.text}
                            </div>
                            <Button onClick={handleReset} className="w-full">
                                <span className="text-2xl">Restart</span>
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
            {!loading && gameStatus === "playing" && (
                <div className="flex gap-x-3 justify-evenly items-center w-full mt-4">
                    <input
                        value={guess}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        type="number"
                        className="border border-gray-300 text-black p-2 rounded flex-1"
                        maxLength={3}
                    />
                    <button
                        onClick={handleGuess}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                        <SendHorizonal size={24} />
                    </button>
                </div>
            )}
        </>
    );
};

export default GuessNumber;
