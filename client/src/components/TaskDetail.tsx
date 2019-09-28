import React from 'react';
import Container from '@material-ui/core/Container';
import {Typography, Theme, Paper} from '@material-ui/core';
import {makeStyles, createStyles} from '@material-ui/styles';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {RouteComponentProps} from 'react-router';
import {AuthContext} from '../context/AuthContext';
import {ITask} from '../types/index';
import Message from './Message';
import {Cancel, CheckCircle} from '@material-ui/icons';
import moment from 'moment';

interface ITaskDetailProps extends RouteComponentProps<{taskId: string}> {}

interface ITaskData {
    singleTask: null | ITask;
}

interface ITaskDetailVars {
    taskId: string;
}

const TASK_DETAIL_QUERY = gql`
    query taskDetail($taskId: ID!) {
        singleTask(taskId: $taskId) {
            id
            title
            description
            createdBy {
                id
                username
            }
            assignedTo {
                id
                username
            }
            createdOn
            modified
            priority
            completed
        }
    }
`;

const useTaskDetailStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '100%',
            height: '100%',
        },
        title: {
            height: '10%',
            textAlign: 'center',
            background: theme.palette.primary.main,
            color: '#ffffff'
        },
        content: {
            display: 'flex',
            height: '90%',
            '& p': {
                height: 100,
                fontSize: '16px',
                lineHeight: '32px',
                overflow: 'scroll',
                margin: theme.spacing(1.5)

            },
            '& h6': {
                margin: theme.spacing(1.5)
            }
        },
        taskMeta: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '50%',
            borderRight: `2px solid ${theme.palette.secondary.main}`,
        },
    }),
);

const TaskDetail: React.FC<ITaskDetailProps> = ({history, match: {params}}) => {
    const {currentUser} = React.useContext(AuthContext);
    const {data, loading, error: taskDetailError} = useQuery<ITaskData, ITaskDetailVars>(TASK_DETAIL_QUERY, {
        variables: {taskId: params.taskId},
    });
    const task = data && data.singleTask;
    const classes = useTaskDetailStyles();

    return (
        <Container maxWidth={false}>
            {taskDetailError && <Message header="Task Error" messageType="error" message="500 error" />}
            {loading && <div>loading task</div>}
            {!loading &&
            !task && (
                <Message header="Task Error" messageType="error" message={`Task ${params.taskId} does not exist`} />
            )}
            {task && (
                <Paper className={classes.paper}>
                    <Typography variant="h3" className={classes.title}>
                        {task.title}
                    </Typography>
                    <div className={classes.content}>
                        <div className={classes.taskMeta}>
                            <Typography variant="body1">{task.description}</Typography>
                            <Typography variant="subtitle1">{`Assigned to ${task.assignedTo.username}`}</Typography>
                            <Typography variant="subtitle2">{`Created by ${task.createdBy.username}`}</Typography>
                            <Typography variant="subtitle2">{moment(task.createdOn, 'YYYYMMDD').fromNow()}</Typography>

                        </div>
                    </div>
                </Paper>
            )}
        </Container>
    );
};

export default TaskDetail;
