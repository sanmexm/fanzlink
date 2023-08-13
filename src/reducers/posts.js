import { START_LOADING, END_LOADING, CREATE_POST, FETCH_ALL_POSTS, FETCH_POSTS_BY_SEARCH, SEARCH_USER_POSTS, FETCH_POST, FETCH_USER_POSTS, UPDATE_POST, COMMENT_POST, LIKE_POST, DELETE_POST } from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case CREATE_POST:
            return {...state, posts: [...state.posts, action.payload] };
        case FETCH_ALL_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            };
        case FETCH_POSTS_BY_SEARCH:
            return {
                ...state,
                searchPosts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            }
        case SEARCH_USER_POSTS:
            return {
                ...state,
                userSearchPosts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            }
        case FETCH_POST:
            return {...state, post: action.payload}
        case FETCH_USER_POSTS:
            return {
                ...state, 
                userPosts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalNumber: action.payload.totalNumber,
            }
        case UPDATE_POST:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
        case COMMENT_POST:
            return {
                ...state, 
                postComments: state.posts.map((post) => {
                    //change the post that just receive the comment
                    if(post._id === action.payload._id) return action.payload
                    //return all other posts
                    return post
                })
            }
        case LIKE_POST:
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
        case DELETE_POST:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        default: 
            return state;
    }
}