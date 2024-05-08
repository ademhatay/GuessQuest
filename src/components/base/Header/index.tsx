import { Button } from "../../ui/button";
import ResponsiveModal from "../ResponsiveDialog";
import { BookType, ChevronDown, Contact, Facebook, Info, Link, PersonStanding, PlusCircle, Settings2, Share2, Twitter } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSettings } from "@/context/settingsContext";


type AboutButtonType = {
    title: string;
    icon: JSX.Element;
    description: string;
    children: JSX.Element;
}

const AboutButtons = [
    {
        title: "Share with Friends",
        icon: <Share2 size={22} />,
        description: "Share with your friends and invite them to play the game.",
        children: <ScrollArea>
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2">
                    <Button variant="outline" className="flex-1 gap-x-1">
                        <Link size={16} />
                        Copy Link
                    </Button>
                    <Button variant="outline" className="flex-1 gap-x-1">
                        <Facebook size={16} />
                        Share on Facebook
                    </Button>
                    <Button variant="outline" className="flex-1 gap-x-1">
                        <Twitter size={16} />
                        Share on Twitter
                    </Button>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    },
    {
        title: "Credits",
        icon: <PersonStanding size={22} />,
        description: "View the credits of the game.",
        children: <div className="flex flex-col gap-y-1">
            <p>Developed by <Button variant="link"><a href="https://ademhatay.com" target="_blank">Adem Hatay</a></Button></p>
            <p>Designed by <Button variant="link"><a href="https://ademhatay.com" target="_blank">Adem Hatay</a></Button></p>
        </div>
    },
    {
        title: "Terms of Service",
        icon: <BookType size={22} />,
        description: "Read the terms of service of the game.",
        children: <div className="flex flex-col gap-y-1">
            <p>By playing the game, you agree to the terms of service.</p>
            <p>Read the terms of service <Button variant="link"><a href="https://ademhatay.com">here</a></Button></p>
        </div>
    },
    {
        title: "Contact Us",
        icon: <Contact size={22} />,
        description: "Contact the developers of the game.",
        children: <div className="flex flex-col gap-y-1">
            <p>Do you have a question or suggestion?</p>
            <p>Contact us at <Button variant="link"><a href="mailto:support@mohicantask.com" target="_blank">support@mohicantask.com</a></Button></p>
        </div>
    }
];

const Header = () => {
    const { setTheme, theme, sound, setSound, language, setLanguage } = useSettings();
    return <>
        <header className="w-full border-x-[1px] border-b-[1px] py-3 pb-2 px-5 flex justify-between dark:border-slate-800">
            <div className="flex gap-x-4">
                <ResponsiveModal
                    trigger={<div title="About"><Info size={28} /></div>}
                    title="About"
                    description="Guess Quest is a guessing game. Guess various objects, logos, numbers and more by competing with online players."
                >
                    <div className="flex flex-col gap-y-1">
                        {AboutButtons.map((item: AboutButtonType, index: number) => (
                            <ResponsiveModal
                                key={index}
                                trigger={<Button variant="outline" className="flex gap-x-2 w-full">
                                    {item.icon}
                                    {item.title}
                                </Button>}
                                title={item.title}
                                description={item.description}
                            >
                                {item.children}
                            </ResponsiveModal>
                        ))}

                    </div>
                </ResponsiveModal>

                <ResponsiveModal
                    trigger={<div title="Create Game"><PlusCircle size={28} /></div>}
                    title="Create Game"
                    description="Create rooms to play with your friends."
                >
                    <div className="flex flex-col gap-y-4">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Game Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="classic">Classic</SelectItem>
                                <SelectItem value="time">Time</SelectItem>
                                <SelectItem value="fast">Fast</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">Create</Button>
                    </div>
                </ResponsiveModal>
            </div>

            <h1 className="text-xl font-bold">Guess Quest</h1>

            <ResponsiveModal
                trigger={<div title="Settings"><Settings2 size={28} /></div>}
                title="Settings"
                description="You can make settings related to the game here."
            >
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-2">
                        <Input placeholder="New Username..." id="username" type="text" />
                        <Button>Save</Button>
                    </div>

                    <ResponsiveModal
                        trigger={<Button variant="outline" className="flex justify-between items-center px-5" title="Language"><span className="flex gap-x-2">Language</span><ChevronDown size={16} /></Button>}
                        title="Language"
                        description="You can change the language of the game.">
                        <div className="flex flex-col gap-y-1">
                            <Button
                                variant={language === "en" ? "secondary" : "outline"}
                                onClick={() => setLanguage("en")}
                                className="w-full"
                            >
                                English
                            </Button>
                            <Button
                                variant={language === "tr" ? "secondary" : "outline"}
                                onClick={() => setLanguage("tr")}
                                className="w-full"
                            >
                                Türkçe
                            </Button>
                        </div>
                    </ResponsiveModal>
                    
                    <ResponsiveModal
                        trigger={<Button variant="outline" className="flex justify-between items-center px-5" title="Theme"><span className="flex gap-x-2">Theme</span><ChevronDown size={16} /></Button>}
                        title="Theme"
                        description="You can change the theme of the game."
                    >
                        <div className="flex flex-col gap-y-1">
                            <Button
                                variant={theme === "light" ? "secondary" : "outline"}
                                onClick={() => setTheme("light")} className="w-full"
                            >
                                Light
                            </Button>
                            <Button
                                variant={theme === "dark" ? "secondary" : "outline"}
                                onClick={() => setTheme("dark")}
                                className="w-full">
                                Dark
                            </Button>
                            <Button
                                variant={theme === "system" ? "secondary" : "outline"}
                                onClick={() => setTheme("system")} className="w-full"
                            >
                                System
                            </Button>
                        </div>
                    </ResponsiveModal>

                    <ResponsiveModal
                        trigger={<Button variant="outline" className="flex justify-between items-center px-5" title="Sounds"><span className="flex gap-x-2">Sounds</span><ChevronDown size={16} /></Button>}
                        title="Sounds"
                        description="You can change the sounds of the game.">
                        <div className="flex flex-col gap-y-1">
                            <Button
                                variant={sound === "on" ? "secondary" : "outline"}
                                onClick={() => setSound("on")}
                                className="w-full"
                            >
                                On
                            </Button>
                            <Button
                                variant={sound === "off" ? "secondary" : "outline"}
                                onClick={() => setSound("off")}
                                className="w-full"
                            >
                                Off
                            </Button>
                        </div>
                    </ResponsiveModal>
                </div>
            </ResponsiveModal>
        </header>

    </>
}

export default Header
