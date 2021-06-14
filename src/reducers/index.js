import {applyMiddleware, createStore} from "redux";
import {combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./appReducer";
import thunk from "redux-thunk";


export default function saveToLocalStorage(name,state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem(name,serializedState)
    } catch (e) {
        console.log(e)
    }
}

export  function loadFromLocalStorage(name){
    try {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e)
        return undefined;
    }
}

const rootReducer = combineReducers({
    app: appReducer
})



export const store =  createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))