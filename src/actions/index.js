import * as types from '../constants/ActionTypes';

export const fetchTasks = (apiService, dispatch) => () => {
  dispatch(fetchServerRequest());
  apiService.getTasks()
    .then((data) => dispatch(fetchServerSuccess(data)))
    .catch((err) => dispatch(fetchServerFailure(err)));
};

export const fetchServerFailure = err => ({
  type: types.FETCH_SERVER_FAILURE,
  payload: err
});
export const fetchServerRequest = () => ({
  type: types.FETCH_SERVER_REQUEST
});
export const fetchServerSuccess = data => ({
  type: types.FETCH_SERVER_SUCCESS,
  payload: data
});

export const fetchAddTask = (apiService, dispatch, tasks, title, desc) => () => {
  const id = tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1) +1;
  const task = {
    id,
    title,
    desc,
    completed: false
  };

  dispatch(addTask(task.id, task.title, task.desc))
  
  dispatch(fetchServerRequest());

  apiService.addTask(task)
    // .then(() => dispatch(addTask(task.id, task.title, task.desc)))
    .catch((err) => dispatch(fetchServerFailure(err)));
};
const addTask = (id, title, desc) => ({
  type: types.ADD_TASK,
  id,
  title, 
  desc
});

export const fetchDeleteTask = (apiService, dispatch, id) => () => {
  dispatch(deleteTask(id));
  dispatch(fetchServerRequest());
  apiService.deleteTask(id)
    // .then(() => dispatch(deleteTask(id)))
    .catch((err) => dispatch(fetchServerFailure(err)));
};
const deleteTask = (id) => ({
  type: types.DELETE_TASK,
  id
});

export const fetchCompleteTask = (apiService, dispatch, task) => () => {
  dispatch(completeTask(task.id))
  dispatch(fetchServerRequest());
  apiService.updateTask(task.id, {...task, completed: true})
    // .then(() => dispatch(completeTask(task.id)))
    .catch((err) => dispatch(fetchServerFailure(err)));
};
const completeTask = (id) => ({
  type: types.COMPLETE_TASK,
  id
});

export const fetchStartTask = (apiService, dispatch, task) => () => {
  dispatch(startTask(task.id))
  dispatch(fetchServerRequest());
  apiService.updateTask(task.id, {...task, completed: false})
    // .then(() => dispatch(startTask(task.id)))
    .catch((err) => dispatch(fetchServerFailure(err)));
};
const startTask = (id) => ({
  type: types.START_TASK,
  id
});

export const searchTasks = (search) => ({
  type: types.SEARCH_TASKS,
  payload: search
});

export const filterTasks = (filter) => ({
  type: types.FILTER_TASKS,
  payload: filter
});