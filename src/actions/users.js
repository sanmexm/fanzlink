import * as api from '../api'
import { START_LOADING, END_LOADING, FETCH_ALL_USERS, FETCH_USERS_BY_SEARCH, FETCH_USER, UPDATE_USER, DELETE_USER } from '../constants/actionTypes'

//action creators
// redux thunk allows additional arrow function to a function

export const fetchUsers = (page, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchUsers(page)
        dispatch({
            type: FETCH_ALL_USERS,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to fetch users')
    }
}

export const fetchUsersBySearch = (page, searchQuery, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchUsersBySearch(page, searchQuery)
        dispatch({
            type: FETCH_USERS_BY_SEARCH,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const fetchUser = (id, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchUser(id)
        dispatch({
            type: FETCH_USER,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load user')
    }
}

export const updateUser = (id, updatedUser, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.updateUser(id, updatedUser)
        dispatch({
            type: UPDATE_USER,
            payload: data
        })
        // navigate(window.location.reload())
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to update user')
    }
}

export const resendVerification = (emailAddress) => async(dispatch) => {
    try{
        const response = await api.resendVerification(emailAddress)
        console.log("resend verification:", response)
        return response
    }catch(error){
        if(error.response){
            console.log("error resend verification:", error.response)
        }
    }
}

export const verifyUserRegEmail = ( id, emailToken, setError ) => async(dispatch) => {
    try{
        const response = await api.verifyUserRegEmail(id, emailToken)
        return response;
    }catch(error){
        // console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error message:", error.response.data.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const verifyEmailPassword = (emailAddress) => async(dispatch) => {
    try{
        // dispatch({ type: START_LOADING })
        // const { data } = await api.verifyEmailPassword(emailAddress)
        await api.verifyEmailPassword(emailAddress)
        // dispatch({
        //     type: VERIFY_EMAIL_PASSWORD,
        //     payload: data
        // })
        // console.log(data)
        // dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        // setError('something went wrong')
    }
}

export const updatePassword = (id, updatedPassword) => async(dispatch) => {
    try{
        const response = await api.passwordReset(id, updatedPassword)
        // console.log(response)
        // console.log(response.status)
        // console.log(response.successMessage)
        return response;
    }catch(error){
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error message:", error.response.data.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const deleteUser = (id, setError) => async (dispatch) => {
    try{
        await api.deleteUser(id)
        dispatch({ 
            type: DELETE_USER,
            payload: id 
        })
    }catch(error){
        console.log(error)
        setError('Unable to delete user')
    }
}
