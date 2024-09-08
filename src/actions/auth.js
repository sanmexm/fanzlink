import * as api from '../api'
import { AUTH, CREATE_USER, START_LOADING } from '../constants/actionTypes'

export const signin = (formData, location) => async(dispatch) => {
    try{
        //login user
        const { data } = await api.signInUser(formData)
        dispatch({ type: AUTH, data })

        // Check if there's a previous location in state or referer
        const previousLocation = location.state?.from || document.referrer;

        // Check if the previous location is not the login location
        const loginLocation = '/login';

        if (previousLocation && previousLocation !== loginLocation) {
            // Redirect to previous location if it exists and is not the login location
            window.location.replace(previousLocation);
            // navigate(previousLocation, { replace: true });
        } else {
            // Redirect to '/patients' if there is no previous location or it is the login location
            // navigate('/patients', { replace: true });
            window.location.replace('/dashboard');
        }
    }catch(error){
        // console.log("Login error:", error);
        if (error.response) {
            // console.log("Error status:", error.response.status);
            // console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const createUser = (newUser) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const {data} = await api.createUser(newUser);
        dispatch({
            type: CREATE_USER,
            payload: data
        })
        window.location.replace('/login?verification=true'); // Redirect with query parameter
    }catch(error){
        // setError('Unable to create user at this time, please try again')
        if (error.response) {
            // console.log("Error status:", error.response.status);
            // console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}