import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import './Chat.css';

const socket = io('http://localhost:4000', {
  withCredentials: true,
});

const Chat = () => {
  const location = useLocation();
  const senderId = location.state.senderId;
  const recieverId = location.state.recieverId;
  const [recieverDetails, setRecieverDetails] = useState({});

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const receiver = recieverId;
  const sender = senderId;
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Fetch initial chat messages
    fetchChatMessages();
    fetchRecieverDetails();

    // Set the connection status to true when connected
    socket.on('connect', () => {
      setIsConnected(true);
      setConnectionError(false);
    });

    // Set the connection status to false and show error when disconnected or failed to connect
    socket.on('disconnect', () => {
      setIsConnected(false);
      setConnectionError(true);
    });

    // Listen for incoming chat messages
    socket.on('chat', (chat) => {
      setMessages((prevMessages) => [...prevMessages, chat]);
      scrollChatMessagesToBottom();
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  useEffect(() => {
    scrollChatMessagesToBottom();
  }, [messages]);

  const fetchRecieverDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${receiver}`, {
        withCredentials: true,
      });
      setRecieverDetails(response.data);
    } catch (error) {
      console.log('Error fetching sender details:', error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/chats', {
        params: {
          senderId: sender,
          receiverId: receiver,
        },
        withCredentials: true,
      });
      const responseData = response.data || []; // Handle null or undefined response data
      setMessages(responseData);
    } catch (error) {
      console.log('Error fetching chat messages:', error);
      setMessages([]); // Set messages to an empty array in case of an error
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const chat = {
        sender: senderId,
        message: input,
        receiver: recieverId,
      };

      // Emit the chat message to the server
      socket.emit('chat', chat);

      // Clear the input field
      setInput('');

      // Check if the message already exists in the state
      const messageExists = messages.some((msg) => msg._id === chat._id);
      if (!messageExists) {
        // Update the UI with the sent message
        setMessages((prevMessages) => [...prevMessages, chat]);
        scrollChatMessagesToBottom();
      }
    }
  };

  const scrollChatMessagesToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  return (
    <Container className="chat-container" fluid  >
      <div className="profile-part">
        {recieverDetails && recieverDetails.image && recieverDetails.image.data && recieverDetails.image.contentType && (
          <img
            src={`data:${recieverDetails.image.contentType};base64,${btoa(
              new Uint8Array(recieverDetails.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}`}
            alt=""
            className="img-circle"
          />
        )}
        <h4>{recieverDetails.name}</h4>
      </div>
      <p>sender{sender}</p>
      <p>reciver{receiver}</p>

      <Row className="chat-status">
        <Col>{isConnected ? <div>User connected</div> : <div>User disconnected</div>}</Col>
        {connectionError && <Col>Error: Failed to establish WebSocket connection</Col>}
      </Row>
      <div className="chat-messages" ref={chatMessagesRef}>
        {Array.isArray(messages) ? (
          messages.length === 0 ? (
            <div>No messages available</div>
          ) : (
            messages.map((chat) => (
              <div
                className={`chat-message ${chat.sender === senderId ? 'sender' : 'receiver'}`}
                key={chat._id}
              >
                <br />
                <span
                  className={`message-content ${
                    chat.sender === senderId ? 'sender-message' : 'receiver-message'
                  }`}
                >
                  {chat.message}
                </span>
                <span className="message-name">{chat.sender._id === senderId ? 'You' : recieverDetails.name}</span>
              </div>
            ))
          )
        ) : (
          <div>Invalid messages data</div>
        )}
      </div>

      <Row className="chat-input-container">
        <Col xs={9}>
          <Input
          placeholder='type Here ...'
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
          />
        </Col>
        <Col  >
          <div className="send-button" onClick={handleSendMessage}>
            
            <i class="bi bi-send-fill"  ></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
