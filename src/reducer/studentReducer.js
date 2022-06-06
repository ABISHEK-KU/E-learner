const initialState = {}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NEW_STUDENT':{
            return {...state,studentList:[...state.studentList,action.payload]}
        }
        case 'UPDATE_ALL_STUDENT_INFO': {
            return { ...state, studentList: action.payload }
        }
        case 'UPDATE_STUDENT':{
            const update=state.studentList.map((e)=>{
                if(e._id===action.payload._id){
                    return action.payload
                }else{
                    return e
                }
            })
            return {...state,studentList:update}
        }
        case 'DELETE_INFO':{
            const deleteInfo=state.studentList.filter((e)=>{
                return e._id!==action.payload._id
            })
            return {...state, studentList:deleteInfo}
        }
        case 'STUDENT_COURSES':{
            return {...state,studentCourses:action.payload}
        }
        case 'UPDATE_STUDENT_COURSE':{
            const enroller=state.studentCourses.map((e)=>{
                if(e._id===action.payload._id){
                    return action.payload
                }else{
                    return e
                }
            })
            return {...state,studentCourses:enroller}
        }
        case 'ENROLLED_COURSE':{
            return {...state,enrolledCourses:action.payload}
        }
        default: {
            return { ...state }
        }
    }
}
export default studentReducer