import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {useTicTacToe} from '.';

const TTTGame = () => {
  const {whoseTurn, winner, gridValues, reset, handleClick} = useTicTacToe();

  return (
    <>
      {winner ? (
        winner === 'draw' ? (
          <View style={[styles.playerInfo, styles.winnerInfo, styles.drawInfo]}>
            <Text style={styles.winnerTxt}>Game Draw</Text>
          </View>
        ) : (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>Player '{winner}' Won</Text>
          </View>
        )
      ) : (
        <View
          style={[
            styles.playerInfo,
            whoseTurn === 'X' ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>Player {whoseTurn}'s Turn</Text>
        </View>
      )}

      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gridValues}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => handleClick(index)}>
            <Text style={styles.gridCell}>{item}</Text>
          </Pressable>
        )}
      />

      {/* game action */}
      <Pressable style={styles.gameBtn} onPress={reset}>
        <Text style={styles.gameBtnText}>
          {winner ? 'New Game' : 'Restart!'}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    marginVertical: 12,
    marginHorizontal: 36,
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  gridCell: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  drawInfo: {
    backgroundColor: 'gray',
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default TTTGame;
