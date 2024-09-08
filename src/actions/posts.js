import * as api from '../api'
import { START_LOADING, END_LOADING, CREATE_POST, FETCH_ALL_POSTS, FETCH_POSTS_BY_SEARCH, SEARCH_USER_POSTS, FETCH_USER_POSTS, FETCH_POST, UPDATE_POST, COMMENT_POST, REVIEW_POST, LIKE_POST, DELETE_POST, FETCH_SIMILAR_POSTS, RATE_POST, VIEW_RATED_POST } from '../constants/actionTypes'

//action creators
// redux thunk allows additional arrow function to a function

export const createPost = (newPost) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(newPost)
        dispatch({
            type: CREATE_POST,
            payload: data
        })
        dispatch({ type: END_LOADING })
        window.location.replace('/posts/create-post?create-post=true');
        return data
    }catch(error){
        console.log("create post error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const fetchPosts = (page, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        dispatch({
            type: FETCH_ALL_POSTS,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load')
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

export const fetchSimilarPosts = (searchQuery) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchSimilarPosts(searchQuery)
        dispatch({
            type: FETCH_SIMILAR_POSTS,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log(error)
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            // console.log("Error message:", error.response.data.data.message);
            return error.response; // Return the error response object
        }
    }
}

export const fetchPostsBySearch = (page, searchQuery) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(page, searchQuery)
        dispatch({
            type: FETCH_POSTS_BY_SEARCH,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log(error)
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

export const searchUserPosts = (page, userId, searchQuery, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.searchUserPosts(page, userId, searchQuery)
        dispatch({
            type: SEARCH_USER_POSTS,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load')
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

export const fetchPostsByUser = (page, userId) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsByUser(page, userId)
        dispatch({
            type: FETCH_USER_POSTS,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log("user posts load error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error message:", error.response.data.data.message)
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const fetchPost = (id) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({
            type: FETCH_POST,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log(error)
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

export const updatedPost = (id, updatedPost, setError) => async(dispatch) => {
    try{
        const { data } = await api.updatePost(id, updatedPost)
        dispatch({
            type: UPDATE_POST,
            payload: data
        })
        // navigate(window.location.reload())
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load')
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

export const likePost = (id, setError) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('authData'))

    try{
        const { data } = await api.likePost(id, user?.token)
        dispatch({
            type: LIKE_POST,
            payload: data
        })
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load')
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

export const commentPost = (value, id, setError) => async (dispatch) => {

    try{
        const { data } = await api.commentPost(value, id)

        dispatch({ 
            type: COMMENT_POST, 
            payload: data 
        })
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load comments')
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

export const fetchPostRatings = (id) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostRatings(id)
        dispatch({
            type: VIEW_RATED_POST,
            payload: data
        })
        dispatch({ type: END_LOADING })
        return data
    }catch(error){
        console.log("post ratings error:", error);
    }
}

export const ratePost = (id, userId, star) => async (dispatch) => {
    try{
        // dispatch({ type: START_LOADING })
        const { data } = await api.ratePost(id, userId, star)
        dispatch({ 
            type: RATE_POST, 
            payload: data 
        })
        // dispatch({ type: END_LOADING })
        return data
    }catch(error){
        // console.log(error)
        console.log("rate post error:", error);
        // if (error.response) {
        //     console.log("Error status:", error.response.status);
        //     return error.response; // Return the error response object
        // } else {
        //     console.log("Error details:", error.message);
        //     throw error; // Re-throw the error to be caught in the handleSubmit function
        // }
    }
}

export const reviewPost = (id, userId, value) => async (dispatch) => {
    try{
        const { data } = await api.reviewPost(id, userId, value)
        dispatch({ 
            type: REVIEW_POST, 
            payload: data 
        })
        return data.reviews
    }catch(error){
        console.log(error)
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const deletePost = (id, setError) => async (dispatch) => {
    try{
        const data = await api.deletePost(id)
        dispatch({ 
            type: DELETE_POST,
            payload: id 
        })
        window.location.reload();
        return data
    }catch(error){
        console.log(error)
        setError('Unable to load comments')
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