import { gql } from 'apollo-server-express';

export default gql`

    type Error {
        # the path is what's wrong
        path: String!
        message: String
    }

`;
