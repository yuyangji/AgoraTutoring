import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyTheme } from '../../useGlobalStyles';
import Ionicons from "@expo/vector-icons/Ionicons";

const IconHome = (props: { color: string; size: number }) => (
    <Ionicons name="home" size={props.size} color = {props.color} />) 
  const IconCalendar =  (props: { color: string; size: number }) => <Ionicons name="md-calendar-sharp" size={props.size} color = {props.color} />//For attendance screen
  const IconNotifications = <Ionicons name="ios-notifications" size={27} color="white" />
  const IconProfile = <Ionicons name="person-circle-sharp" size={30} color="white" /> //For profile screen
  const IconSettings = null //for settings screen
  const IconChat = (props: { color: string; size: number }) => <Ionicons name="chatbubble-ellipses" size={props.size} color = {props.color} />
  const IconAssessments = (props: { color: string; size: number }) => <Ionicons name="md-newspaper" size={props.size} color = {props.color} />
  
export default function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
                      : route.name;
          
        

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? MyTheme.colors.secondary : 'white',
            size: 24, // You can set the size you want
          });
  
          
        return (
            <TouchableOpacity
                style = {styles.buttonStyle}
                key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
        
            >
                {Icon}
                <Text style={{
                    ...styles.label, color: isFocused ? MyTheme.colors.secondary : 'white',
                    fontWeight: isFocused ? '500' :'300'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        backgroundColor: MyTheme.colors.primary, 
        height: 80 ,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 0,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent:'space-evenly'
     
    },
    buttonStyle: {
        alignItems: 'center',
        gap: 3,
        width:65
    },
    label: {
        fontSize: 10,
    },
  });
  