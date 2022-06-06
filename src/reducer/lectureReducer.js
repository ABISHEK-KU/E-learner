const initialState={adminLecture:[]}

const lectureReducer =(state=initialState,action)=>{
    switch (action.type) {
        case 'SET_LECTURE':{
            return {...state,adminLecture:action.payload}
        }
        case 'CREATE_LECTURE':{
            return {...state,adminLecture:[...state.adminLecture,action.payload]}
        }
        case 'UPDATE_LECTURE':{
            const update=state.adminLecture.map((e)=>{
                if(e._id===action.payload._id){
                    return action.payload
                }else{
                    return e
                }
            })
            return {...state,adminLecture:update}
        }
        case 'DELETE_LECTURE':{
            const deleter=state.adminLecture.filter((e)=>{
                return e._id!==action.payload._id
            })
            return deleter
        }
        default:{
            return {...state}
        }
    }
}
export default lectureReducer