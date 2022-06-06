import axios from "../config/Axios";
import Swal from "sweetalert2";

export const getAllLectures=(id,history)=>{
    return(dispatch)=>{
        axios.get(`/courses/${id}/lectures`,{
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
                dispatch(setLectures(result))
                history.push(`/admin_lecture/${id}`)
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

export const setLectures=(data)=>{
    return({
        type:'SET_LECTURE',
        payload:data
    })
}

export const getAllStudentLectures=(id)=>{
    return(dispatch)=>{
        axios.get(`/courses/${id}/lectures`,{
            headers: { Authorization: localStorage.getItem('student_token')}
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
                console.log(result)
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



export const createLecture=(id,form)=>{
    return(dispatch)=>{
        axios.post(`/courses/${id}/lectures`,form,{
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
                dispatch(createLectureData(result))
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

export const createLectureData=(data)=>{
    return({
        type:'CREATE_LECTURE',
        payload:data
    })
}

export const updateLecture=(courseId,lectureId,form)=>{
    return(dispatch)=>{
        axios.put(`/courses/${courseId}/lectures/${lectureId}`,form,{
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
                dispatch(updateLectureData(result))
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

export const updateLectureData=(data)=>{
    return({
        type:'UPDATE_LECTURE',
        payload:data
    })
}

export const deleteLecture=(courseId,lectureId)=>{
    return(dispatch)=>{
        axios.delete(`/courses/${courseId}/lectures/${lectureId}`,{
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
                dispatch(deleteLectureData(result))
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

export const deleteLectureData=(data)=>{
    return({
        type:'DELETE_LECTURE',
        payload:data
    })
}