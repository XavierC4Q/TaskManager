import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography, Theme, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ITask } from '../types/index';
import Message from './Message';


interface ITaskDetailProps extends RouteComponentProps<{taskId: string}> {}

interface ITaskData {
    singleTask: null | ITask;
}

interface ITaskDetailVars {
    taskId: string;
}

const TASK_DETAIL_QUERY = gql`
    query taskDetail($taskId: string!) {
        singleTask(taskId: $taskId) {
            id
            title
            description
            createdBy {
                id
            }
            assignedTo {
                id
            }
            createdOn
            modified
            priority
            completed
        }
    }
`;

const useTaskDetailStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        width: '100%',
        height: '100%'
    }
}));


const TaskDetail: React.FC<ITaskDetailProps> = ({history, match: {params}}) => {
    const {currentUser} = React.useContext(AuthContext);
    const {data, loading, error: taskDetailError} = useQuery<ITaskData, ITaskDetailVars>(TASK_DETAIL_QUERY, {variables: {taskId: params.taskId}});
    const task = data && data.singleTask;
    const classes = useTaskDetailStyles();

    return (
        <Container maxWidth={false}>
            {taskDetailError && <Message header="Task Error" messageType="error" message="500 error" />}
            {loading && <div>loading task</div>}
            {!loading && !task && <Message header="Task Error" messageType="error" message={`Task ${params.taskId} does not exist`} />}
            {task && (
                <Paper className={classes.paper}>
                    <Typography variant="h3">{task.title}</Typography>
                    <Typography variant="body1">{task.description}</Typography>
                </Paper>
            )}
        </Container>
    );
};

export default TaskDetail;