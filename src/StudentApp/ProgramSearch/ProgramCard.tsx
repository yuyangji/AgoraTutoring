import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MyTheme } from "../../useGlobalStyles";
import { Program, ProgramLocal } from "../../Types/ModelTypes";
import { Ionicons } from "@expo/vector-icons";
import { ConvertDate } from "../../Utils";

export interface CourseCardProps extends Omit<ProgramLocal, "admin"> {
  onPressEnrol: (programId: string) => void;
  isEnrolled: boolean;
}

// const EnrolButton = ({ onPress }: { onPress: () => void }) => {

//   return (
//     <TouchableOpacity
//     style={styles.enrolButton}
//               onPress={() => props.onPressEnrol}
//     disabled = {props.isEnrolled}
//   >
//     <Text style={styles.buttonText}>{props.isEnrolled ? "Enrolled":"Enrol"}</Text>
//   </TouchableOpacity>
//   )
// }

const CourseCard = ({ props }: { props: CourseCardProps }) => {
  return (
    <View
      style={{
        ...styles.shadow,
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.tutorsText}>{props.tutors[0]}</Text>
          </View>

          {props.subtitle && (
            <Text style={styles.guaranteeText}>{props.subtitle}</Text>
          )}
          <View style={styles.productsList}>
            {props.products.map((item, index) => (
              <View style={styles.itemContainer} key={index}>
                <Ionicons
                  name="ellipse"
                  size={6}
                  color={MyTheme.colors.primary}
                  style={{ paddingTop: 5 }}
                />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: "row", gap: 15, marginVertical: 10 }}>
            <Text style={styles.timeText}>
              Starts {ConvertDate(props.start)}
            </Text>
            <Text style={styles.timeText}>Ends {ConvertDate(props.end)}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.price}>
            ${props.price} <Text>/{props.rate}</Text>
          </Text>
          <TouchableOpacity
            style={styles.enrolButton}
            onPress={() => props.onPressEnrol(props.programId)}
            disabled={props.isEnrolled}
          >
            <Text
              style={[
                styles.buttonText,
                props.isEnrolled && { backgroundColor: MyTheme.colors.success },
              ]}
            >
              {props.isEnrolled ? "Enrolled" : "Enrol"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  itemText: {
    fontWeight: "400",
    fontSize: 11,
    color: MyTheme.colors.textPrimary,
  },
  shadow: {
    borderRadius: 5,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guaranteeText: {
    color: "#0E6FD1",
    fontWeight: "500",
    fontSize: 12,
  },
  tutorsText: {
    fontWeight: "300",
    color: MyTheme.colors.textPrimary,
  },
  productsList: {
    gap: 2,
  },

  timeText: {
    color: MyTheme.colors.secondary,
    fontSize: 11,
  },
  leftContainer: {
    flex: 1,
    gap: 10,
  },
  rightContainer: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: MyTheme.colors.textPrimary,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: MyTheme.colors.textPrimary,
  },
  enrolButton: {
    backgroundColor: "#0A2342",
    paddingVertical: 7,
    paddingHorizontal: 5,
    position: "absolute",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
});

export default CourseCard;
