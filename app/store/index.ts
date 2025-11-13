import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import coreReducer from './slices/core.slice';

const reducer = combineReducers({
  coreData: coreReducer,
});

export type RootState = ReturnType<typeof reducer>;
const store = configureStore({ reducer });
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export default store;
