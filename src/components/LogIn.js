import React,{useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import '../Styles/LogIn.css';
import { userLogIn } from '../action/userAction';
import{studentLogin} from '../action/studentAction'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

const LogInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});


const LogIn = (props) => {
    const [isAdmin,setIsAdmin]=useState(false)
    const dispatch = useDispatch()
    const { handelAuth } = props

    const handelAdmin=(e)=>{
        if(e.target.checked){
            setIsAdmin(true)
        }else{
            setIsAdmin(false)
        }
    }


    const handelSubmit=(form)=>{
        if(isAdmin===true){
            dispatch(userLogIn(form, handelAuth))
        }else if(isAdmin===false){
            dispatch(studentLogin(form,handelAuth))
        }
    }
    return (
        <div className="container d-flex justify-content-center">

            <div className="card p-3 py-4">

                <div className="text-center">

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LogInSchema}
                        onSubmit={values => {
                            handelSubmit(values)
                        }}>
                        {({ errors, touched }) => (
                            <main className="form-signin">
                                <Form>
                                <img className="mb-4" src="https://dcassetcdn.com/design_img/673809/440505/440505_4205864_673809_image.png" alt="logo" width="200" height="57" />
                                    <h1 className="h3 mb-3 fw-normal">Log In</h1>

                                    <div className="form-floating">
                                        <Field name="email" type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                                        {errors.email && touched.email ? <label htmlFor="floatingEmail" className="error">Email {errors.email}</label> : <label htmlFor="floatingEmail">Email</label>}
                                    </div>

                                    <div className="form-floating">
                                        <Field name="password" type='password' className="form-control" id="floatingPassword" placeholder="Password" />
                                        {errors.password && touched.password ? (<label htmlFor="floatingPassword" className="error">Password {errors.password}</label>) : <label htmlFor="floatingPassword">Password</label>}
                                    </div>

                                    <div className="checkbox mb-3">
                                        <label htmlFor="admin">
                                            <Field type="checkbox" checked={isAdmin} onChange={handelAdmin} id='admin'/>Admin
                                        </label>
                                    </div>
                                    <div className="buttonSignUp">
                                        <button className="w-100 btn btn-lg btn-primary" type="submit" id='LogInButton'>Log In</button>
                                    </div>
                                </Form>
                            </main>
                        )}
                    </Formik>

                </div>

            </div>

        </div >
    )
}
export default LogIn