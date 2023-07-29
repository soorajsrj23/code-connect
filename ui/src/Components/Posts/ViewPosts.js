import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import './ViewPosts.css'
import SmallNavBar from '../Navbar/SmallNavbar'
const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/posts', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setPosts(data);
      fetchUserDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async (data) => {
    try {
      const userIds = data.reduce((acc, post) => {
        const commentUserIds = post.comments.map((comment) => comment.user);
        return [...acc, ...commentUserIds];
      }, []);

      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ userIds }),
      });
      const userDetailsData = await response.json();
      const userDetailsMap = userDetailsData.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUserDetails(userDetailsMap);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data.message);
      // Refresh posts after successful like
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const addComment = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ text: commentText }),
      });
      const data = await response.json();
      console.log(data.message);
      setCommentText('');
      setIsCommentModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const displayImage = (imageData) => {
    try {
      const imageBytes = Array.from(imageData.data.data, (byte) => String.fromCharCode(byte));
      const base64String = btoa(imageBytes.join(''));
      const imageUrl = `data:${imageData.contentType};base64,${base64String}`;
      return <CardImg top src={imageUrl} alt=""  className="custom-card-img"/>;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');

  // Function to open the comment modal
  const openCommentModal = (postId) => {
    setCurrentPostId(postId);
    setIsCommentModalOpen(true);
  };

  // Function to close the comment modal
  const closeCommentModal = () => {
    setCurrentPostId('');
    setCommentText('');
    setIsCommentModalOpen(false);
  };




  return (
    <div className='view-posts-container'>
      <SmallNavBar/>
      {posts.map((post) => (
        <div  className="card_in_less_size">
        <Card key={post._id} className='mb-3' >
          <CardBody className='dark-card'>
            <div className='post-owner-details'>
              {post.userIcon ?  
                <img src={`data:${post.userIcon.contentType};base64,${post.userIcon.data}`} alt="" className='user-avatar' />      
                : <i className="bi bi-person-circle"></i>
              }
              <CardText className='text-white' tag="h2">{post.userName}</CardText>
            </div>
            <CardTitle className='text-white' tag="p">{post.caption}</CardTitle>
            {post.image && displayImage(post.image)}
            <div className='add-like' onClick={() => likePost(post._id)}>
              <i className="bi bi-heart"></i>
            </div>
            <div className="comment-sent">
              <input
                type="text"
                value={commentText}
                className='comment-input'
                onChange={handleCommentChange}
                onClick={() => openCommentModal(post._id)}
              />
              <button type="button" className="btn btn-outline-light btn-lg" onClick={() => addComment(post._id)}>
                <i className="bi bi-send"></i>
              </button>
            </div>
            <div className="mt-3">
              <div className='text-white'>
                <i className="bi bi-heart-fill"></i>
                <p className='text-white' >Likes: {post.likes.length}</p>
              </div>
              <div className='text-white'>
                <i className="bi bi-chat-left-text"></i>
                <p className='text-white'>Comments:</p>
              </div>
              {post.comments.map((comment) => (
                <div key={comment._id} className="d-flex align-items-center mt-2">
                  {userDetails[comment.user] && userDetails[comment.user].image && (
                    <img
                      src={`data:${userDetails[comment.user].image.contentType};base64,${Buffer.from(userDetails[comment.user].image.data.data).toString('base64')}`}
                      alt=""
                      className="rounded-circle mr-2 ml-2"
                      width={40}
                      height={40}
                    />
                  )}

                  {userDetails[comment.user] && (
                    <p className="mb-0 text-white">
                      {userDetails[comment.user].name || 'Unknown User'}: {comment.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
          
        </Card>
        </div>
      ))}

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="comment-modal-overlay">
          <div className="comment-modal">
            <h2>Add Comment</h2>
            <input
              type="text"
              value={commentText}
              className='comment-input'
              onChange={(e)=>setCommentText(e.target.value)}
            />
            <button type="button" onClick={() => addComment(currentPostId)}>Add Comment</button>
            <button type="button" onClick={closeCommentModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPosts;
