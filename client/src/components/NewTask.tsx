import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Input from './Input';
import {Container, Typography, Button, Theme} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {createStyles, makeStyles} from '@material-ui/styles';
import {TPriority, IUser, ITask} from '../types/index';

const validate = Yup.object().shape({
    title: Yup.string().min(6, 'Title is too short').max(100, 'Title is too long').required(),
    description: Yup.string().min(10, 'Description is too short').max(300, 'Description is too long').required(),
    priority: Yup.mixed<TPriority>().oneOf(['HIGH', 'MEDIUM', 'LOW']),
});

interface IAllUsersData {
    allUsers: Pick<IUser, 'id' | 'username'>[] | null;
}

const ALL_USERS = gql`
    query allUsersQuery {
        allUsers {
            id
            username
        }
    }
`;

interface ICreateTaskData {
    newTask: Pick<ITask, 'id' | 'title'> | null;
}

interface ICreateTaskVars extends Pick<ITask, 'title' | 'description' | 'priority'> {
    assignedTo: number;
}

const CREATE_TASK = gql`
    mutation createTaskMutation(
        $title: String!
        $description: String!
        $priority: TaskPriorityEnum!
        $assignedTo: ID!
    ) {
        createTask(title: $title, description: $description, priority: $priority, assignedTo: $assignedTo) {
            id
            title
        }
    }
`;

interface IInitialValues extends Omit<Yup.InferType<typeof validate>, 'priority'> {
    assignedTo: number | null;
    priority: string | TPriority;
}

const INITIAL_VALUES: IInitialValues = {
    title: '',
    description: '',
    priority: '',
    assignedTo: null,
};

const NewTask: React.FC = () => {
    const {data, loading: usersLoading, error: usersError} = useQuery<IAllUsersData>(ALL_USERS);
    const [createTask, {error: taskError}] = useMutation<ICreateTaskData, ICreateTaskVars>(CREATE_TASK);

    const classes = useNewTaskStyles();

    return (
        <React.Fragment>
            <Container maxWidth={false} className={classes.root}>
                <Typography variant="h2" className={classes.title}>
                    Create a New Task
                </Typography>
                <Formik
                    initialValues={{...INITIAL_VALUES}}
                    validationSchema={validate}
                    enableReinitialize
                    onSubmit={() => {}}
                    render={({values, errors: formErrors}) => (
                        <Form className={classes.form}>
                            <Input label="Enter Task Title" value={values.title} id="title" />
                            <Input label="Enter Task Description" value={values.description} id="description" />
                            <Input label="Task Priority" value={values.priority} id="priority" />
                            <div>
                                <Button>Submit</Button>
                            </div>
                        </Form>
                    )}
                />
            </Container>
        </React.Fragment>
    );
};

const useNewTaskStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
            width: '55%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
        title: {
            height: '10%',
            maxHeight: 250,
            width: '100%',
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignContent: 'center',
            alignItems: 'center',
        },
    }),
);

export default NewTask;
