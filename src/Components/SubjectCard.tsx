
import { View, StyleSheet, TouchableOpacity, Text} from "react-native"
import { MyTheme, globalStaticStyles } from "../useGlobalStyles"
import { ConvertDate } from "../Utils";

export type SubjectCardProps = {
    title: string;
    tutors: string[];
    programId: string;
    start: Date;
    end: Date;
}

const SubjectCard = ({ data, onPress }: { data: SubjectCardProps, onPress: () => void }) => {
    
    return (
        <TouchableOpacity style={{...globalStaticStyles.boxShadow, borderRadius: 5}} onPress = {onPress}>
            <View style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                    <View style={{ flexDirection: 'column', gap: 4 }}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.tutorsText}>{data.tutors[0]}</Text>
                    </View>

                    <Text style={styles.nextLessonText}>Next lesson: {ConvertDate(data.start)}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.topRightText}>
                        23 students
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SubjectCard

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: MyTheme.colors.textPrimary
    },
    topRightText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: MyTheme.colors.textPrimary
    },
    nextLessonText: {
        color: MyTheme.colors.secondary
    },
    tutorsText: {
        fontWeight: '300',
        color: MyTheme.colors.textPrimary
    },

    leftContainer: {
        flex: 1,
        gap: 10
    },
    rightContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',

    },
})

