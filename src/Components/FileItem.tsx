import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FileDb } from "../Types/File";
import { MyTheme } from "../Styles/useGlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Icons, SquareIcon } from "./Icons/Icons";
import { useMemo } from "react";
const pdfIcon = <AntDesign name="pdffile1" size={24} color={MyTheme.colors.emergency} />;
const trashIcon = (
  <Ionicons name="trash-sharp" size={24} color={MyTheme.colors.emergency} />
);

type Variant = "Removable" | "Downloadable";

const FileItem = ({
  file,
  variant = "Downloadable",
  onPress = null,
}: {
  file: FileDb;
  variant?: Variant;
  onPress?: () => void;
  }) => {
  
  const icon = useMemo(
    () =>
      variant === "Removable" ? trashIcon : SquareIcon.download(MyTheme.colors.secondary),
    [variant]
  );

  return (
    <View style={styles.container}>
      {pdfIcon}
      <TouchableOpacity onPress={onPress} disabled={onPress != null}>
        {icon}
      </TouchableOpacity>
      <Text>{file.name}</Text>
    </View>
  );
};

export default FileItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: MyTheme.colors.primary,
    elevation: 5,
    flexDirection: "row",
  },
  text: {},
});
