import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import compose from '../../utils/compose';
import {fetchDeleteTask, fetchCompleteTask, fetchStartTask} from '../../actions';
import TodoListItem from '../TodoListItem/TodoListItem';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

import './TodoList.sass';
import withApiService from '../hoc/withApiService';

const TodoList = ({tasks, onCompleteTask, onDeleteTask, onStartTask, search, filter}) => {

  const filterItems = (items, filter) => {
    if (filter === 'ALL') {
      return items;
    } else if (filter === 'ACTIVE') {
      return items.filter((item) => (!item.completed));
    } else if (filter === 'COMPLETED') {
      return items.filter((item) => item.completed);
    }
  }

  const searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  const visibleItems = searchItems(filterItems(tasks, filter), search);

  if(visibleItems.length == 0) return (
    <ul className="todo__list">
      <span>
        Нет подходящих задач :(
      </span>
    </ul>
  );

  return(
    <ul className="todo__list">
      {
        visibleItems.map((task) => {
          return(
            <TodoListItem
              key={task.id}
              task={task}
              onCompleteTask={onCompleteTask}
              onDeleteTask={onDeleteTask}
              onStartTask={onStartTask}
            />
          );
        })
      }
    </ul>
  );
}

class TodoListContainer extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    onCompleteTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onStartTask: PropTypes.func.isRequired
  }

  render() {
    const {tasks, loading, error, search, filter, onCompleteTask, onDeleteTask, onStartTask} = this.props;

    if(error) return (
      <div className="todo__list">
        <ErrorIndicator />
      </div>
    );

    // if(loading && !tasks) return (
    //   <div className="todo__list">
    //     <Skeleton active/>
    //   </div>
    // );

    // if(loading && tasks) return (
    //   <Spin>
    //     <TodoList
    //       tasks={tasks}
    //       onCompleteTask={onCompleteTask}
    //       onDeleteTask={onDeleteTask}
    //       onStartTask={onStartTask}
    //       search={search}
    //       filter={filter}
    //     />
    //   </Spin>
    // );

    return(
      <TodoList
        tasks={tasks}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask}
        onStartTask={onStartTask}
        search={search}
        filter={filter}
      />
    );
  }
}

const mapStatetoProps = ({tasks, loading, error, search, filter}) => {
  return{tasks, loading, error, search, filter};
}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    onCompleteTask: (task) => dispatch(fetchCompleteTask(apiService, dispatch, task)),
    onDeleteTask: (id) => dispatch(fetchDeleteTask(apiService, dispatch, id)),
    onStartTask: (task) => dispatch(fetchStartTask(apiService, dispatch, task))
  };
}

export default compose(
  withApiService(),
  connect(mapStatetoProps, mapDispatchToProps)
)(TodoListContainer);