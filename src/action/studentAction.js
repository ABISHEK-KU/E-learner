import axios from "../config/Axios";
import Swal from "sweetalert2";

export const autoLogInStudent = () => {
    return (dispatch) => {
        dispatch(studentAllCourses())
        dispatch(enrolledCourses())
    }
}

export const studentAllCourses = () => {
    return (dispatch) => {
        axios.get('/courses', {
            headers: { Authorization: localStorage.getItem('student_token') }
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
                    dispatch(setStudentCourses(result))
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

export const setStudentCourses = (data) => {
    return {
        type: 'STUDENT_COURSES',
        payload: data
    }
}

export const studentCreate = (form) => {
    return (dispatch) => {
        axios.post('/admin/students', form, {
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
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `${result.name}'s account has created successfully`
                    })
                    dispatch(updateNewStudent(result))
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

export const updateNewStudent = (data) => {
    return {
        type: 'UPDATE_NEW_STUDENT',
        payload: data
    }
}

export const studentLogin = (form, handelAuth) => {
    return (dispatch) => {
        axios.post('/students/login', form)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.errors,
                    })
                } else {
                    localStorage.setItem('student_token', result.token)
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

export const getAllStudentInfo = () => {
    return (dispatch) => {
        axios.get('/admin/students', {
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
                    dispatch(updateAllStudentInfo(result))
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

export const updateAllStudentInfo = (data) => {
    return {
        type: 'UPDATE_ALL_STUDENT_INFO',
        payload: data
    }
}

export const deleteStudentInfo = (id) => {
    return (dispatch) => {
        axios.delete(`/admin/students/${id}`, {
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
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `Successfully deleted ${result.name}'s account`
                    })
                    dispatch(setDeleteStudentInfo(result))
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

export const setDeleteStudentInfo = (data) => {
    return {
        type: 'DELETE_INFO',
        payload: data
    }
}

export const studentUpdate = (form, id) => {
    return (dispatch) => {
        axios.put(`/students/${id}`, form, {
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
                    dispatch(setUpdateStudentInfo(result))
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

export const setUpdateStudentInfo = (data) => {
    return ({
        type: 'UPDATE_STUDENT',
        payload: data
    })
}

export const studentCourseEnroll = (id) => {
    return (dispatch) => {
        axios.patch(`/courses/enroll?courseId=${id}`, {}, {
            headers: { Authorization: localStorage.getItem('student_token') }
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
                    if(typeof result===typeof ''){
                        Swal.fire({
                            icon:'info',
                            title:'Alert',
                            text:result
                        })
                    }else if( typeof result===typeof {}){
                    dispatch(setUpdateStudentCouresData(result))
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

export const studentCourseUnEnroll = (id) => {
    return (dispatch) => {
        axios.patch(`/courses/unenroll?courseId=${id}`, {}, {
            headers: { Authorization: localStorage.getItem('student_token') }
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
                    if(typeof result===typeof ''){
                        Swal.fire({
                            icon:'info',
                            title:'Alert',
                            text:result
                        })
                    }else if( typeof result===typeof {}){
                    dispatch(setUpdateStudentCouresData(result))
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

export const setUpdateStudentCouresData=(data)=>{
return ({
    type:'UPDATE_STUDENT_COURSE',
    payload:data
})
}

export const enrolledCourses = () => {
    return (dispatch) => {
        axios.get('/courses/enrolled',{
            headers: { Authorization: localStorage.getItem('student_token') }
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
                    dispatch(setEnrolledCourses(result))
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

export const setEnrolledCourses=(data)=>{
    return({
        type:'ENROLLED_COURSE',
        payload:data
    })
}


