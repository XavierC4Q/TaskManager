import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {IUser} from '../types';
import {RouteComponentProps} from 'react-router';
import {AuthContext} from '../context/AuthContext';

interface IProfileQueryData {
    singleUser: IUser | null;
}

interface IProfileQueryVars {
    id: string;
}

const PROFILE_QUERY = gql`
    query userQuery($id: ID!) {
        singleUser(userId: $id) {
            id
            email
            username
            createdTasks {
                id
                title
                description
                assignedTo {
                    id
                    username
                }
                createdOn
                modified
            }
            assignedTasks {
                id
                title
                description
                createdBy {
                    id
                    username
                }
                createdOn
                modified
            }
        }
    }
`;

interface IOwnProps extends RouteComponentProps<{userId: string}> {}

const Profile: React.FC<IOwnProps> = ({history, match: {params}}) => {
    const {data: profileData, loading, error} = useQuery<IProfileQueryData, IProfileQueryVars>(PROFILE_QUERY, {
        variables: {id: params.userId},
    });
    const {currentUser} = React.useContext(AuthContext);

    if (error) {
        return <div>An Error Occurkript</div>;
    }
    if (!loading && !profileData) {
        return <div>User is not real</div>;
    }
    if (profileData) {
        console.log(profileData);
        return <h2>Profile</h2>;
    }
    return <div>Loading</div>;
};

export default Profile;
