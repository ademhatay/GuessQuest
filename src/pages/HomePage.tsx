import CardComp from "@/components/base/CardComp"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Binary, CircleDashed, HelpCircle, Layers3 } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type CardData = {
  popular?: boolean
  horizontal?: boolean
  icon: React.ReactNode,
  title: string,
}

const cardData = [
  {
    popular: true,
    horizontal: true,
    icon: <Binary size={64} />,
    title: "Guess Number"
  },
  {
    icon: <Layers3 size={64} />,
    title: "Guess Logo"
  },
  {
    popular: true,
    icon: <CircleDashed size={64} />,
    title: "Guess Soccer Player"
  },
  {
    icon: <HelpCircle size={64} />,
    title: "Coming Soon"
  },
  {
    icon: <HelpCircle size={64} />,
    title: "Coming Soon"
  },
  {
    icon: <HelpCircle size={64} />,
    title: "Coming Soon"
  },
]

const HomePage = () => {

  const [cards, setCards] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const load = setTimeout(() => {
      setCards(cardData)
      setLoading(false)
    }, 3000)

  // clear the timeout when the component is unmounted
    return () => {
      clearInterval(load);
    }
  }, [])
  return <>
    <ScrollArea className="h-[calc(100vh-90px)]">
      <div className="grid md:grid-cols-3 gap-4 gap-y-2">
        {
          loading ? cardData.map((_, i) => <Skeleton key={i} className="w-full h-56" />) : cards.map((card, i) => <CardComp key={i} {...card} />)
        }
      </div>
    </ScrollArea>
  </>
}

export default HomePage
