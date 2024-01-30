import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducer/rootReducer";

const configureStore = () => {
    const middleware = [thunk];
    return createStore(appReducer, applyMiddleware(...middleware));
};

export { configureStore }; 