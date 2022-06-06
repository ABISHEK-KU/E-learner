import React, { useState } from 'react';
import '../Styles/LectureList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LectureList = (props) => {
    const [toggle, setToggle] = useState(true)
    const [link,setLink]=useState('')


    const handelToggle = () => {
        setToggle(!toggle)
        setLink("https://www.youtube.com/embed/bQ4fEuovtuk")
    }

    return (
        <div className="wrapper">
            {/* <!-- Sidebar  --> */}
            {toggle && <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Content</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <span  data-bs-toggle="collapse" aria-expanded="false" className="sidenav-bs-toggle" data-bs-target="#homeSubmenu" aria-controls="homeSubmenu" role='button'>Home</span>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <span>Home 1</span>
                            </li>
                            <li>
                                <span >Home 2</span>
                            </li>
                            <li>
                                <span >Home 3</span>
                            </li>
                        </ul>
                    </li>

                </ul>

            </nav>}

            {/* <!-- Page Content  --> */}
            <div id="content">
                <i className="toggleIcon bi-list" onClick={handelToggle} ></i>

                <div className='videoContainer'>
                <iframe width="854" height="480" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

            </div>
        </div>
    )
}
export default LectureList