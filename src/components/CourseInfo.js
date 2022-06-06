import React from 'react';
import { useSelector } from 'react-redux'

const CourseInfo = (props) => {
    const { id } = props.match.params

    const courseDetails = useSelector((state) => {
        return state.course
    })

    const info=courseDetails.adminCourses.filter((e)=>{
        return e._id===id
    })

    return (
        <div className="container d-flex justify-content-center">

            <div className="card p-3 py-4">

                <div className="text-center">
                    <h1 className="mt-2">Course Details  <i className="bi bi-arrow-left-circle-fill" onClick={()=>{props.history.push('/course_list')}}></i></h1>
                    <hr />
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Course Name:</th>
                                <td>{info[0].name}</td>
                            </tr>
                            <tr>
                                <th>Level:</th>
                                <td>{info[0].level}</td>
                            </tr>
                            <tr>
                                <th>Validity:</th>
                                <td>{info[0].validity}</td>
                            </tr>
                            <tr>
                                <th>Category:</th>
                                <td>{info[0].category}</td>
                            </tr>
                            <tr>
                                <th>Author:</th>
                                <td>{info[0].author}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CourseInfo