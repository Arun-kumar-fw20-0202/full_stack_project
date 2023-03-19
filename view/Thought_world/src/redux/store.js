import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AddPostreducer } from "./addPostReducer/reducer.addPost";
import { reducer } from "./registration/reducer";
import { Loginreducer } from "./loginReducer/reducer.login.js"
import { LikeReducer } from "./likes/reducer.like.js"
import { SaveReducer } from "./save/reducer.save.js"
import { commentReducer } from "./comments/reducer.comment.js"
import { FollowerReducer } from "./follower/reducer.follower.js"

const rootReducer = combineReducers({reducer,AddPostreducer,Loginreducer,LikeReducer, SaveReducer, commentReducer, FollowerReducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))