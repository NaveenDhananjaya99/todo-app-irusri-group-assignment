import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import authReducer from './slices/authAction';
import taskReducer from './slices/taskAction';
// ----------------------------------------------------------------------


const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
};
const taskPersistConfig = {
    key: 'tasks',
    storage,
    keyPrefix: 'redux-',
  };

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  task: persistReducer(taskPersistConfig, taskReducer),
});
