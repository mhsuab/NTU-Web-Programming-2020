import React, { useState } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ setSender }) => {
    const [username, setUsername] = useState('');

    return (
        <div className="App">
            <div className="App-title">
                <h1>Simple Chat</h1>
            </div>
            <Input
                type='text'
                placeholder='Who Are You?'
                action
                style={{ marginTop: 10 }}
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
            >
                <input />
                <Button
                    type='submit'
                    as={Link}
                    color='teal'
                    to='/chat'
                    disabled={ username==='' }
                    onClick={() => { setSender(username) }}
                >
                    Submit
                </Button>
            </Input>
        </div>
    );
}