import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLectures } from '../action/lectureAction';

const MyCourses = (props) => {
const dispatch=useDispatch()

    const studentCourses = useSelector((state) => {
        return state.student
    })
    const enrolledCourses = [...studentCourses.enrolledCourses].reverse()


    const handelOpenLecture=(id)=>{
        dispatch(getAllLectures(id))
        props.history.push('/lecture_list')
    }

    return (
        <main>
            <div className="album py-5 ">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        {
                            enrolledCourses.map((e) => {
                                return (
                                    <div className="float-card bg-light mb-3" key={e._id} onClick={()=>{handelOpenLecture(e._id)}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{e.name}</h5>
                                            <p className="card-text">{e.level}</p>
                                        </div>
                                        <div className="card-footer">
                                            <h6>{e.description}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </main>
    )
}
export default MyCourses