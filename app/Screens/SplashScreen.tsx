import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp>()
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.8)).current
    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            })
        ]).start()

        goTOHomeScreen()
    }, [])

    const goTOHomeScreen = () => {
        setTimeout(async () => {
            const user = await AsyncStorage.getItem('user')
            if (user) {
                navigation.replace("HomeScreen")
            } else {
                navigation.replace("LoginScreen")
            }
        }, 3000)
    }

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <Animated.View style={[
                styles.textContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateY: slideAnim }
                    ]
                }
            ]}>
                <Icon name="gamepad" size={80} color="#fff" style={styles.icon} />
                <Text style={styles.title}>Game Hub</Text>
                <Text style={styles.subtitle}>Your Ultimate Gaming Experience</Text>
            </Animated.View>
        </LinearGradient>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        opacity: 0.8,
        textAlign: 'center',
    },
})