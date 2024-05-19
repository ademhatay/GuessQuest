import React from "react";
import OnlineGame from "@/components/game/OnlineGame";
import SoloGame from "@/components/game/SoloGame";
import { useParams } from "react-router-dom";


interface GuessLogoProps {
}


const GuessLogo: React.FC<GuessLogoProps> = () => {
    const {mode} = useParams();
    return <>
        {
            mode === 'solo' ? <SoloGame /> : <OnlineGame />
        }
    </>
}

export default GuessLogo
