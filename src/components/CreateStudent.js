import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import '../Styles/CreateStudent.css';
import { useDispatch } from 'react-redux'
import { studentCreate, studentUpdate } from '../action/studentAction'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../config/Axios'
import Swal from "sweetalert2";


const CreateStudent = (props) => {
    const { id } = props.match.params
    const [details, setDetails] = useState(id ? {
        name: '',
        email: '',
        isAllowed: '',
    } : {
        name: '',
        email: '',
        password: '',
        isAllowed: '',
    })

    const dispatch = useDispatch()

    const StudentCreateSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: !id && Yup.string().min(7, 'Too Short!').max(10, 'Too Long!').required('Required'),
        isAllowed: Yup.boolean().required('Required')
    })

    useEffect(() => {
        if (id) {
            axios.get(`/students/${id}`, {
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
                        setDetails({
                            name: result.name && result.name,
                            email: result.email && result.email,
                            isAllowed: result.isAllowed ? true : false,
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
    }, [id])


    const handelSubmit = (values) => {
        if (id) {
            dispatch(studentUpdate(values, id))
        } else {
            dispatch(studentCreate(values))
        }
        props.history.push('/student_list')
    }

    const handelBack = () => {
        props.history.push('/student_list')
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-3 py-4">
                <div className="text-center">
                {id ? <button className='cancelButton' onClick={handelBack}><i className="bi bi-x-square-fill"></i></button> : null}
                    <Formik
                        initialValues={{ ...details }}
                        validationSchema={StudentCreateSchema}
                        validateOnChange={false}
                        onSubmit={(values) => { handelSubmit(values) }}
                        enableReinitialize
                    >
                        {({ errors, touched }) => (
                            <main className="form-signin">
                                <Form>
                                    <h1 className="h3 mb-3 fw-normal">{(id) ? 'Update' : 'Create'} Student</h1>
                                    <div className="form-floating">
                                        <Field name="name" type='text' className="form-control" id="floatingName" />
                                        {errors.name && touched.name ? <label htmlFor="floatingName" className="error"> Name {errors.name}</label> : <label htmlFor="floatingName"> Name</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="email" type="email" className="form-control" id="floatingEmail" />
                                        {errors.email && touched.email ? <label htmlFor="floatingEmail" className="error">Email {errors.email}</label> : <label htmlFor="floatingEmail">Email</label>}
                                    </div>

                                    {!id ? <div className="form-floating">
                                        <Field name="password" type='password' className="form-control" id="floatingPassword" disabled={id ? true : false} />
                                        {errors.password && touched.password ? (<label htmlFor="floatingPassword" className="error">Password {errors.password}</label>) : <label htmlFor="floatingPassword">Password</label>}
                                    </div> : null}

                                    <div className="form-floating">
                                        <Field as="select" name="isAllowed" className="form-control" id="floatingAllowed" >
                                            <option value='' disabled={true}>Select</option>
                                            <option value={false} >Not Allowed</option>
                                            <option value={true} >Allowed</option>
                                        </Field>
                                        {errors.isAllowed && touched.isAllowed ? (<label htmlFor="floatingAllowed" className="error">Allowed {errors.isAllowed}</label>) : <label htmlFor="floatingAllowed">Allowed</label>}
                                    </div>

                                    <div className="buttonSignUp">
                                        <button className="w-100 btn btn-lg btn-primary" id="signUpButton" type="submit">{(id) ? 'Update' : 'Create'}</button>
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
export default CreateStudent