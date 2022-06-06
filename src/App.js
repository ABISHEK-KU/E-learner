import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LogIn from './components/LogIn';
import UserInfo from './components/UserInfo';
import CreateStudent from './components/CreateStudent';
import StudentList from './components/StudentList';
import CreateCourse from './components/CreateCourse';
import CourseList from './components/CourseList';
import CourseInfo from './components/CourseInfo';
import CourseEnroll from './components/CourseEnroll';
import LectureList from './components/LectureList';
import MyCourses from './components/MyCourses';
import CreateLecture from './components/CreateLecture';
import AdminLecture from './components/AdminLecture';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { autoLogInAdmin } from './action/userAction';
import { autoLogInStudent } from './action/studentAction'
import 'bootstrap/dist/css/bootstrap.min.css'


function App(props) {
  const [logInStatus, setLogInStatus] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('e-learntoken')) {
      dispatch(autoLogInAdmin())
      history.push('/home')
      setLogInStatus(true)
    } else if (localStorage.getItem('student_token')) {
      dispatch(autoLogInStudent())
      history.push('/home')
      setLogInStatus(true)
    } else {
      history.push('/login')
    }
  }, [logInStatus])

  const handelAuth = (status) => {
    setLogInStatus(status)
  }

  const handelLogOut = () => {
    localStorage.removeItem('e-learntoken')
    localStorage.removeItem('student_token')
    setLogInStatus(false)
  }

  return (
    <div>
      <NavBar logInStatus={logInStatus} handelLogOut={handelLogOut} />
      {(() => {
        if (logInStatus) {
          if (localStorage.getItem('e-learntoken')) {
            return (
              <div className='routePages'>
                <Route path='/home' component={Home} exact={true} />
                <Route path='/userinfo' component={UserInfo} exact={true} />
                <Route path='/create_student' component={CreateStudent} exact={true} />
                <Route path='/create_student/:id' component={CreateStudent} exact={true} />
                <Route path='/student_list' component={StudentList} exact={true} />
                <Route path='/create_course' component={CreateCourse} exact={true} />
                <Route path='/create_course/:id' component={CreateCourse} exact={true} />
                <Route path='/course_list' component={CourseList} exact={true} />
                <Route path='/course_info/:id' component={CourseInfo} exact={true} />
                <Route path='/admin_lecture/:id' component={AdminLecture} exact={true}/>
                <Route path='/create_lecture' component={CreateLecture} exact={true}/>
              </div>
            )
          } else if (localStorage.getItem('student_token')) {
            return (
              <div className='routePages'>
                <Route path='/home' component={Home} exact={true}/>
                <Route path ='/enroll' component={CourseEnroll} exact={true}/>
                <Route path ='/my_courses' component={MyCourses} exact={true}/>
                <Route path ='/lecture_list' component={LectureList} exact={true}/>
              </div>
            )
          }
        } else {
          return (
            <div className='routePages'>
              <Route path='/signup' component={SignUp} exact={true} />
              <Route path='/login' render={(props) => { return <LogIn handelAuth={handelAuth} /> }} exact={true} />
            </div>
          )
        }
      })()}
    </div>
  );
}

export default App;
