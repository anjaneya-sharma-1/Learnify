const mongoose = require('mongoose');
const Lecture = require('./lectureModel');

mongoose.connect('mongodb+srv://user1:user1@learnify.wka9ugr.mongodb.net/Learnify?retryWrites=true&w=majority&appName=Learnify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const sampleLectures = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming language including variables, functions, and basic syntax.",
        youtubeVideoId: "PkZNo7MFNFg", // JavaScript Crash Course
        duration: "45:30",
        packageIds: [1],
        level: "Beginner",
        tags: ["JavaScript", "Programming", "Web Development"]
    },
    {
        id: 2,
        title: "React Fundamentals",
        description: "Understanding React components, props, state, and event handling in modern web development.",
        youtubeVideoId: "w7ejDZ8SWv8", // React Crash Course
        duration: "1:48:00",
        packageIds: [1, 2],
        level: "Intermediate",
        tags: ["React", "Frontend", "Components"]
    },
    {
        id: 3,
        title: "Node.js and Express Server",
        description: "Building backend applications with Node.js and Express framework including routing and middleware.",
        youtubeVideoId: "L72fhGm1tfE", // Node.js Express Tutorial
        duration: "1:12:15",
        packageIds: [2],
        level: "Intermediate",
        tags: ["Node.js", "Express", "Backend"]
    },
    {
        id: 4,
        title: "MongoDB Database Basics",
        description: "Introduction to NoSQL databases using MongoDB, including CRUD operations and data modeling.",
        youtubeVideoId: "ExcRbA7fy_A", // MongoDB Tutorial
        duration: "55:20",
        packageIds: [1, 2],
        level: "Beginner",
        tags: ["MongoDB", "Database", "NoSQL"]
    },
    {
        id: 5,
        title: "Advanced JavaScript Concepts",
        description: "Deep dive into closures, promises, async/await, and modern JavaScript features.",
        youtubeVideoId: "Mus_vwhTCq0", // Advanced JavaScript
        duration: "1:25:45",
        packageIds: [2],
        level: "Advanced",
        tags: ["JavaScript", "Advanced", "Async Programming"]
    },
    {
        id: 6,
        title: "CSS Grid and Flexbox",
        description: "Master modern CSS layout techniques with Grid and Flexbox for responsive design.",
        youtubeVideoId: "jV8B24rSN5o", // CSS Grid & Flexbox
        duration: "38:12",
        packageIds: [1],
        level: "Intermediate",
        tags: ["CSS", "Layout", "Responsive Design"]
    }
];

async function insertLectures() {
    try {
        // Clear existing lectures
        await Lecture.deleteMany({});
        console.log('Cleared existing lectures');

        // Insert new lectures
        const result = await Lecture.insertMany(sampleLectures);
        console.log(`Successfully inserted ${result.length} lectures:`);
        
        result.forEach(lecture => {
            console.log(`- ${lecture.title} (ID: ${lecture.id})`);
        });

        console.log('\nLecture data insertion completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error inserting lectures:', error);
        process.exit(1);
    }
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    insertLectures();
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
