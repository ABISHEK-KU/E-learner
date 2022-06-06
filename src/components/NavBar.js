import React from "react";
import { Link } from "react-router-dom";
import '../Styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const NavBar = (props) => {
    const { handelLogOut, logInStatus } = props


    return (
        <div className="navBar">
            {(() => {
                if (logInStatus) {
                    if (localStorage.getItem('e-learntoken')) {
                        return (
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="container-fluid">
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" to="/userinfo">Profile</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Students
                                                </span>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link className="dropdown-item" to='/create_student'>Create</Link></li>
                                                    <li><Link className="dropdown-item" to='/student_list'>View</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Course
                                                </span>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link className="dropdown-item" to='/create_course'>Create</Link></li>
                                                    <li><Link className="dropdown-item" to='/course_list'>View</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" onClick={handelLogOut} to='/login'>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>)
                    } else if (localStorage.getItem('student_token')) {
                        return (
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="container-fluid">
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link className='nav-link' to='/home'>Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className='nav-link' to='/enroll'>Enroll</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className='nav-link' to='/my_courses'>My Courses</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" onClick={handelLogOut} to='/login'>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        )
                    }
                } else {
                    return (
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className='navBarLink' to='/signUp'>SignUp</Link>
                                        </li>
                                        <li>
                                            <Link className='navBarLink' to='/login'>LogIn</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    )
                }
            })()}
        </div >
    )
}
export default NavBar
