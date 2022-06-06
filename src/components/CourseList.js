import React from 'react';
import Swal from "sweetalert2";
import '../Styles/CourseList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse} from '../action/courseAction';
import {getAllLectures} from '../action/lectureAction';
const CourseList = (props) => {
    const dispatch = useDispatch()

    const courseDetails = useSelector((state) => {
        return state.course
    })

    const handelDelete= (id) => {
        Swal.fire({
            title: 'Do you want to delete course',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCourse(id))
            }
          })
        
    }

    const handelEdit=(id)=>{
        props.history.push(`/create_course/${id}`)
    }

    const handelLecture=(id)=>{
        dispatch(getAllLectures(id,props.history))
    }

    return (
        <main>
            <div className="album py-5 ">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {courseDetails.adminCourses.length>0&&courseDetails.adminCourses.map((e) => {
                            return (
                                <div className="float-card bg-light mb-3" key={e._id} onClick={() => {handelLecture(e._id)}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{e.name}</h5>
                                        <p className="card-text">{e.level}-{e.category}</p>
                                    </div>
                                    <div className="card-footer">
                                        <p>{e.description}</p>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>{props.history.push(`/course_info/${e._id}`)}}><i className="bi bi-info-square-fill"></i></button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>{handelEdit(e._id)}}><i className="bi bi-pencil-square"></i></button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { handelDelete(e._id) }}><i className="bi bi-trash3-fill"></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}
export default CourseList