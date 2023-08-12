import {FC, useState} from 'react'
import { View, StyleSheet, Text,FlatList,Image } from "react-native"
import SearchField from "../../Components/SearchBar"

import { Ionicons } from '@expo/vector-icons';
import { MyTheme, globalStaticStyles } from '../../useGlobalStyles';
const chatData = [
    {
      id: '1',
      name: 'Chat 1',
      pictureUrl: 'https://picsum.photos/id/237/200/300',
      latestMessage: 'Hello, this is the latest message from Chat 1',
      hasUnseenMessage: true,
    },
    {
      id: '2',
      name: 'Chat 2',
      pictureUrl: 'https://picsum.photos/id/238/200/300',
      latestMessage: 'Hello, this is the latest message from Chat 2',
      hasUnseenMessage: false,
    },
    {
      id: '3',
      name: 'Chat 3',
      pictureUrl: 'https://picsum.photos/id/239/200/300',
      latestMessage: 'Hello, this is the latest message from Chat 3',
      hasUnseenMessage: true,
    },
    // Add more chats as needed...
  ];
  
const defaultChatDP = <Ionicons name="person-circle-sharp" size={24} color="black" />
interface Chat {
    id: string;
    name: string;
    pictureUrl: string;
    latestMessage: string;
    hasUnseenMessage: boolean;
  }
const ChatItem : FC<Chat> = (props:Chat) => {


    return (
        <View style={styles.chatItem}>
        <Image source={{ uri: props.pictureUrl }} style={styles.chatImage} />
        <View style={styles.chatTexts}>
          <Text style={styles.chatName}>{props.name}</Text>
          <Text style={styles.chatMessage}>{props.latestMessage}</Text>
        </View>
        {props.hasUnseenMessage && <View style={styles.unseenIndicator} />}
      </View>
    )
}

const GroupChat = () => {
    const [chats, setChats] = useState<Chat[]>(chatData);
    const globalStyles = globalStaticStyles
    return (
        <View style = {{...globalStyles.screen, ...styles.screen}}>
            <SearchField />
            <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator} ></View>}
      data={chats}
      renderItem={({ item }) => (
          <ChatItem {...item} />
      )}
      keyExtractor={(item) => item.id}
    />
        </View>
    )
}

export default GroupChat


const styles = StyleSheet.create({
    screen: {
        gap: 20
    },
    chatItem: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
      },
      chatImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      chatTexts: {
        flex: 1,
      },
      chatName: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      chatMessage: {
        color: 'gray',
      },
      unseenIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
          backgroundColor: MyTheme.colors.secondary,
        alignSelf:'flex-start'
    },
    separator: {
        height: 1,
        backgroundColor: '#DCDCDC',
        marginVertical: 3,
      },
})

