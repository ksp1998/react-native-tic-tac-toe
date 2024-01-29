import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import TTTGame from './tictactoe/TTTGame';
import {TictacToeProvider} from './tictactoe';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <TictacToeProvider>
        <TTTGame />
      </TictacToeProvider>
    </SafeAreaView>
  );
};

export default App;
