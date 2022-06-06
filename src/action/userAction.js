import axios from "../config/Axios";
import Swal from "sweetalert2";
import {getAllStudentInfo} from './studentAction'
import {adminAllCourses} from './courseAction'



export const autoLogInAdmin=()=>{
    return(dispatch)=>{
        dispatch(getUserInfo())
        dispatch(getAllStudentInfo())
        dispatch(adminAllCourses())
    }
}

export const userRegister = (form) => {
    return (dispatch) => {
        axios.post('/admin/register', form)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.errors,
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.notice
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
}

export const userLogIn = (form, handelAuth) => {
    return (dispatch) => {
        axios.post('/admin/login', form)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.errors,
                    })
                } else {
                    localStorage.setItem('e-learntoken', result.token)
                    handelAuth(true)
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
}

export const getUserInfo=()=>{
    return (dispatch)=>{
        axios.get('/admin/account',{
            headers:{Authorization:localStorage.getItem('e-learntoken')}
        })
        .then((response)=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.errors,
                })
            }else{
                dispatch(setUserInfo(result))
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
}

export const updateUserInfo=(form)=>{
    return (dispatch)=>{
        axios.put('/admin',form,{
            headers:{Authorization:localStorage.getItem('e-learntoken')}
        })
        .then((response)=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.errors,
                })
            }else{
                dispatch(setUpdateInfo(result))
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
}

export const setUserInfo=(data)=>{
    return({
        type:'USER_INFO',
        payload:data
    })
}

export const setUpdateInfo=(data)=>{
    return({
        type:'UPDATE_USER_INFO',
        payload:data
    })
}
