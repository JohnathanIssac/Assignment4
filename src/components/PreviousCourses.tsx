import React, { useEffect, useState } from "react";
import Axios from "axios";

import { studentId } from "./EnterStudentID";
import "../App.css";

interface Course {
  course_id: string;
}

const PreviousCourses = () => {
  const [coursePre, setCoursePre] = useState<Course[]>([]);
  const [checkedCourses, setCheckedCourses] = useState<string[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const isStudentIDEmpty = studentId.trim() === "";

  useEffect(() => {
    Axios.get(`http://127.0.0.1:3001/getAllCourseIDs`)
      .then(response => {
        console.log("Received courses from server:", response.data);
        setCoursePre(response.data);
      })
      .catch(error => {
        console.error("Error fetching courses: ", error);
      });
  }, []);

  const handleCheckboxChange = (courseId: string) => {
    setCheckedCourses(prevCheckedCourses => {
      if (prevCheckedCourses.includes(courseId)) {
        return prevCheckedCourses.filter(id => id !== courseId);
      } else {
        return [...prevCheckedCourses, courseId];
      }
    });
  };

  const handleSetPreviousCourses = () => {
    console.log("Selected Courses: ", checkedCourses);
    if (checkedCourses.length > 0) {
      Axios.post(`http://127.0.0.1:3001/updateTranscript`, {
        studentID: studentId,
        selectedCourses: checkedCourses,
      })
        .then(response => {
          console.log("Courses updated successfully:", response.data);
          alert("Submission Successful");
          setSubmissionSuccess(true); // Set success state to true
        })
        .catch(error => {
          console.error("Error updating courses: ", error);
        });
    }
  };

  return (
    <div className="BackBoard">
      {isStudentIDEmpty ? (
        <>
          <h2 className="cen">Student ID: -1</h2>
          <h2 className="cen">Check off courses you have completed with a C or better</h2>
        </>
      ) : (
        <>
          <h2 className="cen">Student ID: {studentId}</h2>
          <div className="course-list">
            {coursePre.map((course, index) => (
              <div key={index} className="course-item">
                <label>
                  <input
                    type="checkbox"
                    value={course.course_id}
                    checked={checkedCourses.includes(course.course_id)}
                    onChange={() => handleCheckboxChange(course.course_id)}
                  />
                  {course.course_id}
                </label>
              </div>
            ))}
            <div className="BTNCenter">
              <button
                id="preCbtn"
                className="btn m-2 btn-pr"
                onClick={handleSetPreviousCourses}
              >
                Set Previous Courses
              </button>
            </div>
          </div>
          {submissionSuccess && (
            <div className="success-message">
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PreviousCourses;
