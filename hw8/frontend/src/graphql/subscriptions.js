import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
    subscription {
        updateMessage {
            type
            info {
                id
                sender
                receiver
                body
            }
        }
    }
`;