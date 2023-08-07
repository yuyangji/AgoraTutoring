import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const AnnouncementCard = ({ name, date, message }) => {

    const {colors} = useTheme()

    return (
        <View style={styles.Container}>
            <View style = {styles.Header}>
   
                <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
                <Text style={{...styles.Name, color:colors.text}}>
           
           {name}
       </Text>
            </View>


            <Text style = {styles.Message}>
                {message}
            </Text>

            <Text style = {styles.Date}>
                {date}
            </Text>

        </View>
    )
}

export default AnnouncementCard

const styles = StyleSheet.create({
    
    Container: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        rowGap: 15
    },
    Header: {
        flexDirection: 'row',
        gap: 5,
        alignItems:'center'
    },
    Name: {
        fontSize: 14,
        fontWeight: '500',
        
    },
    Message: {
        fontSize: 14
    },
    Date: { 
        fontSize: 11,
        position: 'absolute',
        right: 15,
        top: 15
    }
})