import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"

function NavBar() {
  const [show, setShow] = useState(true);

  const onClickHandle = () => {
    setShow(!show);
  };

  return (
    <div>
      <button className={`navToggle ${show ? '' : 'navTogglex'}`} onClick={onClickHandle} id='b'></button>
      <nav className={`MenuBar ${show ? '' : 'MenuBarHidden'}`}>
        <ul className='MenuBarUl' data-visible={show}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <li className='lists'>00 Home</li>
          </Link>
          <Link to='/instructions' style={{ textDecoration: 'none' }}>
            <li className='lists'>01 Instruction</li>
          </Link>
          <Link to='/EnterStudentID' style={{ textDecoration: 'none' }}>
            <li className='lists'>02 Login</li>
          </Link>
          <Link to='/previouscourses' style={{ textDecoration: 'none' }}>
            <li className='lists'>03 Enter the Previous Courses</li>
          </Link>
          <Link to='/selectcourses' style={{ textDecoration: 'none' }}>
            <li className='lists'>04 Select the Courses</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
