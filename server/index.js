const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const app = express();
const port = 4000;
app.use(express.json());



const JobPost=require('../server/models/JobPost')
const Post=require('../server/models/AddPost')
const Company=require('../server/models/Company')


// Connect to MongoDB
const dbURI = "mongodb://localhost/codeConnect";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type:String,
  unique:true},
  password: String,
  phone:String,
  bio:String,
  image: {
    data: Buffer,
    contentType: String
  },
  

});
const User = mongoose.model('User', userSchema);




const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
    },
    message: String,
    receiver:{
      type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
    },
    
  },
  { timestamps: true }
);
const Chat = mongoose.model('Chat', chatSchema);
app.use(express.json());






const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    data: Buffer,
    contentType: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});


const CommunityChatSchema = new mongoose.Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
  message: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model('Community', communitySchema);
const communityChat = mongoose.model('communityChat', CommunityChatSchema);


const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, "secret-key");
    const userId = payload.userId;
    console.log("token is ", userId);

    // Find the user by ID
    const user = await User.findById(userId);
    console.log("token is ", user);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Convert image data to base64 string
    const base64Image = user.image.data.toString("base64");

    // Create a modified user object with the encoded image
    const modifiedUser = {
      ...user._doc,
      image: {
        data: base64Image,
        contentType: user.image.contentType,
      },
    };

    req.user = modifiedUser;
    next();
  } catch (error) {
    console.log("errrrrr");
    res.status(401).json({ error: "Unauthorized" });
  }
};

const authenticateComapany = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, "secret-key");
    const companyId = payload.companyId;
    console.log("token is ", companyId);

    // Find the user by ID
    const company = await Company.findById(companyId);
    console.log("token is ", company);

    if (!company) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Convert image data to base64 string
    const base64Image = company.image.data.toString("base64");

    // Create a modified user object with the encoded image
    const modifiedCompany = {
      ...company._doc,
      image: {
        data: base64Image,
        contentType: company.image.contentType,
      },
    };
    req.company = modifiedCompany;
    next();
  } catch (error) {
    console.log("errrrrr");
    res.status(401).json({ error: "Unauthorized" });
  }
};




app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
let connectedUsers=0;

io.on('connection', (socket) => {
  connectedUsers++;
  console.log('New client connected');
  console.log('Total connected users:', connectedUsers);

  // Broadcast the updated user count to all connected clients
  io.emit('userCount', connectedUsers);

  // Handle incoming chat messages
  socket.on('chat', async (chat) => {
    console.log('Received chat message: including receiver', chat);

    try {
      // Save the message to the database
      const newChat = new Chat({
      
        message: chat.message,
        receiver:chat.receiver,
        sender:chat.sender,
       
      });
      await newChat.save();
      console.log('Chat message saved: including receiver', newChat);

      // Broadcast the chat message to all connected clients
      io.emit('chat', chat);
    } catch (error) {
      console.log('Error saving chat message:', error);
    }
  });
  

  
  socket.on('communityChat', async (data) => {
    const { community, communityChatMessage } = data;
    console.log('Received community chat message', communityChat);
  
    try {
      // Save the chat message to the database
      const newChat = new communityChat({
        community: community,
        user: communityChatMessage.user,
        message: communityChatMessage.message,
        image: communityChatMessage.image,
      });
      await newChat.save();
      console.log('Chat message saved:', newChat);
  
      // Emit the chat message to the community room
      io.to(community).emit('communityChat', {
        community: community,
        chat: newChat,
      });
    } catch (error) {
      console.error('Error saving community chat:', error);
    }
  });
  
 


  // Handle disconnection
  socket.on('disconnect', () => {
    connectedUsers--;
    console.log('Client disconnected');
    console.log('Total connected users:', connectedUsers);

    // Broadcast the updated user count to all connected clients
    io.emit('userCount', connectedUsers);
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email }).maxTimeMS(30000);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "secret-key");

    // Set the token in the response header
    
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


app.get('/api/communities', async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/communityChats/:communityId', async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const communityChats = await communityChat.find({ community: communityId });
    const populatedChats = await Promise.all(
      communityChats.map(async (chat) => {
        const populatedChat = { ...chat.toObject() };
        const user = await User.findById(chat.user);
        populatedChat.user = user;
        return populatedChat;
      })
    );
    res.json(populatedChats);
  } catch (error) {
    console.error('Error fetching community chats:', error);
    res.status(500).json({ error: 'Failed to fetch community chats' });
  }
});
app.post('/api/communityChats/:communityId', upload.single('image'), async (req, res) => {
  try {
    const { communityId } = req.params;
    const { user, message } = req.body;
    const image = req.file;

    // Create a chat object
    const chat = new communityChat({
      community: communityId,
      user,
      message,
      image: {
        data: image ? Buffer : null,
       contentType: image ?  String : null,
      },
    });
  
    // Save the chat message to the database
    await chat.save();

    // Emit the chat message to the community room
    io.to(communityId).emit('communityChat', chat);

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error saving community chat:', error);
    res.status(500).json({ error: 'Server error' });
  }
});













