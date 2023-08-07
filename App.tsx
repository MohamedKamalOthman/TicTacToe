/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [winIndex, setWinIndex] = useState([] as number[]);
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinIndex(pattern);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Tie');
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleCellPress = (index: number) => {
    if (winner || board[index]) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const renderCell = (index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.cell,
        winIndex.includes(index) && {backgroundColor: '#FFD700'},
      ]}
      onPress={() => handleCellPress(index)}>
      {board[index] === 'X' && (
        <Image
          style={styles.cellImage}
          source={require('./assets/images/X.png')}
        />
      )}
      {board[index] === 'O' && (
        <Image
          style={styles.cellImage}
          source={require('./assets/images/O.png')}
        />
      )}
    </TouchableOpacity>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    setWinIndex([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Tic-Tac-Toe</Text>
        {winner ? (
          <View>
            <Text style={styles.result}>
              {winner === 'Tie' ? "It's a Tie!" : `Player ${winner} wins!`}
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.turnText}>Player {currentPlayer}'s turn</Text>
        )}
        <View style={styles.board}>
          {board.map((cell, index) => renderCell(index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06283D',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DFF6FF',
  },
  turnText: {
    fontSize: 18,
    color: '#DFF6FF',
    marginBottom: 10,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DFF6FF',
  },
  resetButton: {
    backgroundColor: '#256D85',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignContent: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DFF6FF',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 20,
    maxWidth: 310,
    maxHeight: 300,
  },
  cell: {
    borderColor: '#DFF6FF',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#47B5FF',
  },
  cellText: {
    color: '#DFF6FF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cellImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default App;
