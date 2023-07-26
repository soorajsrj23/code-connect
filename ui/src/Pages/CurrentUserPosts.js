import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Row, Col } from 'reactstrap';
import axios from 'axios';
import '../Styles/CurrentUserPosts.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedLikes, setSelectedLikes] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/current-user/posts', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/current-user/posts/${postId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    const post = posts.find((post) => post.image === image);
    const comments = post ? post.comments : [];

    // Fetch user information for each comment's author
    const fetchCommentAuthors = async () => {
      const updatedComments = [];
      for (const comment of comments) {
        try {
          const response = await axios.get(`http://localhost:4000/user/${comment.user}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          const { name, image } = response.data; // Assuming the user object contains the 'name' and 'profilePicture' fields
          updatedComments.push({ ...comment, authorName: name, image });
        } catch (error) {
          console.error(error);
        }
      }
      setSelectedComments(updatedComments);
    };

    // Fetch user information for each like
    const fetchLikeUsers = async () => {
      const updatedLikes = [];
      for (const like of post.likes) {
        try {
          const response = await axios.get(`http://localhost:4000/user/${like._id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          const { name } = response.data; // Assuming the user object contains the 'name' field
          updatedLikes.push({ ...like, userName: name });
        } catch (error) {
          console.error(error);
        }
      }
      setSelectedLikes(updatedLikes);
      setModalOpen(true);
    };

    fetchCommentAuthors(); // Call the function to fetch user information for comments
    fetchLikeUsers(); // Call the function to fetch user information for likes
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedComments([]);
    setSelectedLikes([]);
    setModalOpen(false);
  };

  return (
    <div className="post-list">
      <h1>My Posts</h1>
      <div className="post-list-scrollable">
        <Row className="post-list-grid">
          {posts.map((post) => (
            <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
              <div className="post-item">
                <div className="post-image" onClick={() => openModal(post.image)}>
                  <img
                    src={`data:${post.image.contentType};base64,${btoa(
                      new Uint8Array(post.image.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    )}`}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>{post.caption}</p>
                <div className="post-details">
                  <i className="bi bi-suit-heart-fill"></i>
                  <p>
                    {post.likes.length }
                  </p>
                  <i className="bi bi-chat-left-text-fill"></i>
                  <p> {post.comments.length}</p>
                  <span className="trash" onClick={() => deletePost(post._id)}>
                    <i className="bi bi-trash-fill"></i>
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Modal isOpen={modalOpen} toggle={closeModal} size="lg">
        <ModalBody>
          {selectedImage && (
            <img
              src={`data:${selectedImage.contentType};base64,${btoa(
                new Uint8Array(selectedImage.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )}`}
              alt=""
              className="img-fluid"
            />
          )}
          <div  className='commentWithNameSection'>
            <p>Comments:</p>
            {selectedComments.map((comment) => (
              <div key={comment._id} className='commentWithName'>
                <div className="profile-pic">
                  {comment.image && (
                     <img
                     src={`data:${comment.image.contentType};base64,${btoa(
                      new Uint8Array(comment.image.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    )}`}
                     alt="Profile"
                     className="comment-owner-image"
                   />

                  )}
                  {console.log(comment.image.contentType)}
                </div>
                <p>{comment.authorName}: {comment.text}</p>
              </div>
            ))}
          </div>
          <div className='likeWithNameSection'>
            <p>Liked by</p>
            {selectedLikes.map((like) => (
              <div  className='likeWithName' key={like._id}>
                <p> {like.userName},</p> {/* Display the username of the user who liked the post */}
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PostList;
