import { createStore } from 'redux';
import { authReducer } from './Reducers/AuthReducer';

export const store = createStore(authReducer)

