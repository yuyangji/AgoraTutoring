import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';


const HeaderMenu = ({ onLogout }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
      <Entypo name="dots-three-vertical" size={23} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    dots: {
      fontSize: 30,
        color: 'white',
      
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    menu: {
      position: 'absolute',
      right: 5,
      top: 10,
      backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        width: 100,
      
    },
    menuItem: {
  
      color: 'black',
    },
  });
  
  export default HeaderMenu;