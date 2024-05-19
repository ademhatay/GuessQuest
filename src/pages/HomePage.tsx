import CardComp from "@/components/base/CardComp"
import { ScrollArea } from "@/components/ui/scroll-area"
import useRequestQuery from "@/hooks/useRequestQuery"
import { useQueryClient } from "react-query"

type Mod = {
  id: string;
  name: string;
  description: string;
  isPopular: boolean;
  icon: string;
  isHorizontal?: boolean;
}

type ErrorWithMessage = {
  message: string;
};

const HomePage = () => {

const {isLoading, error} = useRequestQuery(`${import.meta.env.VITE_API_URL}/api/mods`, 'mods');

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Mod[]>('mods');

  if (error) {
    const errorMessage = (error as ErrorWithMessage).message;
    return <div>Error: {errorMessage}</div>;
  }
  return (
    
    <ScrollArea className="h-[calc(100vh-90px)]">
      
      <div className="grid md:grid-cols-2 gap-4 gap-y-2">
        {
          !error && isLoading ? <div>Loading...</div> : data?.map((mod) => (
            <CardComp
              key={mod.id}
              popular={mod.isPopular}
              horizontal={mod.isHorizontal}
              icon={mod.icon}
              title={mod.name}
            />
          ))
        }
      </div>
    </ScrollArea>
  )
}

export default HomePage
