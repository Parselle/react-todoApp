import {
  ERROR,
  FETCH_SERVER_REQUEST,
  FETCH_SERVER_SUCCESS,
  FETCH_SERVER_FAILURE,
  ADD_TASK,
  DELETE_TASK,
  COMPLETE_TASK,
  START_TASK,
  FILTER_TASKS,
  SEARCH_TASKS
} from '../constants/ActionTypes';

const INITIAL_STATE = {
  tasks: [],
  filter: 'ALL',
  search: '',
  loading: false,
  error: null
};

const todoReducer = (state = INITIAL_STATE, action) => {

  console.log(action.type);

  switch(action.type) {
    case ERROR:
      return {
        ...state,
        tasks: [],
        loading: false,
        error: action.payload
      };

    case FETCH_SERVER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SERVER_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null
      };

    case FETCH_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.id,
            completed: false,
            title: action.title,
            desc: action.desc
          }
        ],
        loading: false,
        error: null
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
            task => task.id !== action.id
          ),
        loading: false,
        error: null
      };

    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
            task.id === action.id ?
              {...task,
                completed: true} :
              task
          ),
        loading: false,
        error: null
      };

    case START_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
            task.id === action.id ?
              {...task,
                completed: false} :
              task
          ),
        loading: false,
        error: null
      };

    case FILTER_TASKS:
      return {
        ...state,
        filter: action.payload
      };

    case SEARCH_TASKS:
      return {
        ...state,
        search: action.payload
      };

    default:
      return state;
  }
}

export default todoReducer;