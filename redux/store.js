import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import imageToTextParseReducer from './reducer';

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true}));

const store = createStore(imageToTextParseReducer, middleware);
