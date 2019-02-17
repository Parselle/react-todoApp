import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from '../../../utils/compose';
import PropTypes from 'prop-types';
import withApiService from '../../hoc/withApiService';
import {fetchAddTask} from '../../../actions';
import {Button, Dialog, Classes, FormGroup, InputGroup} from '@blueprintjs/core'

class TodoAddTask extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchAddTask: PropTypes.func.isRequired
  };

  state = {
    isOpen: false,
    formValues: {
      title: '',
      desc: ''
    }
  }

  handleInputChange = (e) => {
    const name = e.target.getAttribute('id');
    const value = e.target.value;
    this.setState((state) => {
      return {
        formValues: {
          ...state.formValues,
          [name]: value
        }
      };
    });
  }

  handleOpen = () => {
    this.setState({isOpen: true});
  }

  handleClose = () => {
    this.setState({isOpen: false});
  }

  handleAdd = () => {
    const {tasks, fetchAddTask} = this.props;
    const {title, desc} = this.state.formValues;
    fetchAddTask(tasks, title, desc);
    this.handleClose();
  }

  render() {
    const {formValues} = this.state;
    const {title, desc} = this.state.formValues;

    let correctValues = true;

    for(const key in formValues) {
      if(formValues[key].length < 1) {
        correctValues = false;
        break;
      }
    }

    return(
      <React.Fragment>
        <Button
          icon="plus"
          className={Classes.INTENT_PRIMARY}
          onClick={this.handleOpen}
        />
        <Dialog
          className="bp3-dark"
          icon="info-sign"
          onClose={this.handleClose}
          title="Добавление задачи"
          isOpen={this.state.isOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            <FormGroup
              label="Название"
              labelFor="title"
              labelInfo="*"
            >
              <InputGroup
                id="title"
                value={title}
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup
              label="Описание"
              labelFor="desc"
              labelInfo="*"
            >
              <InputGroup
                id="desc"
                value={desc}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleClose}>Отмена</Button>
              <Button
                className={Classes.INTENT_PRIMARY}
                onClick={this.handleAdd}
                disabled={correctValues ? false : true}
              >Добавить
              </Button>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({tasks}) => {
  return{tasks};
}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    fetchAddTask: (tasks, title, desc) => dispatch(fetchAddTask(apiService, dispatch, tasks, title, desc))
  };
}

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoAddTask);