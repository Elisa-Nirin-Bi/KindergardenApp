import { useEffect } from 'react';
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3500');

function ChatWidget() {
  useEffect(() => {
    addResponseMessage('Hi');
  }, []);
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message: ${newMessage}`);
    addResponseMessage('response...');
  };
  return (
    <div>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}

export default ChatWidget;
