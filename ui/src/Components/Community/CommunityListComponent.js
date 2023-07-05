import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityListComponent.css';
import { Row, Col, ListGroup, ListGroupItem, Media, Form, FormGroup, Input, Button } from 'reactstrap';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/communities');
        setCommunities(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunities();
  }, []);

/*  const handleJoinCommunity = async (communityId) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post(
        `http://localhost:4000/api/community/${communityId}/join`,
        { communityId },
        {
          headers: {
            Authorization: token, // Send the JWT token for authentication
          },
        }
      );
      console.log(response.data);

      // Optionally, update the communities state to reflect the joined community
    } catch (error) {
      console.error(error);
      console.log(error.message);
    }
  };
*/
  const handleChatSubmit = async (communityId, message, image) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('message', message);
      formData.append('image', image);

      await axios.post(
        `http://localhost:4000/api/community/${communityId}/chat`,
        formData,
        {
          headers: {
            Authorization: token, // Send the JWT token for authentication
            'Content-Type': 'multipart/form-data', // Specify the content type for the form data
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const selectCommunity = (community) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="community-container">
      <Row>
        <Col md="4">
          <h2>Community List</h2>
          <ListGroup>
            {communities.map((community) => (
              <ListGroupItem
                key={community._id}
                onClick={() => selectCommunity(community)}
                active={selectedCommunity && selectedCommunity._id === community._id}
              >
                <Media>
                  {community.icon && community.icon.contentType && (
                    <Media left>
                      <Media
                        object
                        src={`data:${community.icon.contentType};base64,${btoa(
                          new Uint8Array(community.icon.data.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                          )
                        )}`}
                        alt="Community Icon"
                        className="community-icon"
                      />
                    </Media>
                  )}
                  <Media body>
                    <Media heading>{community.name}</Media>
                  </Media>
                </Media>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md="8">
          <div className="message-container">
            {selectedCommunity && (
              <div>
                <ChatList community={selectedCommunity} chats={selectedCommunity.chat} />
                <ChatForm community={selectedCommunity} onSubmit={handleChatSubmit} />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ChatForm = ({ community, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(community._id, message, image);
    setMessage('');
    setImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Form className="chat-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
        />
      </FormGroup>
      <FormGroup>
        <Input type="file" onChange={handleImageChange} />
      </FormGroup>
      <Button type="submit">Send</Button>
    </Form>
  );
};

const ChatList = ({ community, chats }) => {
  return (
    <div className="chat-messages">
      {chats.map((chat) => (
        <div key={chat._id} className="chat-message">
          <p>Message: {chat.message}</p>
          {chat.image && <img src={`data:${chat.image.contentType};base64,${chat.image.data}`} alt="" />}
          <p>User: {chat.user}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityList;
