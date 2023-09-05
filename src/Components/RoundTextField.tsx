import React, {useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MyTheme } from '../Styles/useGlobalStyles';


const RoundTextField = ({ isPassword = false, icon, placeholder, onChangeText, inputMode = null, style = null }) => {
    const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
    
    return (
        <View style={ style ? [styles.container, style,isFocused && styles.focusedContainer] :[ styles.container,style,isFocused && styles.focusedContainer]}>
            {icon}
            <TextInput
                style={styles.input}
                secureTextEntry={isPassword}
                placeholder={placeholder}
                onChangeText={onChangeText}
                inputMode = {inputMode ? inputMode : 'text'}
                
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 25,
        padding: 10,
        gap: 10,
        borderWidth: 0.5
    },
    focusedContainer: {
        borderColor: MyTheme.colors.primary,
        borderWidth: 1.5
      },

    input: {
        flex: 1,
    },
});

export default RoundTextField;
