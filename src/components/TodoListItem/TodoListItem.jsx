import React from 'react';
import {Button, Menu, MenuDivider, Popover, Position, Classes} from '@blueprintjs/core';
import './TodoListItem.sass';

const TodoListItem = ({task, onCompleteTask, onDeleteTask, onStartTask}) => {

  const {title, desc, id, completed} = task;

  const menu = (
    <Menu>
      {
        completed ?
          <Menu.Item
            key="1"
            icon="play"
            text="Начать"
            onClick={()=>onStartTask(task)}
          />
          :
          <Menu.Item
            key="1"
            icon="small-tick"
            text="Завершить"
            onClick={()=>onCompleteTask(task)}
          />
      }
      <MenuDivider />
      <Menu.Item
        key="2"
        icon="trash"
        text="Удалить"
        className="bp3-intent-danger"
        onClick={()=>onDeleteTask(id)}
      />
    </Menu>
  );

  return(
    <li className={completed ? "list__item completed" : "list__item"}>
      <div className="list__content">
        <p className="list__title">{title}</p>
        <p className="list__desc">- {desc}</p>
      </div>

      <div className="list__control">
        <Popover content={menu} position={Position.LEFT_BOTTOM}>
          <Button icon="cog" className={Classes.MINIMAL}/>
        </Popover>
      </div> 
    </li>
  );
}

export default TodoListItem;