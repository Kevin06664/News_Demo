import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient'

type RootStackParamList = {
  HomeScreen: undefined;
  GameScreen: { gridSize: number };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameScreen'>;

type Cell = {
  isBomb: boolean;
  isRevealed: boolean;
  isSafe: boolean;
};

const { width } = Dimensions.get('window');

const GameScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<GameScreenRouteProp>()
  const { gridSize } = route.params

  const [grid, setGrid] = useState<Cell[][]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newGrid: Cell[][] = []
    const totalCells = gridSize * gridSize
    const bombCount = Math.floor(totalCells * 0.1) 

    for (let i = 0; i < gridSize; i++) {
      newGrid[i] = []
      for (let j = 0; j < gridSize; j++) {
        newGrid[i][j] = {
          isBomb: false,
          isRevealed: false,
          isSafe: true
        }
      }
    }

    let bombsPlaced = 0
    while (bombsPlaced < bombCount) {
      const row = Math.floor(Math.random() * gridSize)
      const col = Math.floor(Math.random() * gridSize)
      if (!newGrid[row][col].isBomb) {
        newGrid[row][col].isBomb = true
        newGrid[row][col].isSafe = false
        bombsPlaced++
      }
    }

    setGrid(newGrid)
    setScore(0)
    setGameOver(false)
  }

  const handleCellPress = (row: number, col: number) => {
    if (gameOver || grid[row][col].isRevealed) return

    const newGrid = [...grid]
    newGrid[row][col].isRevealed = true

    if (newGrid[row][col].isBomb) {
      setGameOver(true)
      setTimeout(() => {
        showGameOverDialog()
      }, 1000);
    } else {
      setScore(prev => prev + 1)
    }

    setGrid(newGrid)
  }

  const showGameOverDialog = () => {
    Alert.alert(
      "Game Over!",
      `Your final score: ${score}`,
      [
        {
          text: "Restart",
          onPress: initializeGame
        },
        {
          text: "Exit",
          onPress: () => navigation.navigate('HomeScreen')
        }
      ]
    )
  }

  const renderCell = (row: number, col: number) => {
    const cell = grid[row][col]
    const cellSize = (width - wp('10%')) / gridSize

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.cell,
          {
            width: cellSize,
            height: cellSize,
            backgroundColor: cell.isRevealed 
              ? (cell.isBomb ? '#ff6b6b' : '#51cf66')
              : '#4c669f',
            transform: [{ scale: cell.isRevealed ? 0.95 : 1 }]
          }
        ]}
        onPress={() => handleCellPress(row, col)}
      >
        {cell.isRevealed && (
          cell.isBomb ? (
            <Icon name="bomb" size={cellSize * 0.6} color="#fff" />
          ) : (
            <Icon name="check" size={cellSize * 0.6} color="#fff" />
          )
        )}
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <Icon name="star" size={24} color="#ffd700" style={styles.scoreIcon} />
          <Text style={styles.score}>Score: {score}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.restartButton]} 
            onPress={initializeGame}
          >
            <Icon name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.exitButton]} 
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Icon name="sign-out" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </LinearGradient>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  scoreIcon: {
    marginRight: wp('2%'),
  },
  score: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    borderRadius: wp('2%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
  exitButton: {
    backgroundColor: '#f44336',
  },
  buttonIcon: {
    marginRight: wp('2%'),
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  grid: {
    flex: 1,
    padding: wp('5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: wp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}) 