import axios from "../config/Axios";
import Swal from "sweetalert2";

export const adminAllCourses = () => {
    return (dispatch) => {
        axios.get('/courses',{
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
                    dispatch(setAdminCourses(result))
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

export const setAdminCourses=(data)=>{
    return{
        type:'ADMIN_COURSES',
        payload:data
    }
}


export const createCourse=(form)=>{
    return(dispatch)=>{
        axios.post('/courses',form,{
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
                dispatch(updateAdminCourses(result))
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

export const updateAdminCourses=(data)=>{
    return{
        type:'UPDATE_COURSE',
        payload:data
    }
}

export const deleteCourse=(id)=>{
    return (dispatch)=>{
        axios.delete(`/courses/${id}`,{
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
                dispatch(deleteAdminCourses(result))
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

export const deleteAdminCourses=(data)=>{
    return{
        type:'DELETE_COURSE',
        payload:data
    }
}

export const updateAdminCouresData=(form,id)=>{
    return (dispatch)=>{
        axios.put(`courses/${id}`,form,{
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
                dispatch(setUpdateAdminCouresData(result))
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

export const enrollCourse=(courseId,studentId)=>{
    console.log(courseId,studentId)
    return (dispatch)=>{
        axios.patch(`/courses/enroll?courseId=${courseId}&studentId=${studentId}`,{},{
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
                if(typeof result===typeof ''){
                    Swal.fire({
                        icon:'info',
                        title:'Alert',
                        text:result
                    })
                }else if( typeof result===typeof {}){
                dispatch(setUpdateAdminCouresData(result))
                }
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

export const unEnrollCourse=(courseId,studentId)=>{
    return (dispatch)=>{
        axios.patch(`/courses/unenroll?courseId=${courseId}&studentId=${studentId}`,{},{
            headers: { Authorization: localStorage.getItem('e-learntoken')}
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
                if(typeof result===typeof ''){
                    Swal.fire({
                        icon:'info',
                        title:'Alert',
                        text:result
                    })
                }else if( typeof result===typeof {}){
                dispatch(setUpdateAdminCouresData(result))
                }
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

export const setUpdateAdminCouresData=(data)=>{
    return({
        type:'UPDATE_COURSE_DATA',
        payload:data
    })
}

