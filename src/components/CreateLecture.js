import React, { useState, useEffect } from "react";
import { Formik, Field, Form} from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/CreateLecture.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createLecture,updateLecture} from "../action/lectureAction";
import axios from '../config/Axios'
import Swal from "sweetalert2";
import Select from 'react-select';

const CreateLecture = (props) => {
    const id = props.location.state

    console.log(id)
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [assetType,setAssetType]=useState('')
    const [assetURL,setAssetURL]=useState('')
    const [students,setStudents]=useState([])
    const [comments,setComments]=useState([])
    const [course,setCourse]=useState('')
    const[dataDelete,setDataDelete]=useState('')

    const dispatch = useDispatch()

    const data = useSelector((state) => {
        return state
    })
    const studentData= [...data.student.studentList].reverse()
    const courseData = [...data.course.adminCourses].reverse()

    const studentDropdown=studentData.map((e)=>{
        return {label:e.name,value:e}
    })

    const LectureCreateSchema = Yup.object().shape({
        title: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        assetType: Yup.string().required('Required'),
        assetURL: Yup.string().url('Please enter a valid').required('Required'),
        comments: !id.lectureId && Yup.array().min(1).required('Required'),
        students: Yup.array().min(1).required('Required'),
        course: Yup.string().required('Required'),
        isDelete: Yup.boolean().required('Required'),
    })

    useEffect(() => {
        if (id.lectureId) {
            axios.get(`/courses/${id.courseId}/lectures/${id.lectureId}`, {
                headers: { Authorization: localStorage.getItem('e-learntoken') }
            })
                .then((response) => {
                    const result = response.data
                    console.log(result)
                    if (result.hasOwnProperty('errors')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: result.errors,
                        })
                    } else {
                        setTitle(result.title)
                        setDescription(result.description)
                        setAssetType(result.assetType)
                        setAssetURL(result.assetURL)
                        setStudents(result.students)
                        setCourse(result.course)
                        setDataDelete(result.isDelete)
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
    }, [id])


    const handelSubmit = (values) => {
        console.log(values)
        if (id.lectureId) {
            dispatch(updateLecture(id.courseId,id.lectureId,values))
        } else {
            dispatch(createLecture(id.courseId, values))
        }
        handelCancel()
    }

    const handelCancel = () => {
        props.history.push(`/admin_lecture/${id.courseId}`)
    }

    const handelSelect=(e)=>{
        setStudents(e.map((ele)=>{
            return ele.value
        }))
    }



    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-3 py-4">
                <div className="text-center">
                    {id.lectureId ? <button className='cancelButton' onClick={handelCancel}><i className="bi bi-x-square-fill"></i></button> : null}
                    <Formik
                        initialValues={id.lectureId ? {
                            title:title,
                            description:description,
                            assetType: assetType,
                            assetURL:assetURL,
                            students: students,
                            course: course,
                            isDelete: dataDelete,
                        } : {
                            title:title,
                            description:description,
                            assetType: assetType,
                            assetURL:assetURL,
                            students: students,
                            course: course,
                            isDelete: dataDelete,
                            comments:comments,
                        }}
                        validationSchema={LectureCreateSchema}
                        validateOnChange={false}
                        onSubmit={(values) => { handelSubmit(values) }}
                        enableReinitialize
                    >
                        {({ errors, touched }) => (
                            <main className="form-signin">
                                <Form>
                                    <h1 className="h3 mb-3 fw-normal">{(id.lectureId) ? 'Update' : 'Create'} Lecture</h1>
                                    <div className="form-floating">
                                        <Field name="title" type='text' className="form-control" id="floatingTitle" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                        {errors.title && touched.title ? <label htmlFor="floatingTitle" className="error">Title {errors.title}</label> : <label htmlFor="floatingTitle">Title</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="description" type="text" className="form-control" id="floatingDescription" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                                        {errors.description && touched.description ? <label htmlFor="floatingDescription" className="error">Description {errors.description}</label> : <label htmlFor="floatingDescription">Description</label>}
                                    </div>

                                    <div className="container-main">
                                        <div className="row">
                                            <div className="col assetTypeCont">
                                                <div className="form-floating">
                                                    <Field as="select" name="assetType" className="form-control" id="floatingAssetType" value={assetType} onChange={(e)=>{setAssetType(e.target.value)}}>
                                                        <option value='' disabled={true}>Select</option>
                                                        <option value='video' >Video</option>
                                                        <option value='audio' >Audio</option>
                                                        <option value='text' >Text</option>
                                                        <option value='pdf' >PDF</option>
                                                        <option value='img' >Image</option>
                                                    </Field>
                                                    {errors.assetType && touched.assetType ? (<label htmlFor="floatingAssetType" className="error">Asset Type {errors.assetType}</label>) : <label htmlFor="floatingAssetType">Asset Type</label>}
                                                </div>
                                            </div>
                                            <div className="col deletecont">
                                                <div className="form-floating">
                                                    <Field as="select" name="isDelete" className="form-control" id="floatingDelete" value={dataDelete} onChange={(e)=>{setDataDelete(e.target.value)}}>
                                                        <option value='' disabled={true}>Select</option>
                                                        <option value={false} >Not Delete</option>
                                                        <option value={true} >Delete</option>
                                                    </Field>
                                                    {errors.isDelete && touched.isDelete ? (<label htmlFor="floatingDelete" className="error">Delete {errors.isDelete}</label>) : <label htmlFor="floatingDelete">Delete</label>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating">
                                        <Select name="students" className="form-control" id="floatingStudents" options={studentDropdown} defaultValue={students} onChange={(e)=>{handelSelect(e)}} isMulti={true}/>
                                        {errors.students && touched.students ? (<label htmlFor="floatingStudents" className="error">Students {errors.students} </label>) : <label htmlFor="floatingStudents">Students</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field as="select" name="course" className="form-control" id="floatingCourse" value={course} onChange={(e)=>{setCourse(e.target.value)}} >
                                            <option value='' disabled={true}>Select</option>
                                            {courseData.map((e) => {
                                                return <option key={e._id} value={e._id}>{e.name}</option>
                                            })}
                                        </Field>
                                        {errors.course && touched.course ? (<label htmlFor="floatingCourse" className="error">Course {errors.course}</label>) : <label htmlFor="floatingCourse">Course</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="assetURL" type='url' className="form-control" id="floatingAssetURL" value={assetURL} onChange={(e)=>{setAssetURL(e.target.value)}}/>
                                        {errors.assetURL && touched.assetURL ? (<label htmlFor="floatingAssetURL" className="error">{errors.assetURL} AssetURL </label>) : <label htmlFor="floatingAssetURL">AssetURL</label>}
                                    </div>

                                    {!id.lectureId && (
                                        <div className="form-floating">
                                            <Field name="comments" type='text' className="form-control" id="floatingComments" value={comments} onChange={(e)=>{setComments([e.target.value])}}/>
                                            {errors.comments && touched.comments ? <label htmlFor="floatingComments" className="error">Comments {errors.comments}</label> : <label htmlFor="floatingComments">Comments</label>}
                                        </div>
                                    )}

                                    <div className="buttonSignUp">
                                        <button className="w-100 btn btn-lg btn-primary" id="signUpButton" type="submit">{(id.lectureId) ? 'Update' : 'Create'}</button>
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
export default CreateLecture