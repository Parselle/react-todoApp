import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import './TodoHeader.sass';

const TodoHeader = ({tasks}) => {

  const completed = tasks.filter((task) => task.completed == true).length;

  return(
    <header className='todo__header'>
      <div className="header__content">
        <h6 className='header__title'>
          Задачи
        </h6>
        <p className="header__progress">Выполнено {completed}/{tasks.length}</p>
      </div>
    </header>
  );
}

class TodoHeaderContainer extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  render() {
    const {tasks, loading, error} = this.props;

    if(error) return(
      <div className="todo__header">
        <ErrorIndicator />
      </div>
    );

    return(
      <TodoHeader tasks={tasks}/>
    );
  }
}

const mapStateToProps = ({tasks, loading, error}) => {
  return {tasks, loading, error};
};

export default connect(mapStateToProps)(TodoHeaderContainer);