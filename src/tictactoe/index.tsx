import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

const TicTacToeContext = createContext<{[key: string]: any}>({});

// All possible winning sequences
const winningSequences: number[][] = [
  [0, 1, 2], // 1st row
  [3, 4, 5], // 2nd row
  [6, 7, 8], // 3rd row
  [0, 3, 6], // 1st column
  [1, 4, 7], // 2nd column
  [2, 5, 8], // 3rd column
  [0, 4, 8], // 1st diagonal ( \ )
  [2, 4, 6], // 2nd diagonal ( / )
];

export const TictacToeProvider = ({children}: PropsWithChildren) => {
  const [whoseTurn, setWhoseTurn] = useState<string>('O');
  const [winner, setWinner] = useState<string>('');
  // All grid cells are empty initially
  // '' represents empty cells
  const [gridValues, setGridValues] = useState(Array(9).fill(''));

  const handleClick = (pos: number) => {
    if (!winner && gridValues[pos] === '') {
      // filling cell by either 'O' or 'X'
      gridValues[pos] = whoseTurn;
      setGridValues(gridValues);

      // checking if player is won or not or draw
      if (isWon()) {
        setWinner(whoseTurn);
        return;
      }

      if (isDraw()) {
        setWinner('draw');
        return;
      }

      setWhoseTurn(prev => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const reset = () => {
    setGridValues(Array(9).fill(''));
    setWhoseTurn('O');
    setWinner('');
  };

  const isDraw = () => {
    for (let i = 0; i < 9; i++) {
      if (gridValues[i] === '') {
        return false;
      }
    }
    return true;
  };

  const isWon = () => {
    for (const sequence of winningSequences) {
      const set = [false, false, false];
      for (let i = 0; i < sequence.length; i++) {
        set[i] = gridValues[sequence[i]] === whoseTurn;
      }

      if (set[0] && set[1] && set[2]) {
        return true;
      }
    }
    return false;
  };

  return (
    <TicTacToeContext.Provider
      value={{
        whoseTurn,
        winner,
        gridValues,
        reset,
        handleClick,
        isDraw,
        isWon,
      }}>
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = () => useContext(TicTacToeContext);
