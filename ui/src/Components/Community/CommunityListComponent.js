import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Row, Col, ListGroup, ListGroupItem, Form, Button } from 'reactstrap';
import './CommunityListComponent.css';

const CommunityListComponent = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState('');
  const chatMessagesRef = useRef(null);
  const downArrowRef = useRef(null);
  const [currentUser,setCurrentUser]=useState('');


  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/current-user', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/communities');
        setCommunities(response.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('communityChat', (chatMessage) => {
        setSelectedCommunity((prevCommunity) => {
          if (prevCommunity && prevCommunity._id === chatMessage.community) {
            const updatedChat = [chatMessage, ...prevCommunity.chat];
            scrollToLatestMessage();
            return {
              ...prevCommunity,
              chat: updatedChat,
            };
          }
          return prevCommunity;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    const fetchCommunityChats = async () => {
      if (selectedCommunity) {
        try {
          const response = await axios.get(`http://localhost:4000/api/communityChats/${selectedCommunity._id}`);
          setSelectedCommunity((prevCommunity) => ({
            ...prevCommunity,
            chat: response.data,
          }));
        } catch (error) {
          console.error('Error fetching community chats:', error);
        }
      }
    };

    fetchCommunityChats();
  }, [selectedCommunity]);

  const handleCommunityChatSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    const image = e.target.elements.image.files[0];
    const user = currentUser._id; // Replace with the actual user name or ID

    if (socket && selectedCommunity) {
      const chatData = {
        user: user,
        message: message,
        image: image
          ? {
              contentType: image.type,
              data: image,
            }
          : null,
      };

      socket.emit('communityChat', {
        community: selectedCommunity._id,
        communityChatMessage: chatData,
      });

      e.target.reset();
      scrollToLatestMessage();
    }
  };

  const selectCommunity = (community) => {
    setSelectedCommunity(null); // Clear the chat messages before selecting a new community

    if (socket) {
      socket.emit('joinCommunity', community._id);

      setSelectedCommunity({
        ...community,
        chat: [],
      });
    }
  };

  const scrollToLatestMessage = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const scrollToLatestMessageWithArrow = () => {
    scrollToLatestMessage();
    downArrowRef.current.style.display = '';
  };

  const zoomImage = (imageSrc) => {
    setIsImageZoomed(true);
    setZoomedImageSrc(imageSrc);
  };

  const closeZoomedImage = () => {
    setIsImageZoomed(false);
    setZoomedImageSrc('');
  };

  return (
    <div className="container-fluid bg-dark text-white py-4">
      <Row>
        <Col md={4} className="communityList">
          <h2>Communities</h2>
          <ListGroup>
            {communities.map((community) => (
              <ListGroupItem 
                key={community._id}
                onClick={() => selectCommunity(community)}
                active={selectedCommunity && selectedCommunity._id === community._id}
                className={`community-item ${selectedCommunity && selectedCommunity._id === community._id ? 'active' : 'normal'}`}
              >
                <div className="community-icon">
                <img
          
          src={`data:${community.icon.contentType};base64,${btoa(
            new Uint8Array(community.icon.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )}`}/>
                </div>
                <div className="community-info">
                  <h5 className="community-name">{community.name}</h5>
                  <p className="community-description">{community.description}</p>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          {selectedCommunity ? (
            <div className="chat-section">
              <div className="chat-header">
              
                <img
          src={`data:${selectedCommunity.icon.contentType};base64,${btoa(
            new Uint8Array(selectedCommunity.icon.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )}`}
          alt=""
          className="community-icon"
        />
          <h2 className="chat-title">{selectedCommunity.name}</h2>
              </div>
              <div className="chat-messages" ref={chatMessagesRef}>
                {selectedCommunity.chat.map((chat) => (
                 <div key={chat._id} className={`message-item ${chat.user._id === currentUser._id ? 'sender' : 'receiver'}`}>
                    {chat.image && (
                      <div>
                        <img
                          src={`data:${chat.image.contentType};base64,${chat.image.data}`}
                          alt=""
                          className="message-image"
                          onClick={() => zoomImage(`data:${chat.image.contentType};base64,${chat.image.data}`)}
                        />
                   
                      </div>
                    )}

                    {!chat.image && <div className="no-image-placeholder"></div>}
                    <div className="ml-3">
                    {chat.user && (
            <div>
            </div>
          )}
                     <h6 className={`message-user ${chat.user === currentUser._id ? 'sender' : 'receiver'}`}>
                        {chat.user.name || 'Unknown User'}
                      </h6>
                      <p className={`message-text ${chat.user._id === currentUser._id ? 'sender' : 'receiver'}`}>
                        {chat.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Form onSubmit={handleCommunityChatSubmit} className="chat-input">
                <input type="text" name="message" placeholder="Message" required className="message-input" />
                <input type="file" name="image" className="d-none" id="imageInput" />
                <label htmlFor="imageInput" className="attachment-icon">
                  <i className="bi bi-paperclip"></i>
                </label>
                <Button type="submit" color="primary" className="send-button">
                  <i className="bi bi-send-fill"></i>
                </Button>
              </Form>
              <div className="scroll-to-latest">
                <button className="down-arrow" onClick={scrollToLatestMessageWithArrow} ref={downArrowRef}>
                <i class="bi bi-arrow-down-circle-fill"></i>
                </button>
              </div>
            </div>
          ) : (
            <h2>No community selected</h2>
          )}
        </Col>
      </Row>
      {isImageZoomed && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={zoomedImageSrc} alt="Zoomed Image" className="zoomed-image" />
            <button className="modal-close" onClick={closeZoomedImage}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityListComponent;
