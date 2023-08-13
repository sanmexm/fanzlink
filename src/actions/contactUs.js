import * as api from '../api'

import { CREATE_CONTACT_US_MESSAGE, START_LOADING } from "../constants/actionTypes";
//action creators
// redux thunk allows additional arrow function to a function

export const createContactUsMessage = (formData) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const {data} = await api.createContactUsMessage(formData);
        // navigate('/patients')
        dispatch({
            type: CREATE_CONTACT_US_MESSAGE,
            payload: data
        })
    }catch(error){
        console.log(error)
    }
}

