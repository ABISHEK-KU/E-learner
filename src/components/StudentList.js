import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/StudentList.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudentInfo } from '../action/studentAction';
import { enrollCourse, unEnrollCourse } from '../action/courseAction'
import Swal from 'sweetalert2';

const StudentList = (props) => {
    const [select, setSelect] = useState('')
    const [search, setSearch] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const dispatch = useDispatch()

    const details = useSelector((state) => {
        return state
    })

    const listOfCourse = details.course.adminCourses.reverse()


    const listOfStudent = [...details.student.studentList].reverse().filter((e) => {
        if (select === 'Name') {
            return e.name.includes(search)
        } else if (select === 'Email') {
            return e.email.includes(search)
        } else if (select === 'Id') {
            return e._id.includes(search)
        } else if (select === '') {
            return e.name.includes(search)
        }
    })

    const handelEdit = (id) => {
        props.history.push(`/create_student/${id}`)
    }

    const handelDelete = (id) => {
        dispatch(deleteStudentInfo(id))
    }

    const handelEnroll = (id) => {
        if (selectedCourse) {
            dispatch(enrollCourse(selectedCourse, id))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Check course is selected for Enroll',
            })
        }
    }

    const handelUnenroll = (id) => {
        if (selectedCourse) {
            dispatch(unEnrollCourse(selectedCourse, id))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Check course is selected for UnEnroll',
            })
        }
    }

    const handelSelect = (e) => {
        const selected = e.target.value
        setSelect(selected)
    }

    const handelSearch = (e) => {
        const data = e.target.value
        setSearch(data)
    }

    const handelSelectCourse = (e) => {
        const id = e.target.value
        setSelectedCourse(id)
    }

    return (
        <div className="container d-flex justify-content-center">

            <div className="card-container p-3 py-4 detail-card">

                <div className="text-center">

                    <div className="search-box">
                        <input className="search-form-input" type="search" name="search" placeholder="Search..." onChange={handelSearch} />
                        <details id="dropdown" className="dropdownDetails">
                            <summary className="dropdown-button">
                                <span id="selected-item" className="selected-item">{(select === '') ? 'Select' : select}</span>
                            </summary>
                            <details-menu className="dropdown-menu-bar">
                                <div className="dropdown-menu-list">
                                    <label className="dropdown-menu-item-label">
                                        <input type="radio" name="item" value="" defaultChecked disabled={true} />
                                        <span>Select</span>
                                    </label>
                                    <label className="dropdown-menu-item-label">
                                        <input type="radio" name="item" value="Name" onChange={handelSelect} />
                                        <span>Name</span>
                                    </label>
                                    <label className="dropdown-menu-item-label">
                                        <input type="radio" name="item" value="Email" onChange={handelSelect} />
                                        <span>Email</span>
                                    </label>
                                    <label className="dropdown-menu-item-label">
                                        <input type="radio" name="item" value="Id" onChange={handelSelect} />
                                        <span>Id</span>
                                    </label>
                                </div>
                            </details-menu>
                        </details>
                    </div>
                    <div className='tableDiv'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Select Course</th>
                                    <th scope="col">Enroll</th>
                                    <th scope="col">UnEnroll</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfStudent.map((e, i) => {
                                    return (
                                        <tr key={e._id}>
                                            <td>{i + 1}</td>
                                            <td>{e.name}</td>
                                            <td>{e.email}</td>
                                            <td>
                                                <select onChange={handelSelectCourse}>
                                                    <option value=''>Select</option>
                                                    {listOfCourse.map((e) => {
                                                        return <option key={e._id} value={e._id}>{e.name}</option>
                                                    })}
                                                </select>
                                            </td>
                                            <td><button className='tableButtonEnroll' onClick={() => { handelEnroll(e._id) }}>Enroll</button></td>
                                            <td><button className='tableButtonUnEnroll' onClick={() => { handelUnenroll(e._id) }}>Un Enroll</button></td>
                                            <td><button className='tableIconButton' onClick={() => { handelEdit(e._id) }}><i className="bi bi-pencil-square"></i></button></td>
                                            <td><button className='tableIconButton' onClick={() => { handelDelete(e._id) }}><i className="bi bi-trash3-fill"></i></button></td>
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
export default StudentList