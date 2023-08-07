import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { MyTheme } from "../useGlobalStyles";

interface SegmentedControlProps {
  options: string[];
  selected: string;
    setSelected: (selected: string) => void;
    showBorder?: boolean;
  styleProps?: {
    containerBackgroundColor?: string;
    selectedOptionBackgroundColor?: string;
    textColor?: string;
    selectedTextColor?: string;
  };
  buttonStyle?: StyleProp<ViewStyle>;
}

const SegmentedControl = ({
  options,
  selected,
    setSelected,
  showBorder = false,
  styleProps = {},
  buttonStyle = {},
}: SegmentedControlProps) => {
  return (
    <View
      style={[
        styles.SegmentedButtonContainer,
              { backgroundColor: styleProps.containerBackgroundColor || "white" },
              showBorder &&  styles.ContainerBorder
         // Default to 'white' if not provided
             
      ]}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selected === option && {
              backgroundColor:
                styleProps.selectedOptionBackgroundColor ||
                MyTheme.colors.primary, // Default to MyTheme.colors.primary if not provided
              },
              buttonStyle && buttonStyle
          ]}
          onPress={() => setSelected(option)}
        >
          <Text
            style={[
              styles.optionText,
              { color: styleProps.textColor || "gray" }, // Default to 'gray' if not provided
              selected === option && {
                color: styleProps.selectedTextColor || "white", // Default to 'white' if not provided
              },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default SegmentedControl;

const styles = StyleSheet.create({
  SegmentedButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    padding: 3,

    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white", //container background color
    },
    ContainerBorder: {
        borderWidth: 0.5,
        borderColor: "gray",
 },

  option: {
    paddingHorizontal: 30,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  selectedOption: {
    backgroundColor: MyTheme.colors.primary, //highlighted background color
  },
  optionText: {
    color: "gray", //text color
  },
  selectedOptionText: {
    color: "white", //selected text color
  },
});
