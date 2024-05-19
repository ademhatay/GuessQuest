import React from "react";
import OnlineGame from "@/components/game/OnlineGame";
import SoloGame from "@/components/game/SoloGame";
import { useParams } from "react-router-dom";


interface GuessPlayerProps {
}


const GuessPlayer: React.FC<GuessPlayerProps> = () => {
    const {mode} = useParams();
    return <>
    GuessPlayer
        {
            mode === 'solo' ? <SoloGame /> : <OnlineGame />
        }
    </>
}

export default GuessPlayer
