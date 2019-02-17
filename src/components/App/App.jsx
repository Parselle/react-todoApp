import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {TodoPage, ContactsPage} from '../pages'
import Header from '../Header/Header';

import './App.sass';

const App = () => {
  return(
    <div className="app bp3-dark">
      <Header />
      <Switch>
        <Route path="/" component={TodoPage} exact/>
        <Route path="/contacts" component={ContactsPage}/>

        <Route render={() => <h5>Страница не найдена!</h5>} />
      </Switch>
    </div>
  );
}

export default App;