import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Row, Col } from 'reactstrap';
import axios from 'axios';
import '../Styles/CurrentUserPosts.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);

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
    setSelectedComments(comments);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedComments([]);
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
                <div className="post-details">
                  <p>{post.caption}</p>
                  <p>Likes: {post.likes.length}</p>
                  <p>Comments: {post.comments.length}</p>
                  <button onClick={() => deletePost(post._id)}>Delete</button>
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
          <div>
            <p>Comments:</p>
            {selectedComments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PostList;
