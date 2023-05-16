import { app } from "./app";
import {tasks} from './tasks'

export const reducers = {
    app: app.reducer,
    tasks: tasks.reducer
}

export const actions = {
    app: app.actions,
    tasks: tasks.actions
}

export const reducerPersistWhiteList = [
    'app'
];

export const reducerPersistBlackList = [
    'tasks'
];

export { app, tasks }