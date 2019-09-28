import React from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import Input from './Input';
import {Form, Formik} from 'formik';
import {useFormStyles} from '../styles/formStyles';
import {IUser} from '../types/index';
import {RouteComponentProps} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {Paper, Typography} from '@material-ui/core';

const validate = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        getToken(username: $username, password: $password) {
            token
            user {
                id
                username
                email
            }
        }
    }
`;

interface ILoginFields {
    username: string;
    password: string;
}

interface IGetToken {
    getToken: {
        token: string;
        user: null | IUser;
    };
}

interface IOwnProps extends RouteComponentProps {}

const INITIAL_VALUES: ILoginFields = {
    username: '',
    password: '',
};

const Login: React.FC<IOwnProps> = ({history}) => {
    const classes = useFormStyles();
    const [loginUser] = useMutation<IGetToken, ILoginFields>(LOGIN_USER);

    return (
        <React.Fragment>
            <Container className={classes.formContainer}>
                <Formik
                    validationSchema={validate}
                    initialValues={{...INITIAL_VALUES}}
                    enableReinitialize
                    onSubmit={async (vals, actions) => {
                        const {username, password} = vals;
                        const {data} = await loginUser({
                            variables: {
                                username,
                                password,
                            },
                        });
                        if (data && data.getToken) {
                            localStorage.setItem('TOKEN', data.getToken.token);
                            history.push('/');
                        } else {
                            actions.resetForm();
                            actions.setError('Wrong username/password');
                        }
                    }}
                    render={({values: vals, errors: fieldErrors, error}) => (
                        <Paper>
                            <Typography variant="h4" display="block" align="justify" style={{margin: '8px'}}>Welcome Back!</Typography>
                            <Form className={classes.form} autoComplete="off">
                                <Input id="username" label="Enter Username" value={vals.username} />

                                <Input id="password" label="Enter Password" value={vals.password} />

                                {error && <Box component="div">{error}</Box>}
                                <Box component="div">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Box>
                            </Form>
                        </Paper>
                    )}
                />
            </Container>
        </React.Fragment>
    );
};

export default Login;
