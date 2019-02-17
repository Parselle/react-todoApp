import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import compose from '../../utils/compose';
import withApiService from '../hoc/withApiService';
import {fetchTasks} from '../../actions';

import TodoHeader from '../TodoHeader/TodoHeader';
import TodoActionPanel from '../TodoActionPanel/TodoActionPanel';
import TodoList from '../TodoList/TodoList';

class TodoPageContainer extends Component {

  static propTypes = {
    tasks: PropTypes.array,
    fetchTasks: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {

    const {loading, tasks} = this.props;

    return (
      loading && !tasks ?
        <div className="app__content">
          <Spinner />
        </div>
        :
        <Fragment>
          <TodoHeader />
          <TodoActionPanel />
          <TodoList />
        </Fragment>
    );
  }
}

const mapStateToProps = ({loading, tasks}) => {
  return {loading, tasks};
};

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    fetchTasks: fetchTasks(apiService, dispatch)
  }
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoPageContainer);