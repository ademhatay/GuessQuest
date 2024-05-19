import { create } from 'zustand';

interface NumberStore {
    number: number;
    getRandomNumber: () => void;
}

const useNumberStore = create<NumberStore>((set) => ({
    number: 0,
    getRandomNumber: () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        set({ number: randomNumber });
    },
}));

export default useNumberStore;
