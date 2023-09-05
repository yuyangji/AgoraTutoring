import {
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { View } from "react-native";
import { MyTheme } from "../../Styles/useGlobalStyles";

export const Icons = {
  cross: <Entypo name="squared-cross" size={23} color="#ED4E4E" />,
  check: <Ionicons name="ios-checkbox" size={23} color="#03B70A" />,
  check_white: <Ionicons name="ios-checkbox" size={23} color="white" />,
  plus: (color: string) => <AntDesign name="pluscircle" size={24} color={color} />,
  back: <Entypo name="cross" size={24} color="white" />,
  cross_lg: (color: string) => <Entypo name="squared-cross" size={30} color={color} />,
  check_lg: (color: string) => <Ionicons name="ios-checkbox" size={30} color={color} />,
};

export const SquareIcon = {
  upload: (color: string) => (
    <View style={{ backgroundColor: color, borderRadius: 6, padding: 5 }}>
      <FontAwesome name="upload" size={20} color="white" />
    </View>
  ),
  download: (color: string) => (
    <View style={{ backgroundColor: color, borderRadius: 6, padding: 5 }}>
      <MaterialCommunityIcons name="download-box" size={20} color="white" />
    </View>
  ),
  check: (color: string) => <Ionicons name="ios-checkbox" size={23} color={color} />,
};
