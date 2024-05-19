import { useQuery } from 'react-query';

export default function useRequestQuery(url: string, name: string) {

    return useQuery(name, async () => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Network response error')
        }

        return res.json()
    });
}
