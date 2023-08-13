import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

//This is going to be a function that's going to happen on each one of our request
API.interceptors.request.use((req) => {
    if(localStorage.getItem('authData')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('authData')).token}`
    }
    return req
})

const posts       = '/posts'
const users       = '/users'
const contactUs   = '/contact-us'

// users
export const fetchUsers            = (page) => API.get(`${users}?page=${page}`)
export const fetchUser             = (id) => API.get(`${users}/${id}`)
export const createUser            = (newUser) => API.post(`${users}/signup`, newUser)
export const updateUser            = (id, updatedUser) => API.patch(`${users}/${id}`, updatedUser)
export const fetchUsersBySearch    = (page, searchQuery) => API.get(`${users}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteUser            = (id) => API.delete(`${users}/${id}`)
export const verifyUserRegEmail    = (id, emailToken) => API.get(`${users}/user/${id}/verify/${emailToken}`)
export const resendVerification    = (emailAddress) => API.post(`${users}/resend-verification/${emailAddress}`)
export const verifyEmailPassword   = (emailAddress) => API.post(`${users}/verify-email-password/${emailAddress}`)
export const passwordReset         = (id, updatedPassword) => API.put(`${users}/${id}`, updatedPassword)
export const signInUser            = (formData) => API.post(`${users}/signin`, formData)

//posts
export const fetchPosts            = (page) => API.get(`${posts}?page=${page}`)
export const fetchPostsBySearch    = (page, searchQuery) => API.get(`${posts}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const fetchPost             = (id) => API.get(`${posts}/${id}`)
export const fetchPostsByUser      = (page, userId) => API.get(`${posts}/userPosts/${userId}?page=${page}`)
export const searchUserPosts       = (page, userId, searchQuery) => API.get(`${posts}/${userId}/search?searchQuery=${searchQuery} || 'none'}$page=${page}`)
export const createPost            = (newPost) => API.post(`${posts}/createPost`, newPost)
export const updatePost            = (id, updatedPost) => API.patch(`${posts}/${id}`, updatedPost)
export const likePost              = (id) => API.patch(`${posts}/${id}/likePost`)
export const commentPost           = (value, id) => API.post(`${posts}/${id}/commentPost`, { value })
export const deletePost            = (id) => API.delete(`${posts}/${id}`)

//contact us
export const createContactUsMessage = (formData) => API.post(`${contactUs}/create`, formData)