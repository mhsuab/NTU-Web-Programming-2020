import React from 'react';

export default ({ state, dispatch, visibility, setVisibility }) => {
    return (
        !state.length ? null : (
            <footer className='todo-app__footer' id='todo-footer'>
                <div className='todo-app__total'>
                    {state.filter(t => !t.completed).length} left
                </div>
                <ul className='todo-app__view-buttons'>
                    <button
                        onClick={() => setVisibility('SHOW_ALL')}
                        disabled={visibility === 'SHOW_ALL'}
                    > ALL </button>
                    <button
                        onClick={() => setVisibility('SHOW_ACTIVE')}
                        disabled={visibility === 'SHOW_ACTIVE'}
                    > Active </button>
                    <button
                        onClick={() => setVisibility('SHOW_COMPLETED')}
                        disabled={visibility === 'SHOW_COMPLETED'}
                    > Completed </button>
                </ul>
                <div className='todo-app__clean'>
                    <button
                        onClick={() => {
                            dispatch({ type: 'CLEAN_TODO'})
                        }}
                        disabled={!state.some(t => t.completed)}
                    > Clear completed </button>
                </div>
            </footer>
        )           
    );
};