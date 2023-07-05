import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatInCommunity = ({ communityId }) => {
  const [community, setCommunity] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCommunity();
    fetchChats();
  }, []);

  const fetchCommunity = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/community/${communityId}`);
      setCommunity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/community/${communityId}/chats`);
      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createChat = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('message', message);
      if (image) {
        formData.append('image', image);
      }

      await axios.post(`http://localhost:4000/community/${communityId}/chat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });

      // Clear the input fields
      setMessage('');
      setImage(null);

      // Refresh the chat list
      fetchChats();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  if (!community) {
    return <div>Loading community details...</div>;
  }

  return (
    <div>
      <h2>{community.name}</h2>
      <p>{community.description}</p>
      <div>
        {chats.map((chat) => (
          <div key={chat._id}>
            <p>{chat.message}</p>
            {chat.image && <img src={`data:${chat.image.contentType};base64,${chat.image.data}`} alt="Chat Image" />}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={createChat}>Send</button>
      </div>
    </div>
  );
};

export default ChatInCommunity;
