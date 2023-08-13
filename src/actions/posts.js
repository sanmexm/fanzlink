import * as api from '../api'
import { START_LOADING, END_LOADING, CREATE_POST, FETCH_ALL_POSTS, FETCH_POSTS_BY_SEARCH, SEARCH_USER_POSTS, FETCH_USER_POSTS, FETCH_POST, UPDATE_POST, COMMENT_POST, LIKE_POST, DELETE_POST } from '../constants/actionTypes'

//action creators
// redux thunk allows additional arrow function to a function

export const createPost = (newPost, navigate, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(newPost)
        dispatch({
            type: CREATE_POST,
            payload: data
        })
        navigate('/dashboard')
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to create')
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
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const fetchPostsBySearch = (page, searchQuery, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(page, searchQuery)
        dispatch({
            type: FETCH_POSTS_BY_SEARCH,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load')
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
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const fetchPostsByUser = (page, userId, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsByUser(page, userId)
        dispatch({
            type: FETCH_USER_POSTS,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const fetchPost = (id, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({
            type: FETCH_POST,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const updatedPost = (id, updatedPost, setError) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING })
        const { data } = await api.updatePost(id, updatedPost)
        dispatch({
            type: UPDATE_POST,
            payload: data
        })
        // navigate(window.location.reload())
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error)
        setError('Unable to load')
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
    }catch(error){
        console.log(error)
        setError('Unable to load')
    }
}

export const commentPost = (value, id, setError) => async (dispatch) => {

    try{
        const { data } = await api.commentPost(value, id)

        dispatch({ 
            type: COMMENT_POST, 
            payload: data 
        })
        return data.comments
    }catch(error){
        console.log(error)
        setError('Unable to load comments')
    }
}

export const deletePost = (id, setError) => async (dispatch) => {
    try{
        await api.deletePost(id)
        dispatch({ 
            type: DELETE_POST,
            payload: id 
        })
    }catch(error){
        console.log(error)
        setError('Unable to load comments')
    }
}