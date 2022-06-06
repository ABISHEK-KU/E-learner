import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import '../Styles/CreateCourse.css';
import { createCourse,updateAdminCouresData } from '../action/courseAction'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "../config/Axios";
import Swal from "sweetalert2";

const CreateCourse = (props) => {
    const { id } = props.match.params
    const [value, setValues] = useState({
        name: '',
        description: '',
        duration: '',
        releaseDate: '',
        isDelete: '',
        category: '',
        validity: '',
        level: '',
        author: '',
    })

    useEffect(() => {
        if (id) {
            axios.get(`courses/${id}`, {
                headers: { Authorization: localStorage.getItem('e-learntoken') }
            })
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: result.errors,
                        })
                    } else {
                        setValues({
                            name: result.name && result.name,
                            description: result.description && result.description,
                            duration: result.duration && result.duration,
                            releaseDate: result.releaseDate && result.releaseDate.slice(0,10),
                            isDelete: result.isDelete && result.isDelete,
                            category: result.category && result.category,
                            validity: result.validity && result.validity,
                            level: result.level && result.level,
                            author: result.author && result.author,
                        })
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.message,
                    })
                })
        }
    })

    const dispatch = useDispatch()
    const course = ['HTML', 'CSS', 'javascript', 'reactjs', 'nodejs', 'expressjs', 'mongodb']
    const levels = ['beginner', 'intermediate', 'expert']

    const CreateCourseSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        description: Yup.string().min(10, 'Too Short!').max(100, 'Too Long!').required('Required'),
        duration: Yup.number().required('Required'),
        releaseDate: Yup.date().required('Required'),
        isDelete: Yup.boolean().required('Required'),
        category: Yup.string().required('Required'),
        validity: Yup.number().required('Required'),
        level: Yup.string().required('Required'),
        author: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    const handelSubmit = (data) => {
        if (id) {
            dispatch(updateAdminCouresData(data,id))
        } else {
            dispatch(createCourse(data))
        }
        props.history.push('/course_list')
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-3 py-4">
                <div className="text-center">
                {id ? <button className='cancelButton' onClick={()=>{props.history.push('/course_list')}}><i className="bi bi-x-square-fill"></i></button> : null}
                    <Formik
                        initialValues={{ ...value }}
                        validationSchema={CreateCourseSchema}
                        enableReinitialize
                        onSubmit={values => {
                            handelSubmit(values)
                        }
                        }
                    >
                        {({ errors, touched }) => (
                            <main className="form-signin">
                                <Form>
                                    <h1 className="h3 mb-3 fw-normal">{id ? 'Update' : 'Create'} Courses</h1>
                                    <div className="form-floating">
                                        <Field name="name" type='text' className="form-control" id="floatingName" />
                                        {errors.name && touched.name ? <label htmlFor="floatingName" className="error">Name {errors.name}</label> : <label htmlFor="floatingName">Name</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="description" type="description" className="form-control" id="floatingdescription" />
                                        {errors.description && touched.description ? <label htmlFor="floatingdescription" className="error">Description {errors.description}</label> : <label htmlFor="floatingdescription">Description</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="duration" type='number' className="form-control" id="floatingduration" />
                                        {errors.duration && touched.duration ? (<label htmlFor="floatingduration" className="error">Duration {errors.duration}</label>) : <label htmlFor="floatingduration">Duration</label>}
                                    </div>

                                    <div className="container-main">
                                        <div className="row">
                                            <div className="col datecont">
                                                <div className="form-floating">
                                                    <Field name="releaseDate" type='date' className="form-control" id="floatingDate" />
                                                    {errors.releaseDate && touched.releaseDate ? (<label htmlFor="floatingDate" className="error">Release Date {errors.releaseDate}</label>) : <label htmlFor="floatingDate">Release Date</label>}
                                                </div>
                                            </div>
                                            <div className="col deletecont">
                                                <div className="form-floating">
                                                    <Field as="select" name="isDelete" className="form-control" id="floatingDelete" >
                                                        <option value='' disabled={true}>Select</option>
                                                        <option value={false} >Not Delete</option>
                                                        <option value={true} >Delete</option>
                                                    </Field>
                                                    {errors.isDelete && touched.isDelete ? (<label htmlFor="floatingDelete" className="error">Delete {errors.isDelete}</label>) : <label htmlFor="floatingDelete">Delete</label>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-main">
                                        <div className="row">
                                            <div className="col categorycont">
                                                <div className="form-floating">
                                                    <Field as="select" name="category" className="form-control" id="floatingCategory" >
                                                        <option value='' disabled={true}>Select</option>
                                                        {course.map((e, i) => {
                                                            return <option key={i + 1} value={e}>{e}</option>
                                                        })}
                                                    </Field>
                                                    {errors.category && touched.category ? (<label htmlFor="floatingCategory" className="error">Category {errors.category}</label>) : <label htmlFor="floatingCategory">Category</label>}
                                                </div>
                                            </div>
                                            <div className="col levelcont">
                                                <div className="form-floating">
                                                    <Field as="select" name="level" className="form-control" id="floatingLevel" >
                                                        <option value='' disabled={true}>Select</option>
                                                        {levels.map((e, i) => {
                                                            return <option key={i + 1} value={e}>{e}</option>
                                                        })}
                                                    </Field>
                                                    {errors.level && touched.level ? (<label htmlFor="floatingLevel" className="error">Level {errors.level}</label>) : <label htmlFor="floatingLevel">Level</label>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating ">
                                        <Field name="validity" type='number' className="form-control" id="floatingValidity" />
                                        {errors.validity && touched.validity ? (<label htmlFor="floatingValidity" className="error">Validity {errors.validity}</label>) : <label htmlFor="floatingValidity">Validity</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="author" type='text' className="form-control" id="floatingAuthor" />
                                        {errors.author && touched.author ? <label htmlFor="floatingAuthor" className="error">Author {errors.author}</label> : <label htmlFor="floatingAuthor">Author</label>}
                                    </div>

                                    <div className="buttonSignUp">
                                        <button className="w-100 btn btn-lg btn-primary" id="signUpButton" type="submit">{id ? 'Update' : 'Create'}</button>
                                    </div>
                                </Form>
                            </main>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    )
}
export default CreateCourse