const initialState={}

const courseReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADMIN_COURSES':{
            return {...state,adminCourses:action.payload}
        }
        case 'UPDATE_COURSE':{
            return {...state,adminCourses:[...state.adminCourses,action.payload]}
        }
        case 'DELETE_COURSE':{
            const deleted=state.adminCourses.filter((e)=>{
                return e._id!==action.payload._id
            })
            return {...state,adminCourses:deleted}
        }
        case 'UPDATE_COURSE_DATA':{
            const update=state.adminCourses.map((e)=>{
                if(e._id===action.payload._id){
                    return action.payload
                }else{
                    return e
                }
            })

            return {...state,adminCourses:update}
        }
        default:{
            return {...state}
        }
    }
}
export default courseReducer