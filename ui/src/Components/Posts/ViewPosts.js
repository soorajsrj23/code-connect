import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Input, Button } from 'reactstrap';
import '../Posts/ViewPosts.css'
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
      return <CardImg top src={imageUrl} alt="" />;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <div>
    <h1>All Posts</h1>
    {posts.map((post) => (
      <Card key={post._id} className="mb-4 dark" >
        <CardBody>
          <CardTitle tag="h2">{post.caption}</CardTitle>
          <CardText>{post.userEmail}</CardText>
          {post.image && displayImage(post.image)}
          <Button color="primary" onClick={() => likePost(post._id)}>Like</Button>
          <div className="mt-3">
            <Input type="textarea" value={commentText} onChange={handleCommentChange} />
            <Button color="primary" onClick={() => addComment(post._id)}>Add Comment</Button>
          </div>
          <div className="mt-3">
            <p>Likes: {post.likes.length}</p>
            <p>Comments:</p>
            {post.comments.map((comment) => (
              <div key={comment._id} className="d-flex align-items-center">
               {userDetails[comment.user] && userDetails[comment.user].image && (
  <img
    src={`data:${userDetails[comment.user].image.contentType};base64,${Buffer.from(userDetails[comment.user].image.data.data).toString('base64')}`}
    alt=""
    className="rounded-circle mr-2"
    width={30}
    height={30}
  />
)}

                {userDetails[comment.user] && (
                  <p className="mb-0">
                    {userDetails[comment.user].name || 'Unknown User'}: {comment.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    ))}
  </div>
  );
};

export default ViewPosts;
