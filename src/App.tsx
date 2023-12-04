import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Instruction from './components/Instruction';
import PreviousCourses from './components/PreviousCourses';
import SelectCourses from './components/SelectCourses';
import EnterStudentID from './components/EnterStudentID';
import React, { useState } from "react";
import './App.css';

function App() {

  const [studentId, setStudentId] = useState("");

  return (
    <Router>
      <Menu />
    </Router>
  );
}

function Menu() {
  const location = useLocation();

  const PageName = () => {
    const path = location.pathname.toLowerCase();
    let pageName = '';

    switch (path) {
      case '/instructions':
        pageName = 'Instructions';
        break;
      case '/previouscourses':
        pageName = 'CourseMan => Update Courses';
        break;
      case '/selectcourses':
        pageName = 'CourseMan => Search/Register';
        break;
      case '/EnterStudentID':
        pageName = 'CourseMan => Search/Register';
        break;
      default:
        pageName = 'CourseMan';
    }

    console.log(`Resolved Page Name: ${pageName}`);
    return pageName;
  };

  return (
    <>
      <h2 className='pageName'>{PageName()}</h2>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/instructions/*" element={<Instruction />} />
          <Route path="/EnterStudentID/*" element={<EnterStudentID/>} />
          <Route path="/previouscourses/*" element={<PreviousCourses />} />
          <Route path="/selectcourses/*" element={<SelectCourses />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
