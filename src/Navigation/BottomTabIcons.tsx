import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const IconHome = (props: { color: string; size: number }) => (
  <Ionicons name="home" size={props.size} color={props.color} />
);
export const IconCalendar = (props: { color: string; size: number }) => (
  <Ionicons name="md-calendar-sharp" size={props.size} color={props.color} />
); //For attendance screen
export const IconNotifications = () => <Ionicons name="ios-notifications" size={27} color="white" />
export const IconProfile = (
  <Ionicons name="person-circle-sharp" size={30} color="white" />
); //For profile screen
export const IconSettings = null; //for settings screen
export const IconChat = (props: { color: string; size: number }) => (
  <Ionicons name="chatbubble-ellipses" size={props.size} color={props.color} />
);
export const IconAssessments = (props: { color: string; size: number }) => (
  <Ionicons name="md-newspaper" size={props.size} color={props.color} />
);

export const IconEnrol = (props: { color: string; size: number }) => (
  <FontAwesome name="graduation-cap" size={props.size} color={props.color} />
);

export const IconMenu = (props: { color: string; size: number }) => (<Ionicons name="menu-sharp" size={props.size } color={props.color}/>)
