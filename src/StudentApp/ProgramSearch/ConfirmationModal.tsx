import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MyTheme } from "../../useGlobalStyles";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  loading,
  onConfirmEnrol,
}) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
              </>
            ) : (
              <>
                <Text style={[styles.modalText, styles.boldText]}>
                  Do you want to enroll in this program?
                </Text>
                <TouchableOpacity
                  onPress={onConfirmEnrol}
                  style={[styles.buttons, styles.confirmButton]}
                >
                  <Text style={styles.modalText}>Enrol now</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={[styles.buttons, styles.closeButton]}
                >
                  <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity> */}
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalView: {
    width: "80%", // You can set the width and height as you like
    backgroundColor: MyTheme.colors.primary,
    borderRadius: 5,
    padding: 35,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent background
  },
  boldText: {
      fontWeight: "500",
      fontSize:16
  },
  modalText: {
    textAlign: "center",
    color: "white",
  },
  buttons: {
    borderRadius: 2,
    padding: 5,
    elevation: 2,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: MyTheme.colors.secondary,
  },
  closeButton: {
    backgroundColor: MyTheme.colors.emergency,
  },
});
