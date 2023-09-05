import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { MyTheme } from "./useGlobalStyles";

type TextVariants = "light" | "dark";

interface StyledTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: TextVariants;

}

interface HighlightedHeadingProps extends StyledTextProps {
  renderRight?: React.ReactNode;
  containerStyle?: any;
}

const StyledText = ({ children, style, variant = "dark" }) => {
  const textColor = variant === "dark" ? MyTheme.colors.textPrimary : "white";

  return (
    <Text style={{ ...styles.baseText, ...style, color: textColor }}>{children}</Text>
  );
};

export const HighlightedHeading = (props: HighlightedHeadingProps) => {
  return (
    <View style={[{ backgroundColor: MyTheme.colors.primary_300, padding: 10 , flexDirection: 'row', alignItems: 'center',}, props.containerStyle && props.containerStyle]}>
      <Text {...props} style={[{ fontSize: 14, color: "white", fontWeight: '400' }, props.style && props.style]}>
        {props.children}
      </Text>
      <View style = {{flex: 1, alignItems: 'flex-end'  }}>
      {props.renderRight}
      </View>

    </View>
  );
};

export const H1 = (props: StyledTextProps) => <StyledText {...props} style={{...styles.h1}} />;
export const H2 = (props: StyledTextProps) => <StyledText {...props} style={styles.h2} />;
export const H3 = (props: StyledTextProps) => <StyledText {...props} style={styles.h3} />;

export const HeaderText = (props: StyledTextProps) => (
  <StyledText {...props} style={styles.headerText} />
);
export const BodyText = (props: StyledTextProps) => (
  <StyledText {...props} style={styles.bodyText} />
);
export const CaptionText = (props: StyledTextProps) => (
  <StyledText {...props} style={styles.captionText} />
);

export const SubHeading = (props: StyledTextProps) => (
  <StyledText {...props} style={styles.subHeading} />
);

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Avenir",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "500",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },

  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  bodyText: {
    fontSize: 14,
  },
  captionText: {
    fontSize: 12,
  },
});
