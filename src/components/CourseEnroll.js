import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {studentCourseEnroll,studentCourseUnEnroll} from '../action/studentAction'

const CourseEnroll = (props) => {
    const dispatch=useDispatch()

    const studentDetails= useSelector((state) => {
        return state.student
    })
    const courses=[...studentDetails.studentCourses].reverse()

    return (
        <div className="container d-flex justify-content-center">

            <div className="card-container p-3 py-4 detail-card">

                <div className="text-center">

                    <div className='tableDiv'>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Course Name</th>
                                    <th scope="col">Level</th>
                                    <th scope="col">Validity</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Release Date</th>
                                    <th scope="col">Enroll</th>
                                    <th scope="col">UnEnroll</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((e,i)=>{
                                    return(
                                        <tr key={e._id}>
                                        <td>{i+1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.level}</td>
                                        <td>{e.validity}</td>
                                        <td>{e.category}</td>
                                        <td>{e.releaseDate.slice(0,10).split('-').reverse().join('-')}</td>
                                        <td><button className='tableButtonEnroll' onClick={()=>{dispatch(studentCourseEnroll(e._id))}}>Enroll</button></td>
                                        <td><button className='tableButtonUnEnroll' onClick={()=>{dispatch(studentCourseUnEnroll(e._id))}}>Un Enroll</button></td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseEnroll