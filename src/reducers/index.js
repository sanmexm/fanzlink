import { combineReducers } from "redux";
import auth from "./auth";
import usersLists from "./users"
import postsLists from "./posts"
import contactUsLists from "./contactUs"

export default combineReducers ({
    auth,
    usersLists,
    postsLists,
    contactUsLists,
})