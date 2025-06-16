import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface buttonProps {
  text: string,
  buttononPress: () => void,
  loading: boolean
}
const Button = ({ text, buttononPress, loading }: buttonProps) => {
  return (
    <TouchableOpacity style={styles.buttonView} onPress={buttononPress} disabled={loading}>
      {loading ? (<ActivityIndicator size={'small'} color={'#FFF'} />) : (<Text style={styles.buttonText}>{text}</Text>)}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonView: {
    width: "100%",
    backgroundColor: "blue",
    borderRadius: 10,
    justifyContent: "center",
    padding: 14
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
})