import React from 'react';
import TodoSearch from './TodoSearch/TodoSearch';
import TodoFilterTasks from './TodoFilterTasks/TodoFilterTasks';
import TodoAddTask from './TodoAddTask/TodoAddTask';

import './TodoActionPanel.sass';

const TodoActionPanel = () => {
  return(
    <div className="todo__actionPanel">
      <TodoSearch/>
      <TodoFilterTasks/>
      <TodoAddTask/>
    </div>
  );
}

export default TodoActionPanel;
