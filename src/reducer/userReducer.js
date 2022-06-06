const initalState={}

const userReducer=(state=initalState,action)=>{
    switch (action.type) {
        case 'USER_INFO':{
            return {...state,...action.payload}
        }
        case 'UPDATE_USER_INFO':{
            return {...state,...action.payload}
        }
        default:{
            return {...state}
        }
    }
}
export default userReducer