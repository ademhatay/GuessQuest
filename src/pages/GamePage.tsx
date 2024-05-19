import { Button } from "@/components/ui/button";
import useGameState from "@/store/useGameStatus";
import { ArrowLeftCircle } from "lucide-react"
import { Link, Outlet, useParams } from "react-router-dom"

const GamePage = () => {
    const { mode } = useParams();
    const { resetGame } = useGameState();

    return <>
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center px-3">
                <Button onClick={resetGame} variant="ghost">
                    <Link to="/">
                        <ArrowLeftCircle size={32} />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold">
                    {mode && mode.charAt(0).toUpperCase() + mode.slice(1)}
                </h1>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-y-6 items-center">
                <Outlet />
            </div>
        </div>
    </>
}

export default GamePage
