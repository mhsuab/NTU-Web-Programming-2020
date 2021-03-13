import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage(
        $sender: String!
        $receiver: String!
        $body: String!
    ) {
        sendMessage(
            message : {
                sender: $sender
                receiver: $receiver
                body: $body
            }
        ) {
            id
            sender
            receiver
            body
        }
    }
`;

export const DELETE_MESSAGE_MUTATION = gql`
    mutation deleteMessage( $username: String! ) {
        deleteMessage( username: $username )
    }
`;