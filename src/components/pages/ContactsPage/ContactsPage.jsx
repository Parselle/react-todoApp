import React, {Component} from 'react';
import {Button} from '@blueprintjs/core';
import './ContactsPage.sass';

export default class ContactsPage extends Component {
  render() {
    return(
      <div className="app__contacts">
        <p className="contacts__text">Приложение использует:<br></br> React + React Router + Redux</p>
        <p className="contacts__text">
          UI компоненты от <a href="https://blueprintjs.com" target="_blank">Blueprint</a>
        </p>
        <p className="contacts__text">
          API сервер от <a href="https://www.mockapi.io" target="_blank">mockAPI</a>
        </p>

        <div className="contacts__links">
          <a href="https://github.com/Parselle/react-todoApp" target="_blank">
            <Button icon="link">Github</Button>
          </a>
          <a href="mailto:parselledev@gmail.com">
            <Button icon="link">parselledev@gmail.com</Button>
          </a>
        </div>
      </div>
    );
  }
}