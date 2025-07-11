const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const Quiz = require('./quizModel');
const Notes = require('./notesModel');
const Lecture = require('./lectureModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const UserData = require('./userDataModel');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const Package = require('./packagesDataModel');

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
);
const JWT_SECRET = process.env.JWT_SECRET || 'password';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;



mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user1:user1@learnify.wka9ugr.mongodb.net/Learnify?retryWrites=true&w=majority&appName=Learnify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Add database connection event listeners
mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB successfully');
});

mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Disconnected from MongoDB');
});

app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/quiz/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    try {
        const quiz = await Quiz.findOne({ id: quizId });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/notes/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await Notes.findOne({ id: noteId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Lecture endpoints
app.get('/api/lectures', async (req, res) => {
    try {
        const lectures = await Lecture.find();
        res.json(lectures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/lecture/:lectureId', async (req, res) => {
    const lectureId = req.params.lectureId;
    try {
        const lecture = await Lecture.findOne({ id: lectureId });
        if (!lecture) {
            return res.status(404).json({ error: 'Lecture not found' });
        }
        res.json(lecture);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



app.post('/api/signup', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, age, password, captcha } = req.body;

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`);
        if (!response.data.success) {
            return res.status(400).json({ error: 'Captcha validation failed' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, age, password: hashedPassword });
        const userData = new UserData({
            email,
            name,
            purchases: { notes: [], quizzes: [], lectures: [], lives:[] }, // Corrected object syntax
            progress: { notes: [], quizzes: [], lectures: [], lives:[] } // Corrected object syntax
        });
        await user.save();
        await userData.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
  
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }
  
      req.user = decoded;  // The decoded token will have email or id depending on your JWT payload
      next();
    });
  };
  
  app.get('/user', authenticateJWT, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.userId });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const userData = await UserData.findOne({email:req.user.email});
      res.json({ userData });
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  








app.post('/api/login', async (req, res) => {
    const { email, password, captcha } = req.body;

    try {
        // Validate the captcha
        const captchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: captcha
            }
        });

        if (!captchaResponse.data.success) {
            return res.status(400).json({ success: false, message: 'Captcha validation failed' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Fetch additional user data if needed
        const userData = await UserData.findOne({ email });

        // Generate JWT token
        const token = jwt.sign({email:user.email ,userId:user._id}, JWT_SECRET, { expiresIn: '1h' });
        // Set JWT token in cookies
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 60*60*1000,
        });

        // Respond with user data
        res.json({ success: true, token:token ,userData });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});







app.get('/api/packages', async (req, res) => {
    try {
      const packages = await Package.find();
      res.json(packages);
    } catch (error) {
      res.status(500).send(error);
    }
  });





  app.get('/api/packages/:packageId', async (req, res) => {
    const packageId = req.params.packageId;
    try {
        const package = await Package.findOne({ id: packageId });
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});







const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_tBCKVt4YuwuDxc',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '4SknPkeSFinXksv51v2P1J7W'
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount,
        currency: 'INR',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        
        res.status(500).send(error);
    }
});

app.post('/api/verify-payment', async (req, res) => {
    const { paymentId, orderId, signature, email ,quizIds, notesIds, lectureIds } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '4SknPkeSFinXksv51v2P1J7W');
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        try {
            // Update user data in MongoDB
            const userId = 'current-user-id'; // Replace with actual user ID from your context/session
            const user = await UserData.findOne({email});

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Add purchased items to the user's purchases
            user.purchases.notes.push(...notesIds);
            user.purchases.quizzes.push(...quizIds);
            user.purchases.lectures.push(...lectureIds);

            await user.save();

            res.json({ success: true, updatedUserData: user });
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Learnify API Server',
        version: '1.0.0',
        status: 'Active'
    });
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Health check available at: /health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});