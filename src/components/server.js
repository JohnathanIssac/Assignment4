// Import necessary modules
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import crypto from "crypto-js"

// Create Express app
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "uOne",
  password: "mjTheGreat11@",
  database: "coursemantester",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("mjTheGreat11@", "utf-8"),
  },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Save student ID endpoint
app.post("/saveStudentID", (req, res) => {
  const { studentID } = req.body;
  const sql = "INSERT INTO students (student_id) VALUES (?)";

  db.query(sql, [studentID], (err, result) => {
    if (err) {
      console.error("Error saving student ID:", err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    } else {
      console.log("Student ID saved successfully");
      res.status(200).send("Student ID saved successfully");
    }
  });
});
app.get("/getAllCourseIDs", (req, res) => {
  if (req.method === "GET") {
    console.log("Received GET request for /getAllCourseIDs");
    
    const sql = "SELECT course_id FROM courses";
    
    db.query(sql, (err, result) => {
      if (!err) {
        const courses = result.map((course) => ({ course_id: course.course_id }));
        console.log("Sending courses:", courses);
        res.json(courses);
      } else {
        console.error("Error fetching course names:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
});
// Get all course data endpoint
app.get("/getAllCourses", (req, res) => {
  const sql = "SELECT * FROM courses";
  
  db.query(sql, (err, result) => {
    if (!err) {
      console.log("Sending courses:", result);
      res.json(result);
    } else {
      console.error("Error fetching courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.post('/updateTranscript', (req, res) => {
  const { studentID, selectedCourses } = req.body;


  // Update the transcript table in the database
  const sql = 'INSERT INTO transcript (student_id, course_name) VALUES ?';
  const values = selectedCourses.map(courseName => [studentID, courseName]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error updating transcript:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      console.log('Transcript updated successfully');
      res.status(200).send('Transcript updated successfully');
    }
  });
});

app.post('/login', (req, res) => {
  const {studentID, password} = req.body;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [studentID], (err, result) => {
    if (err) {
      console.error('Error updating transcript:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    if(result.length === 0){
      console.log('Student with ID ${studentID} not found');
      return res.status(404).send("Student not found");
    }
    const student = result[0];
    const hashCheck = crypto.SHA256(student.first_name + student.last_name + password).toString();
    console.log(`${hashCheck}`);
    
    if(hashCheck === student.password){
      console.log("success");
      res.json({message: "Login Successful", studentID});
    }else{
      console.log("failed");
      res.status(404).send('Invalid password');
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
