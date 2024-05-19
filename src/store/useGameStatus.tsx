import { create } from 'zustand';

interface Message {
  text: string;
  color: string;
}

interface GameState {
  gameStatus: 'idle' | 'playing' | 'finished';
  startGame: () => void;
  endGame: () => void;
  guess: string;
  setGuess: (guess: string) => void;
  message: Message;
  setMessage: (message: Message) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  guessList: { guess: string; message: string; color: string }[];
  setGuessList: (guessList: { guess: string; message: string; color: string }[]) => void;
  lives: number;
  setLives: (lives: number) => void;
  countdown: number;
  setCountdown: (countdown: number) => void;
  resetGame: () => void;
}

const useGameState = create<GameState>((set) => ({
  gameStatus: 'idle',
  startGame: () => set({ gameStatus: 'playing' }),
  endGame: () => set({ gameStatus: 'finished' }),
  guess: '',
  setGuess: (guess) => set({ guess }),
  message: { text: '', color: '' },
  setMessage: (message) => set({ message }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  guessList: [],
  setGuessList: (guessList) => set({ guessList }),
  lives: 5,
  setLives: (lives) => set({ lives }),
  countdown: 3,
  setCountdown: (countdown) => set({ countdown }),
  resetGame: () => set({
    gameStatus: 'idle',
    guess: '',
    message: { text: '', color: '' },
    loading: false,
    guessList: [],
    lives: 5,
    countdown: 3,
  }),
}));

export default useGameState;
