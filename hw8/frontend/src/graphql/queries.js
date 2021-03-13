import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
    query getUserMessage($username: String!) {
        getUserMessage(username: $username) {
            id
            sender
            receiver
            body
        }
    }
`;