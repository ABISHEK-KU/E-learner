import React, { useState } from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import '../Styles/UserInfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../action/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EditSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    website: Yup.string().required('Required'),
});

const UserInfo = (props) => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => {
        return state.user
    })

    const handelEdit = () => {
        setToggle(!toggle)
    }

    const handelSubmit = (values) => {
        const form = {
            username: values.username,
            email: values.email,
            academy: {
                name: values.name,
                website: values.website,
            },
        }

        dispatch(updateUserInfo(form))
        setToggle(!toggle)
    }

    return (
        <div className="container d-flex justify-content-center">

            <div className="card p-3 py-4">

                <div className="text-center">
                    {(toggle) ? (
                        <div>
                            <Formik
                                initialValues={{
                                    username: userDetails.username,
                                    email: userDetails.email,
                                    name: userDetails.academy.name,
                                    website: userDetails.academy.website,
                                }}
                                validationSchema={EditSchema}

                                onSubmit={values => {
                                    handelSubmit(values)
                                }}>
                                {({ errors, touched }) => (
                                    <main className="form-signin">
                                        <Form>
                                            <h1 className="mt-2">Edit Profile <i className="bi bi-x-square-fill" onClick={handelEdit}></i></h1>
                                            <div className="form-floating">
                                                <Field name="username" type='text' className="form-control" id="floatingUserName" placeholder="John doe" />
                                                {errors.username && touched.username ? <label htmlFor="floatingUserName" className="error">User Name {errors.username}</label> : <label htmlFor="floatingUserName">User Name</label>}
                                            </div>

                                            <div className="form-floating">
                                                <Field name="email" type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                                                {errors.email && touched.email ? <label htmlFor="floatingEmail" className="error">Email {errors.email}</label> : <label htmlFor="floatingEmail">Email</label>}
                                            </div>

                                            <div className="form-floating">
                                                <Field name="name" type='text' className="form-control" id="floatingName" placeholder="academy name" />
                                                {errors.name && touched.name ? (<label htmlFor="floatingName" className="error">Academy Name {errors.name}</label>) : <label htmlFor="floatingName">Academy Name</label>}
                                            </div>

                                            <div className="form-floating">
                                                <Field name="website" type='text' className="form-control" id="floatingWebSite" placeholder="www.abcd.com" />
                                                {errors.website && touched.website ? (<label htmlFor="floatingWebSite" className="error">WebSite {errors.website}</label>) : <label htmlFor="floatingWebSite">WebSite</label>}
                                            </div>

                                            <div className="buttonSignUp">
                                                <button className="w-100 btn btn-lg btn-primary" id="signUpButton" type="submit">Submit</button>
                                            </div>
                                        </Form>
                                    </main>
                                )}
                            </Formik>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mt-2">Profile <i className="bi bi-pencil-square" onClick={handelEdit} ></i> </h1>
                            <hr />
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>UserName:</th>
                                        <td>{userDetails.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{userDetails.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Role type:</th>
                                        <td>{userDetails.role}</td>
                                    </tr>
                                    <tr>
                                        <th>AcademyName:</th>
                                        <td>{userDetails.academy.name && userDetails.academy.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Website:</th>
                                        <td>{userDetails.academy.website && userDetails.academy.website}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}
export default UserInfo