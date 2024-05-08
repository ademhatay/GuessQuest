import Header from "@/components/base/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return <>
        <div className="container max-w-4xl bg-board dark:bg-slate-900 h-screen max-h-screen px-0 md:px-8 flex flex-col">
            <Header />
            <div className="container border-x-[1px] dark:border-slate-800 py-4 h-[calc(100%-48px)]">
                <Outlet />
            </div>
        </div>
    </>
}

export default Layout
