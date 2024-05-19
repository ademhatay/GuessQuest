import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Flame } from "lucide-react"
import { Link } from "react-router-dom"
import IconMapping from "./IconMap"

type CardCompProps = {
  popular?: boolean
  horizontal?: boolean
  icon?: string
  title: string
}

const CardComp = ({ popular, horizontal, icon, title }: CardCompProps) => {
    const IconComponent = icon ? IconMapping[icon] : null;
  return (
    <Card className={`${popular ? 'border-red-500' : ''} ${horizontal ? 'md:col-span-2' : ''} relative items-center ${title === 'Coming Soon' ? 'flex flex-col justify-center' : ''}`}>
      <CardHeader>
        <CardTitle className="text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-evenly">
      {IconComponent}
        {
          popular && <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-tr-md rounded-bl-md">
            <Flame size={40} />
          </div>
        }
      </CardContent>

      {title && title !== 'Coming Soon' && <CardFooter className="gap-x-3">
        <Link className="w-full" to={`/game/${title.toLowerCase().replace(' ', '-')}/solo`}>
          <Button variant="outline" className="w-full">Solo</Button>
        </Link>
        <Link className="w-full" to={`/game/${title.toLowerCase().replace(' ', '-')}/online`}>
          <Button variant="outline" className="w-full">Online</Button>
        </Link>
      </CardFooter>}
    </Card>
  )
}

export default CardComp
