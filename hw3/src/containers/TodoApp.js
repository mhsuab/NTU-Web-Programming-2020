import React, { useState, useReducer } from 'react';
import './../reference/styles.css';
import TodoListItem from '../components/TodoListItem';
import Footer from './../components/Footer';

let nextTodoId = 0;

const TodoApp = () => {
    const [visibility, setVisibility] = useState("SHOW_ALL");
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'ADD_TODO':
                    return [
                        ...state,
                        {
                            id: action.id,
                            text: action.text,
                            completed: false
                        }
                    ];
                case 'TOGGLE_TODO':
                    return state.map(todo => 
                        (todo.id !== action.id) ? todo : {
                            ...todo,
                            completed: !todo.completed
                        }
                    );
                case 'DELETE_TODO':
                    return state.filter(todo => todo.id !== action.id);
                case 'CLEAN_TODO':
                    return state.filter(todo => !todo.completed);
                default:
                    return state;
            }
        },
        []
    );

    function getVisibleTodos() {
        switch (visibility) {
            case "SHOW_COMPLETED":
                return state.filter(
                    todo => todo.completed
                );
            case "SHOW_ACTIVE":
                return state.filter(
                    todo => !todo.completed
                );
            case "SHOW_ALL":
            default:
                return state;
        }
    }

    return (
        <div className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <input
                    className="todo-app__input"
                    placeholder="What needs to be done?"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            const word = e.target.value.trim();
                            if (word !== "") {
                                e.target.value = "";
                                dispatch({
                                    type: 'ADD_TODO',
                                    id: nextTodoId++,
                                    text: word
                                })
                            }
                        }
                    }}
                />
            </section>
            <ul className="todo-app__list">
                {getVisibleTodos().map(todo =>
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        dispatch={dispatch}
                    />
                )}
            </ul>
            <Footer
                state={ state }
                dispatch = {dispatch}
                visibility = {visibility}
                setVisibility = {setVisibility}
            />
        </div>
    );
}

export default TodoApp;