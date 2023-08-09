import { StyleSheet } from "react-native";
import { useTheme, DefaultTheme } from '@react-navigation/native'
import { useMemo } from 'react'

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#134784',
    primaryLight: '#0C3567',
    textPrimary: '#0C437A',
    backgroundDark: '#0A2342',
    surfaceDark: '#0C3260',
    secondary: '#F99849',
    emergency: '#ED4E4E',
    success:'#29B136'
  },

}
export const globalStaticStyles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'FDFDFD',
    flex: 1
  },
  boxShadow: {
    shadowColor: "#000",
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  Heading: {
    fontSize: 21,
    fontWeight: '500',
    color: MyTheme.colors.textPrimary
  },
  SubHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: MyTheme.colors.textPrimary
  },
  text_md: {
    fontSize: 15,
    color: MyTheme.colors.textPrimary
  }

})

const getGlobalStyles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: props.colors.backgroundColor,
  },
  Heading: {
    fontSize: 21,
    fontWeight: '500',
    color: "#012639"
  },
  SubHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: "#0C437A"
  },
  screen: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    flex: 1
  },

});

function useGlobalStyles() {
  const { colors } = useTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => getGlobalStyles({ colors }), [colors]);

  return styles;
}



export default useGlobalStyles;