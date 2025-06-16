import React, { useCallback, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error: string
}
const InputField = ({
  placeholder,
  isPassword = false,
  value,
  error,
  onChangeText,
}: InputFieldProps) => {
  const [isVisible, setIsVisisble] = useState(false);

  const onPressIcon = useCallback(() => {
    setIsVisisble(!isVisible);
  }, [isVisible]);
  return (
    <View style={{ width: "100%",}}>
      <View style={[styles.containerStyle, { borderColor: error ? "red" : "#aaa" }]}>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          secureTextEntry={isPassword && !isVisible}
          value={value}
          onChangeText={onChangeText}
        />
        {isPassword && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPressIcon}>
            <Icon 
              name={isVisible ? 'visibility' : 'visibility-off'} 
              size={24} 
              color="#aaa"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth:1,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10
  },
  inputStyle: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400"
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  error:{
    color:"red",
    top:4,
    fontSize:12
  }
});

export default InputField;