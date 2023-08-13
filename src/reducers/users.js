import { START_LOADING, END_LOADING, CREATE_USER, FETCH_ALL_USERS, FETCH_USERS_BY_SEARCH, FETCH_USER, UPDATE_USER, DELETE_USER } from "../constants/actionTypes"
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
export default (state = { isLoading: true, users: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case CREATE_USER:
            return {...state, users: [...state.users, action.payload] };
        case FETCH_ALL_USERS:
            return {
                ...state,
                getAllUsers: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            };
        case FETCH_USERS_BY_SEARCH:
            return {
                ...state,
                searchUsers: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            };
        case FETCH_USER:
            return {...state, user: action.payload};
        case UPDATE_USER:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) }
        case DELETE_USER:
            return {...state, users: state.users.filter((user) => user._id !== action.payload)}
        default: 
            return state;
    }
}