import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Navbar, Button, Classes, NavbarGroup} from '@blueprintjs/core';

import './Header.sass';

export default class Header extends Component {
  render() {
    return(
      <Navbar>
        <NavbarGroup>
          <Link to="/" className="nav__link">
            <Button className={Classes.MINIMAL} icon="properties" text="Задачи" />
          </Link>
          <Link to="/contacts" className="nav__link">
            <Button className={Classes.MINIMAL} icon="link" text="Контакты" />
          </Link>
        </NavbarGroup>
      </Navbar>
      // <Menu
      //   mode="horizontal"
      // >
      //   <Menu.Item>
      //     <Link to="/">
      //       <Icon type="bars" /> Задачи
      //     </Link>
      //   </Menu.Item>

      //   <Menu.Item>
      //     <Link to="/profile">
      //       <Icon type="user" /> Профиль
      //     </Link>
      //   </Menu.Item>
      // </Menu>
    );
  }
}