import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  GameScreen: { gridSize: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const [gridSize, setGridSize] = useState('')

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      navigation.replace("LoginScreen")
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const showLogoutConfirmation = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: handleLogout
        }
      ]
    );
  }

  const handleStartGame = () => {
    const size = parseInt(gridSize)
    if (isNaN(size) || size < 5 || size > 12) {
      Alert.alert(
        "Invalid Input",
        "Please enter a number between 5 and 12",
        [{ text: "OK" }]
      )
      return
    }
    navigation.navigate('GameScreen', { gridSize: size })
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="gamepad" size={30} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Minesweeper</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={showLogoutConfirmation}
        >
          <Icon name="sign-out" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Enter grid size (5-12):</Text>
          <TextInput
            style={styles.input}
            value={gridSize}
            onChangeText={setGridSize}
            keyboardType="numeric"
            placeholder="Enter a number"
            placeholderTextColor="#666"
            maxLength={2}
          />
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={handleStartGame}
          >
            <Icon name="play" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: wp('2%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.8)',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
  },
  buttonIcon: {
    marginRight: wp('2%'),
  },
  logoutText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: wp('5%'),
    padding: wp('8%'),
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameIcon: {
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    marginBottom: hp('3%'),
    backgroundColor: '#fff',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
  },
  startButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  }
})