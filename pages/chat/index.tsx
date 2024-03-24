// import { useForm } from "antd/es/form/Form"
import { Form } from "antd"
import { AllChat } from "components/chat/all-chat"
import RoomChat from "components/chat/room-chat"
import MainLayout from "components/layouts/main-layout"
import { useState } from "react"
import { ChatData, ChatDataI, DataI } from "utils/chat-data"

import firebaseApp from 'firebase-config'

import firebase from "firebase"

const UserChatRoom = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "task" | boolean>(false)
  const [activeRoom, setActiveRoom] = useState<ChatDataI | null>(null)

  const [typedChat, setTypedChat] = useState<string>("")
  const [allChat, setAllChat] = useState<DataI | []>([])

  const [form] = Form.useForm();

  const handleSubmitChat = async (value: any) => {
    const db = firebaseApp.firestore()

    const messagesCollection = db.collection('messages');

    const receiverTextCollectionRef = db.collection('messages').doc('2')
    .collection('receiver').doc('3')
    .collection('text');

    db.collection('messages').doc('2').collection('receiver').get().then((querySnapshot:any) => {
      console.log(querySnapshot.docs.map((doc:any) => doc.data()), 'asdasdadsadadas')

      querySnapshot.forEach((doc:any) => {
        // Access each receiver document
        const receiverData = doc.data();
        console.log("Receiver Data:", receiverData);
      });
      // querySnapshot.forEach((doc) => {
      //     // Access each document and retrieve the text field
      //     const text = doc.data();
      //     console.log("Text:", text);
      // });
  })


    // receiverTextCollectionRef.add({
    //   text: 'kontol ahhh',
    //   createdAt:new Date()
    // })
    // .then((docRef) => {
    //     console.log("Message added with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding message: ", error);
    // });

    // receiverTextCollectionRef.get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // Access each document and retrieve the text field
    //         const text = doc.data();
    //         console.log("Text:", text);
    //     });
    // })
    // .catch((error) => {
    //     console.error("Error getting text messages: ", error);
    // });



    //gajelas

  //   db.collectionGroup('receiver')
  // .get()
  // .then((querySnapshot) => {
  //   console.log(querySnapshot, 'asdas')
  //   querySnapshot.forEach((doc) => {
  //     // Access each message document
  //     const messageData = doc.data();
  //     console.log("Message Data:", doc);
  //   });
  // })
  // .catch((error) => {
  //   console.error("Error getting messages: ", error);
  // });

  // messagesCollection.where(`receiver.3.recevierId`, '==', '3')
  // .get()
  // .then((querySnapshot) => {
  //   console.log(querySnapshot.docs.map(doc => doc.data()), 'asdasdadsadadas')
  //   querySnapshot.forEach((doc) => {
  //     // Access each sender document
  //     const senderId = doc.id;
  //     console.log("Sender ID:", senderId);
  //   });
  // })
  // .catch((error) => {
  //   console.error("Error getting senders: ", error);
  // });


  //   messagesCollection.onSnapshot(snapshot => {
  //     // setMessages()
  //     console.log(snapshot.docs.map(doc => doc.data()))
  // })

  // const querySnapshot = await db.collection('messages')
  //     .where('receiver', 'array-contains', { receiverId: '2' })
  //     .get().then((querySnapshot) => {
  //       console.log('askjdhakjdhakjsdhakjh', querySnapshot.docs.map((doc) => doc.data()))
        
  //       // querySnapshot.forEach((doc) => {
  //       //   // Access the document data here
  //       //   console.log(doc.id, ' => ', doc.data());
  //       // });
  //     })
  //     .catch((error) => {
  //       console.error('Error getting documents: ', error);
  //     });

  
    // messagesCollection.where(`receiverId.${receiverId}`, '==', true).get().then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     const messageData = doc.data();
    //     console.log('Message:', messageData);
    //   });
    // })
    // .catch(error => {
    //   console.error('Error retrieving messages:', error);
    // });


    // await db.collection('messages').add({
    //   senderId: '1',
    //   receiver:[
    //     {
    //       receiverId: '2',
    //       messages: [
    //         {
    //           text:'anjing',
    //           createdAt: new Date()
    //         }
    //       ]
    //     }
    //   ]
    // })

    // {
    //     senderId: '1',
    //     receiver:[
    //       {
    //         receiverId: '2',
    //         messages: [
    //           {
    //             text:'anjing',
    //             createdAt: new Date()
    //           }
    //         ]
    //       }
    //     ]
    //   }
  }


  const retrieveAllTrasaction = () => {

  }

  
  return (
    <MainLayout>
      <div className="flex">
        <div className="border-gray flex-1 border-r-[1px]">
          <AllChat allChat={ChatData} setActiveRoom={setActiveRoom} />
        </div>
        <div className="flex-[2]">
          <RoomChat activeRoom={ChatData[0]} handleSubmitText={handleSubmitChat} typedChat={typedChat} form={form}/>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserChatRoom
