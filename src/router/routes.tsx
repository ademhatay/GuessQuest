import Layout from "@/layouts/Layout";
import { Home } from "@/pages";



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
                path: "/about",
                element: <h1>About</h1>
            }
        ]
    }
]


export default routes;
