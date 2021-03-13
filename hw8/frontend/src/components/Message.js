import React from 'react';
import { Tag } from 'antd';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ username, body, isUser, receiver }) => {
    return (
        <React.Fragment>
            { isUser ? (
                <p className="App-message" style={{ textAlign: 'right'}} >
                    <Tag color="green"> { receiver } </Tag> { body }
                </p>
            ) : (
                <p className="App-message" style={{ textAlign: 'left' }} >
                    <Tag color="blue"> { username } </Tag> { body }
                </p>
            )}
        </React.Fragment>
    );
}