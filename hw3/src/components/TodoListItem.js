import React from 'react';
import x from './../reference/img/x.png';
import './../reference/styles.css';

export default ({ todo, dispatch }) => {
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type='checkbox'
                    id={todo.id}
                    onClick={() =>
                        dispatch({
                            type: 'TOGGLE_TODO',
                            id: todo.id
                        })
                    }
                    defaultChecked={todo.completed}
                ></input>
                <label htmlFor={todo.id}></label>
            </div>
            <h1 className="todo-app__item-detail"
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.5 : 1
                }}
            >
                {todo.text}
            </h1>
            <img
                alt=""
                src={x}
                className="todo-app__item-x"
                onClick={() =>
                    dispatch({
                        type: 'DELETE_TODO',
                        id: todo.id
                    })
                }
            >
            </img>
        </li>
    );
}