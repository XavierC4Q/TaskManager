import React from 'react';
import {withApollo, WithApolloClient} from 'react-apollo';
import {RouteComponentProps} from 'react-router-dom';
import * as Yup from 'yup';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Form, Formik} from 'formik';
import Input from './Input';
import {IUser} from '../types/index';
import {useFormStyles} from '../styles/formStyles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const validate = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Username must be at least 6 characters')
        .max(21, 'Username cannot be longer than 21 characters')
        .required('Username is Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(21, 'Password cannot be longer than 21 characters')
        .required(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    email: Yup.string().email('Email address is not valid'),
});

interface ISignupMutation {
    signup: {newUser: IUser | null};
}

const SIGNUP_USER = gql`
    mutation signupUser($username: String!, $password: String!, $email: String!) {
        signup(username: $username, password: $password, email: $email) {
            newUser {
                id
                email
                username
            }
        }
    }
`;

interface ISignupFields {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

const INITIAL_VALUES: ISignupFields = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
};

interface IOwnProps extends RouteComponentProps {}

const Signup: React.FC<WithApolloClient<IOwnProps>> = ({client, history, ...props}) => {
    const classes = useFormStyles({});
    const [signupUser] = useMutation<ISignupMutation, Omit<ISignupFields, 'confirmPassword'>>(SIGNUP_USER);

    return (
        <React.Fragment>
            <Container className={classes.formContainer}>
                <Formik
                    validationSchema={validate}
                    initialValues={{...INITIAL_VALUES}}
                    enableReinitialize
                    onSubmit={async (vals, actions) => {
                        const {username, password, email} = vals;
                        const {data} = await signupUser({
                            variables: {
                                username,
                                password,
                                email,
                            },
                        });

                        if (data && data.signup) {
                            const {data: loginData} = await client.mutate<{getToken: {token: string}}>({
                                variables: {
                                    username,
                                    password,
                                },
                                mutation: gql`
                                    mutation($username: String!, $password: String!) {
                                        getToken(username: $username, password: $password) {
                                            token
                                        }
                                    }
                                `,
                            });

                            if (loginData && loginData.getToken) {
                                localStorage.setItem('TOKEN', loginData.getToken.token);
                                history.push('/');
                            }
                        } else {
                            actions.resetForm();
                            actions.setError('Failed to create profile');
                        }
                    }}
                    render={({values: vals, errors: fieldErrors, error}) => (
                        <Form className={classes.form} autoComplete="off">
                            <Input id="username" label="Enter Username" value={vals.username} />

                            <Input id="password" label="Enter Password" value={vals.password} />

                            <Input id="confirmPassword" label="Confirm Password" value={vals.confirmPassword} />

                            <Input id="email" label="Enter Email" value={vals.email} />

                            {error && <Box component="div">{error}</Box>}
                            <Box component="div">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                />
            </Container>
        </React.Fragment>
    );
};

export default withApollo<IOwnProps>(Signup);
