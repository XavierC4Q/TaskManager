import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {
    Container,
    Typography,
    Card,
    Link,
    Tabs,
    Tab,
    AppBar,
    Theme,
    CardContent,
    CardActions,
    CardHeader,
} from '@material-ui/core';
import {makeStyles, createStyles} from '@material-ui/styles';
import moment from 'moment';

const useDashBoardStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%'
        },
        mainBar: {
            background: '#04963e',
            marginBottom: theme.spacing(2)
        },
        tab: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        cardContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        card: {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            width: '49%',
            height: 210,
            '& span.MuiCardHeader-title': {
                textAlign: 'center'
            },
            '& span.MuiCardHeader-subheader': {
                float: 'right'
            }
        }
    }),
);

const DashBoard = () => {
    const {currentUser} = React.useContext(AuthContext);
    const [tabVal, setTabVal] = React.useState(0);
    const classes = useDashBoardStyles();

    const handleTabChange = (e: React.ChangeEvent<{}>, val: number) => setTabVal(val);

    if (currentUser) {
        const createdTaskContent = (
            <div className={classes.cardContainer}>
                {currentUser.createdTasks.map((t, i) => (
                    <Card key={i} className={classes.card}>
                        <CardHeader title={t.title} subheader={`Status: ${t.completed ? 'Finished' : 'In Progress'}`} />

                        <CardContent>
                            <Typography variant="subtitle1">Assigned to: {t.assignedTo.username}</Typography>
                            <Typography variant="body1">{t.description}</Typography>
                            {moment(t.createdOn, 'YYYYMMDD').fromNow()}
                        </CardContent>
                    </Card>
                ))}
            </div>
        );

        const assignedTaskContent = (
            <div className={classes.cardContainer}>
                {currentUser.assignedTasks.map((t, i) => (
                    <Card key={i} className={classes.card}>
                        <CardHeader title={t.title} subheader={`Status: ${t.completed ? 'Finished' : 'In Progress'}`} />

                        <CardContent>
                            <Typography variant="subtitle1">Created by: {t.createdBy.username}</Typography>
                            <Typography variant="body1">{t.description}</Typography>
                            {moment(t.createdOn, 'YYYYMMDD').fromNow()}
                        </CardContent>
                    </Card>
                ))}
            </div>
        );

        return (
            <Container maxWidth={false} className={classes.root}>
                <AppBar position="static" className={classes.mainBar}>
                    <Tabs
                        value={tabVal}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        centered
                    >
                        <Tab className={classes.tab} label="Your Tasks" />
                        <Tab className={classes.tab} label="Assigned Tasks" />
                    </Tabs>
                </AppBar>
                {tabVal === 0 && createdTaskContent}
                {tabVal === 1 && assignedTaskContent}
            </Container>
        );
    }
    return <div>loading feed</div>;
};

export default DashBoard;
