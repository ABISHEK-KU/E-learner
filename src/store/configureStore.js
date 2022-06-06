import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducer/userReducer'
import studentReducer from '../reducer/studentReducer'
import courseReducer from '../reducer/courseReducer'
import lectureReducer from '../reducer/lectureReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        student:studentReducer,
        course:courseReducer,
        lecture:lectureReducer,
    }),applyMiddleware(thunk))
    return store
}
export default configureStore