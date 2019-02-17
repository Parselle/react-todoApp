import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filterTasks} from '../../../actions';
import {Button, Menu, Popover, Position, Classes} from '@blueprintjs/core';

const TodoFilterTasks = ({filter, filterTasks}) => {

  const menuItems = {
    'ALL': 'Все',
    'ACTIVE': 'Активные',
    'COMPLETED': 'Завершённые'
  };

  const menu = (
    <Menu>
      {
        Object.keys(menuItems).map((key, index) => {
          const disabled = key == filter ? true : false;
          return(
            <Menu.Item
              key={key}
              disabled={disabled}
              onClick={() => filterTasks(key)}
              text={menuItems[key]}
            />
          );
        })
      }
    </Menu>
  );

  return(
    <Popover content={menu} position={Position.LEFT_BOTTOM}>
      <Button icon="filter"/>
    </Popover>
  );
}

class TodoFilterTasksContainer extends Component {

  static propTypes = {
    filter: PropTypes.string.isRequired,
    filterTasks: PropTypes.func.isRequired
  };

  render() {

    const {filter, filterTasks} = this.props;

    return(
      <TodoFilterTasks
        filter={filter}
        filterTasks={filterTasks}
      />
    );
  }
}

const mapStateToProps = ({filter}) => {
  return{filter}
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterTasks: (filter) => dispatch(filterTasks(filter))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilterTasksContainer);