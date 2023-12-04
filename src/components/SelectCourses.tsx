// SelectCourses.tsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { studentId } from "./EnterStudentID";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Course {
  course_id: number;
  course_name: string;
  course_seatsremaining: number;
  course_capacity: number;
}

function SelectCourses() {
  const [showCourses, setShowCourses] = useState(false);
  const [inputName, setInputName] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch course data from the server
    Axios.get("http://127.0.0.1:3001/getAllCourses")
      .then(response => {
        console.log("Received courses from server:", response.data);
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching courses: ", error);
      });
  }, []);

  const handleToggleCourses = () => {
    setShowCourses(!showCourses);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleContentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleCheckboxChange = (courseId: number) => {
    const index = selectedCourses.indexOf(courseId);
    if (index === -1) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      const updatedSelectedCourses = [...selectedCourses];
      updatedSelectedCourses.splice(index, 1);
      setSelectedCourses(updatedSelectedCourses);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchContent.toLowerCase())
  );

  const handleRegisterButtonClick = () => {
    alert(`Successfully Registered. Selected Courses: ${selectedCourses.map(id => `${id}`).join(', ')}`);
  };

  return (
    <div className="BackBoard">
      {studentId.trim() === "" ? (
        <>
          <h2 className="cen">Student ID: -1</h2>
          <h2 className="cen">Enter Student ID First</h2>
        </>
      ) : (
        <>
          <h3 className="SearchTitle">Search Courses</h3>
          <form>
            <div className="col-md-12 d-flex flex-row" style={{ marginLeft: '5%', marginTop: '3%' }}>
              <div className="col-2 justify-content-center"><label htmlFor="Name">Name: </label></div>
              <div className="col-9"><input type="text" id="Name" placeholder="Name" onChange={handleInputChange}/></div>
            </div>
            <div className="col-md-12 d-flex flex-row" style={{ marginLeft: '5%', marginTop: '5%' }}>
              <div className="col-2 justify-content-center"><label htmlFor="sfc">Search for: </label></div>
              <div className="col-9"><input type="text" id="sfc" placeholder="Content" onChange={handleContentInputChange} /></div>
            </div>
          </form>
          <div className="col-md-12 d-flex flex-row" style={{ marginLeft: '4%', marginTop: '5%' }}>
            <button id="ShowCourse" className="btn btn-primary m-2" onClick={handleToggleCourses}>
              {showCourses ? "Hide Courses" : "Show Courses"}
            </button>
          </div>
          {showCourses && (
            <div id="NewDiv" className="col-md-12 d-flex flex-row" style={{ marginLeft: '4%', marginTop: '3%' }}>
              <div className="InnerBox">
                <h4 className="SearchTitle">{`${inputName} Here Are Courses You May Select`}</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {filteredCourses.map((course) => (
                    <li className="list2" key={course.course_id}>
                      <input
                        type="checkbox"
                        id={`course-${course.course_id}`}
                        value={course.course_name}
                        onChange={() => handleCheckboxChange(course.course_id)}
                      />
                      <label htmlFor={`course-${course.course_id}`}>
                        {`${course.course_id} ${course.course_name} ${course.course_seatsremaining} / ${course.course_capacity}`}
                      </label>
                    </li>
                  ))}
                </ul>
                <button id="Register" className="btn m-2 btn-pr" onClick={handleRegisterButtonClick}>
                  Register
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SelectCourses;
