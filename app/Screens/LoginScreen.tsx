import { Alert, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import InputField from '../Common/Input'
import Button from '../Common/Button'
import { isEmail, isEmpty } from '../Common/helper'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postRequest } from '../Services/userService'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const [email, setEamil] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEamilError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [loding, setLoding] = useState<boolean>(false)

  const buttononPress = useCallback(async () => {
    try {
      setLoding(true)
      if (isEmpty(email)) {
        setEamilError('Email is required')
        return
      } else if (!isEmail(email)) {
        setEamilError('Invalid Email')
        return
      } else if (isEmpty(password)) {
        setPasswordError('Password is required')
        return
      }
      const payload = { email, password }
      const headers = {
        "App-Track-Version": "v1",
        "App-Device-Type": "iOS",
        "App-Store-Version": "1.1",
        "App-Device-Model": "iPhone 8",
        "App-Os-Version": "iOS 11",
        "App-Store-Build-Number": "1.1",
        "App-Secret": "TESTRAVI@2204#$",
      }
      const result = await postRequest('/service.php?Service=login', payload, headers)
      if (result?.data) {
        await AsyncStorage.setItem('user', JSON.stringify(payload))
        navigation.replace("HomeScreen")
      } else {
        Alert.alert(result?.msg)
        console.log('Login failed:',result);
      }
    } catch (error: any) {
      console.log('Login error:', error.message);
    } finally {
      setLoding(false)
    }
  }, [email, navigation, password])

  const emailOnChange = (v: string) => {
    setEamil(v);
    setEamilError('');
    setPasswordError('')
  }

  const phoneOnChange = (v: string) => {
    setPassword(v);
    setEamilError('');
    setPasswordError('')
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Icon name="gamepad" size={60} color="#fff" style={styles.icon} />
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField 
              placeholder='Email' 
              value={email} 
              onChangeText={(v) => emailOnChange(v)} 
              error={emailError}
            />
            <InputField 
              placeholder='Password' 
              value={password} 
              onChangeText={(v) => phoneOnChange(v)} 
              error={passwordError}
              isPassword={true}
            />
            <Button 
              text={'Log in'} 
              buttononPress={buttononPress} 
              loading={loding}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  icon: {
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('1%'),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap:16
  },
  button: {
    marginTop: hp('2%'),
  },
})