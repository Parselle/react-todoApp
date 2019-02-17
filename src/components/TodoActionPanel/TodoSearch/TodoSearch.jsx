import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {InputGroup} from '@blueprintjs/core'
import {searchTasks} from '../../../actions';
import './TodoSearch.sass';

const TodoSearch = ({search, onSearchChange}) => {
  return(
    <div className="todo__search">
      <InputGroup
        leftIcon="search"
        value={search}
        onChange={onSearchChange}
        placeholder="Поиск..."
      />
      </div>
  );
}

class TodoSearchContainer extends Component {

  static propTypes = {
    search: PropTypes.string.isRequired,
    searchTasks: PropTypes.func.isRequired
  };

  state = {
    search: ''
  }

  componentDidMount = () => {
    const {search} = this.props;
    this.setState({search})
  }

  onSearchChange = (e) => {
    const search = e.target.value;
    this.setState({search});
    this.props.searchTasks(search);
  }

  render() {
    const {search} = this.props;
    
    return(
      <TodoSearch
        search={search}
        onSearchChange={this.onSearchChange}
      />
    );
  }
}

const mapStateToProps = ({search}) => {
  return {search};
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchTasks: (search) => dispatch(searchTasks(search))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoSearchContainer);