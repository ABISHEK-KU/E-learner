import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import '../Styles/SignUp.css';
import { userRegister } from '../action/userAction';
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Too Short!').max(10, 'Too Long!').required('Required'),
    name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    website: Yup.string().required('Required'),
});

const SignUp = (props) => {
    const dispatch = useDispatch()

    const handelSubmit = (values) => {
        const form = {
            username: values.username,
            email: values.email,
            password: values.password,
            academy: {
                name: values.name,
                website: values.website,
            }
        }
        dispatch(userRegister(form))
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-3 py-4">
                <div className="text-center">
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            name: '',
                            website: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            handelSubmit(values)
                        }}>
                        {({ errors, touched }) => (
                            <main className="form-signin">
                                <Form>
                                <img className="mb-4" src="https://dcassetcdn.com/design_img/673809/440505/440505_4205864_673809_image.png" alt="logo" width="200" height="57" />
                                    <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                                    <div className="form-floating">
                                        <Field name="username" type='text' className="form-control" id="floatingUserName" placeholder="John doe" />
                                        {errors.username && touched.username ? <label htmlFor="floatingUserName" className="error">User Name {errors.username}</label> : <label htmlFor="floatingUserName">User Name</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="email" type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                                        {errors.email && touched.email ? <label htmlFor="floatingEmail" className="error">Email {errors.email}</label> : <label htmlFor="floatingEmail">Email</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="password" type='password' className="form-control" id="floatingPassword" placeholder="Password" />
                                        {errors.password && touched.password ? (<label htmlFor="floatingPassword" className="error">Password {errors.password}</label>) : <label htmlFor="floatingPassword">Password</label>}
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
                                        <button className="w-100 btn btn-lg btn-primary" id="signUpButton" type="submit">Sign Up</button>
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
export default SignUp