import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
    MESSAGES_QUERY,
    SEND_MESSAGE_MUTATION,
    DELETE_MESSAGE_MUTATION,
    MESSAGES_SUBSCRIPTION
} from './../graphql/index';
import 'semantic-ui-css/semantic.min.css';
import './../App.css'
import Message from './../components/Message';
import { Input } from 'antd'
import { Link } from 'react-router-dom';
import { Modal, Label, Button, Segment } from 'semantic-ui-react';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ currentUser }) => {
    const [receiver, setReceiver] = useState('');
    const [msgBody, setMsgBody] = useState('');

    const bodyRef = useRef(null);

    const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY, { variables: { username: currentUser } });
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
    const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION);

    useEffect(() => {
        subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log({ prev: prev, subscriptionData: subscriptionData });
                if (!subscriptionData.data.updateMessage) return prev;
                const type = subscriptionData.data.updateMessage.type;
                if (type === 'DELETED') {
                    console.log({ prev: prev, subscriptionData: subscriptionData });
                    return { ...prev, getUserMessage: [] };
                }
                else {
                    console.log('UPDATED');
                    const newMessage = subscriptionData.data.updateMessage.info[0];
                    console.log(newMessage);
                    console.log({ c: currentUser, s: newMessage.sender, r: newMessage.receiver })
                    if (currentUser === newMessage.sender || currentUser === newMessage.receiver) {
                        console.log({ pass: newMessage });
                        return { ...prev, getUserMessage: [...prev.getUserMessage, newMessage] };
                    }
                    return prev;
                }
            }
        })
    }, [subscribeToMore, currentUser])

    const onClick = () => {
        deleteMessage({
            variables: { username: currentUser }
        })
    };
    const handleMsgInput = () => {
        if (!currentUser || !receiver || !msgBody) {
            alert('Check your input');
            return;
        }
        else if (currentUser === receiver) {
            alert('Do not send message to yourself.');
            return;
        }
        sendMessage({
            variables: {
                sender: currentUser,
                receiver: receiver,
                body: msgBody
            }
        });
        setMsgBody('');
    };

    return (
        <div className="App">
            <Modal
                open={currentUser === ''}
                size='tiny'
                dimmer='blurring'
            >
                <Modal.Header> Who Are You?? </Modal.Header>
                <Modal.Content>
                    Please enter the username again!!
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Back to Home"
                        type="primary"
                        color='teal'
                        as={Link}
                        to='/'
                    />
                </Modal.Actions>
            </Modal>
            <div className="App-title">
                <h1>Simple Chat</h1>
                <Button.Group style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        color='red'
                        onClick={onClick}
                        size='tiny'
                    >
                        Clear
                    </Button>
                    <Button
                        content="Change User"
                        type="primary"
                        color='teal'
                        as={Link}
                        to='/'
                        size='tiny'
                    />
                </Button.Group>
            </div>
            {/* <div className='App-messages'> */}
            <Segment.Group as='div' className="App-messages" >
                <Label
                    attached='top right'
                    // ribbon='right'
                    content={currentUser}
                    icon='user circle'
                    size='large'
                    className='ui sticky'
                />
                {loading ? (
                    <p style={{ color: '#ccc' }}>
                        Loading...
                    </p>
                ) : error ? (
                    <p> ERROR!!! </p>
                ) : (data.getUserMessage.length === 0 ? (
                    <p style={{ color: '#ccc' }}>
                        No messages...
                    </p>
                ) : (
                        data.getUserMessage.map(({ body, id, receiver, sender }, i) => (
                            <Message key={id} username={sender} body={body} isUser={sender === currentUser} receiver={receiver} />
                        ))
                    ))}
            </Segment.Group>
            {/* </div> */}
            <Input
                placeholder="Send message to ..."
                style={{ marginBottom: 10 }}
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') bodyRef.current.focus();
                }}
            ></Input>
            <Input.Search
                rows={4}
                enterButton="Send"
                placeholder="Type a message here..."
                value={msgBody}
                ref={bodyRef}
                onChange={(e) => setMsgBody(e.target.value)}
                onSearch={handleMsgInput}
            ></Input.Search>
        </div>
    );
}