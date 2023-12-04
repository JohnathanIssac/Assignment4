import React, { useState } from "react";
import axios from "axios";
import "../App.css";

export let studentId: string = ""; 

const EnterStudentID = () => {
  const [studentID, setstudentID] = useState("");
  const [password, setPassword] = useState("");

  const handleSaveID = async () => {
    studentId = studentID;
    try {

      console.log("ddd");
      const response = await axios.post('http://127.0.0.1:3001/login', {
        studentID: studentID,
        password: password
      });


      if (response.data.message === "Login Successful") {
        console.log("Login successful");
        alert("Login Successful!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login Access Denied.");
    }
  };

  return (
    <div className="BackBoard">
      <h2 className="IDEntry">Login Form</h2>
      <div className="col-md-12 d-flex flex-row" style={{ marginLeft: '5%', marginTop: '3%' }}>
        <div className="col-2 justify-content-center"><label htmlFor="Id">ID: </label></div>
        <div className="col-9"><input type="text" id="Id" placeholder="ID" value={studentID} onChange={(e)=> setstudentID(e.target.value)} /></div>
      </div>
      <div className="col-md-12 d-flex flex-row" style={{ marginLeft: '5%', marginTop: '3%' }}>
        <div className="col-2 justify-content-center"><label htmlFor="Id">Password: </label></div>
        <div className="col-9"><input type="password" id="Id" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
      </div>
      <div className="BTNcenter">
        <button id="IDSet" className="btn m-2 btn-pr" onClick={handleSaveID}>
          Login
        </button>
      </div>
    </div>
  );
};

export default EnterStudentID;