// Assuming you have a route for fetching chats
app.get('/chats', async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  try {
    const chats = await Chat.find({ sender: senderId, receiver: receiverId })
      .populate('sender', '_id')
      .populate('receiver', '_id')
      .exec();

    if (chats.length === 0) {
      res.json({ message: 'No chat found' });
    } else {
      res.json(chats);
    }
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Error fetching chat messages' });
  }
});


app.post('/chats', authenticate,async (req, res) => {
  try {
    const {  message,receiver } = req.body;

    // Save the message to the database
    const newChat = new Chat({
      message,
      receiver,
    });
    await newChat.save();
    console.log('Chat message saved:', newChat,"the reciver",newChat.receiver);

    // Broadcast the chat message to all connected clients
    io.emit('chat', newChat);

    res.status(200).json({ success: true, chat: newChat,message:reciever });
  } catch (error) {
    console.log('Error saving chat message:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Handle user registration
app.post('/signup', upload.single('image'), async (req, res) => {
    const { name, email, password, bio, phone } = req.body;
    const { originalname, mimetype, buffer } = req.file;
  
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email }).maxTimeMS(30000);
      if (existingUser) {
        return res.status(400).send('Email already registered.');
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        image: {
          data: buffer,
          contentType: mimetype
        },
        bio,
        phone
      });
  
      await newUser.save();
    
      const token = jwt.sign({ userId: newUser._id }, "secret-key");
      res.setHeader("Authorization", token);
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user.');
    }

    try {

      const transporter = nodemailer.createTransport({
       
          to: email,
          subject: "Sending Email With React And Nodejs",
          html: `
          <h1>Welcome to codeConnect!</h1>
          <p>
            Congratulations on joining codeConnect! We are excited to have you as a member of our developer community.
          </p>
          <p>
            codeConnect is a platform for developers to connect, collaborate, and share their knowledge and projects with other like-minded individuals. Whether you are an experienced developer or just starting your journey, you'll find a supportive community here to help you grow and learn.
          </p>
          <p>
            We hope you have a great time exploring the platform and connecting with fellow developers. If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
          <p>
            Happy coding!
          </p>
          <p>
            The codeConnect Team
          </p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log("Error" + error)
          } else {
              console.log("Email sent:" + info.response);
              res.status(201).json({status:201,info})
          }
      })

  } catch (error) {
      console.log("Error" + error);
      res.status(401).json({status:401,error})
  }

  });
  


  app.post('/company-signup', upload.single('image'), async (req, res) => {
    const { companyName, email, password, Industry, phone } = req.body;
    const { originalname, mimetype, buffer } = req.file;
  
    try {
      // Check if the email is already registered
      const existingCompany = await Company.findOne({ email }).maxTimeMS(30000);
      if (existingCompany) {
        return res.status(400).send('Email already registered.');
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newCompany = new Company({
        companyName,
        email,
        password: hashedPassword,
        image: {
          data: buffer,
          contentType: mimetype
        },
        Industry,
        phone
      });
  
      await newCompany.save();
    
      const token = jwt.sign({ companyId: newCompany._id }, "secret-key");
      res.setHeader("Authorization", token);
      res.status(200).json({ message: "Company registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering Company.');
    }


});


app.post("/company-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const company = await Company.findOne({ email }).maxTimeMS(30000);
    console.log(company);
    if (!company) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the password

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ companyId: company._id }, "secret-key");

    // Set the token in the response header
    
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
});



app.get("/company-profile", authenticateComapany, async (req, res) => {
  res.status(200).json(req.company);
});



app.get("/profile", authenticate, async (req, res) => {
  res.status(200).json(req.user);
});

app.get("/current-user", authenticate, async (req, res) => {
  res.status(200).json(req.user);
});





app.put("/edit-profile", authenticate, upload.single("image"), async (req, res) => {
  const { email, password, name,bio,phone } = req.body;
  const { user } = req;

  try {
    // Create an object to store the updated fields
    const updatedFields = {};
   

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    // Update user fields if provided
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = hashedPassword;
    if (name) updatedFields.name = name;
    if (bio) updatedFields.bio = bio;
    if (phone) updatedFields.phone = phone;

    // Update user image if provided
    if (req.file) {
      updatedFields["image.data"] = req.file.buffer;
      updatedFields["image.contentType"] = req.file.mimetype;
    }

    // Update the user using findOneAndUpdate
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, updatedFields, {
      new: true, // Return the updated user as the result
    });

    // Convert image data to base64 string
    const base64Image = updatedUser.image.data.toString("base64");

    // Create a modified user object with the encoded image
    const modifiedUser = {
      ...updatedUser._doc,
      image: {
        data: base64Image,
        contentType: updatedUser.image.contentType,
      },
    };

    res.status(200).json(modifiedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/current-user/posts', authenticate ,async (req, res) => {
  try {
    // Get the user ID of the authenticated user (assuming you have implemented authentication and stored the user ID in the request)
    const userId = req.user._id;

    // Query the database to find posts with the user ID
    const posts = await Post.find({ user: userId }).exec();

    // Return the posts as a response
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 


app.delete('/current-user/posts/:id', authenticate ,async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and delete it
    await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.post('/community', upload.single('icon'), authenticate ,async (req, res) => {
  try {
    const { name, description } = req.body;
    const icon = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const newCommunity = await Community.create({
      name,
      description,
      icon,
      owner: req.user._id, // Assuming you have user authentication middleware
    });

    res.status(201).json(newCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create community' });
  }
});




app.post('/posts', authenticate, upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  const currentUser = req.user;

  try {
    const newPost = new Post({
      user: currentUser._id,
      userIcon:{
        data:currentUser.image.data,
        contentType:currentUser.image.contentType
      },
      userName: currentUser.name,
      caption,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newPost.save();

    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
});



// View all posts
app.get('/posts', authenticate, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving posts' });
  }
});

// Like a post
app.post('/posts/:postId/like', authenticate, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error liking post' });
  }
});

// Comment on a post
app.post('/posts/:postId/comments', authenticate, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      user: userId,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding comment' });
  }
});


// Fetch user details based on userIds
app.post('/users', authenticate, async (req, res) => {
  const userIds = req.body.userIds;

  try {
    const users = await User.find({ _id: { $in: userIds } }, 'name image',);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user details' });
  }
});


// GET /api/search
app.get('/api/search', async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({ name: { $regex: name, $options: 'i' } }).limit(5); // Limit the results to a specific number, e.g., 5
    const suggestions = users.map((user) => user.name);
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:name
app.get('/api/users/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name });
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/search
app.post('/api/search', async (req, res) => {
  try {
    const { name } = req.body;
    const users = await User.find({ name: { $regex: name, $options: 'i' } });

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/add-job-post', authenticateComapany,upload.single('image'), async (req, res) => {
  const { title,description,salary,qualifications,location,skills } = req.body;
  const currentCompany = req.company;

  try {
    const newJobPost = new JobPost({
      company: currentCompany._id,
      CompanyImage:{
        data:currentCompany.image.data,
        contentType:currentCompany.image.contentType
      },
      companyName: currentCompany.companyName,
      title,
      description,
      salary,
      qualifications,
      location,
      skills, 
    });

    await newJobPost.save();

    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    console.log("current company"+currentCompany)
    res.status(500).json({ error: 'Error creating post' ,currentCompany});
  }
});

app.get('/job-posts', authenticateComapany,async (req, res) => {
  try {
    const jobPosts = await JobPost.find().sort({ createdAt: -1 }).populate( 'companyName');
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving posts' });
  }
});

app.get('/all-jobs',async (req, res) => {
  try {
    const jobs = await JobPost.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/selected-job', authenticate, async (req, res) => {
  const { jobId } = req.body;
  const applicantId = req.user._id; // Assuming the authenticated user's ID is in the req.user object
  const applicantName = req.user.name; // Assuming the authenticated user's name is in the req.user object


   console.log({jobId});
  try {
    // Find the job post by its ID
    const job = await JobPost.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

   
    const hasApplied = job.applicantId.some(
      (applicant) => applicant.developerId.toString() === applicantId.toString()
    );

    if (hasApplied) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }
   
    const newApplication = {
      developerId: applicantId,
      developerName: applicantName,
    };

    job.applicantId.push(newApplication);
    await job.save();

    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while applying' });
  }
});



const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});