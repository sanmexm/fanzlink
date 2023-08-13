import { START_LOADING, END_LOADING, MESSAGE_ERROR, CREATE_CONTACT_US_MESSAGE } from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
export default (state = { isLoading: true, contactUsForm: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        //check your controllers from the backend to confirm what you are adding to your reducers
        case MESSAGE_ERROR:
            return {...state, errorMessage: action.payload}
        case CREATE_CONTACT_US_MESSAGE:
            return {...state, contactUsForm: [...state.contactUsForm, action.payload] };
        default:
            return state;
    }
}