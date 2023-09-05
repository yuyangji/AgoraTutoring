import { View, StyleSheet, StyleProp,ViewStyle  } from "react-native"

interface SafeScreenProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }

export const SafeScreen = ({style, children }:SafeScreenProps) => {

    return (
        <View style = {[styles.screen, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        padding: 15,
        backgroundColor: 'white',
        flex: 1,
    },
})