import Layout from "@/layouts/Layout";
import { Home } from "@/pages";
import GamePage from "@/pages/GamePage";
import GuessLogo from "@/pages/modes/GuessLogo";
import GuessNumber from "@/pages/modes/GuessNumber";
import GuessPlayer from "@/pages/modes/GuessPlayer";


const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "game",
                element: <GamePage />,
                children: [
                    {
                        path: "guess-number/:mode",
                        element: <GuessNumber />
                    },
                    {
                        path: "guess-logo/:mode",
                        element: <GuessLogo />
                    },
                    {
                        path: "guess-player/:mode",
                        element: <GuessPlayer />
                    }
                ]
            }
        ]
    }
]


export default routes;
