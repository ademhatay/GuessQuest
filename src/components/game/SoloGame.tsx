import useNumberStore from "@/store/useNumberStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";

const SoloGame = () => {
  const { number, getRandomNumber } = useNumberStore();
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomNumber = async () => {
      setLoading(true); // Yeni oyun başladığında loading durumunu true yap
      await getRandomNumber();
      setLoading(false); // Rastgele sayı alındığında loading durumunu false yap
    };

    fetchRandomNumber();
  }, [getRandomNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      setMessage("Please enter a valid number.");
      return;
    }
    if (guessNumber === number) {
      setMessage("Congratulations! You guessed the correct number!");
    } else if (guessNumber < number) {
      setMessage("Your guess is too low. Try again!");
    } else {
      setMessage("Your guess is too high. Try again!");
    }
    setGuess("");
  };

  console.log(number);

  return (
    <>
      <Card className="w-full h-96">
        <CardHeader className="text-center border-b-[1px]">
          <CardTitle>You</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center mt-5">
          <div className="text-3xl">
            {loading ? "Loading..." : "Your Guess Here"}
          </div>
          <table className="table-auto">
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
        <div className="text-xl mt-4">{message}</div>
      </Card>
      <div className="flex gap-x-3 justify-evenly items-center w-full">
        <input
          value={guess}
          onChange={handleInputChange}
          type="text"
          className="border border-gray-300 text-black p-2 rounded flex-1"
          disabled={loading} // Sayı yüklenirken input'u devre dışı bırak
        />
        <button
          onClick={handleGuess}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Sayı yüklenirken butonu devre dışı bırak
        >
          <SendHorizonal size={24} />
        </button>
      </div>
    </>
  );
};

export default SoloGame;
