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
import {Cancel, CheckCircle} from '@material-ui/icons';
import {makeStyles, createStyles} from '@material-ui/styles';
import moment from 'moment';

const useDashBoardStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
        mainBar: {
            marginBottom: theme.spacing(2),
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
            '& a': {
                width: '30%',
                margin: theme.spacing(1.5),
            },
        },
        card: {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            width: '100%',
            height: 180,
            '& span.MuiCardHeader-title': {
                textAlign: 'center',
            },
            '& div.MuiCardHeader-root': {
                background: theme.palette.primary.main,
                color: '#FFFFFF'
            },
            '& span.MuiCardHeader-subheader': {
                float: 'right',
            }
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'row-reverse',
            height: 'auto',
            textAlign: 'center',
            '& div.card-item': {
                height: '100%',
                width: '100%',
            },
        },
        completeStatus: {
            display: 'flex',
            justifyContent: 'center',
            '& svg': {
                alignSelf: 'center',
                marginLeft: theme.spacing(1)
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
                    <Link key={i} to={`/task/detail/${t.id}`} component={RouterLink}>
                        <Card className={classes.card}>
                            <CardHeader title={t.title} />
                            <CardContent>
                                <section className={classes.cardContent}>
                                    <div className="card-item">
                                        <Typography variant="subtitle1">
                                            Assigned to: {t.assignedTo.username}
                                        </Typography>
                                        <Typography variant="subtitle1" className={classes.completeStatus}>
                                            Completed: {t.completed ? <CheckCircle color="primary"/> : <Cancel color="secondary"/>}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Created: {moment(t.createdOn, 'YYYYMMDD').fromNow()}
                                        </Typography>
                                    </div>
                                </section>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        );

        const assignedTaskContent = (
            <div className={classes.cardContainer}>
                {currentUser.assignedTasks.map((t, i) => (
                    <Link key={i} to={`/task/detail/${t.id}`} component={RouterLink}>
                        <Card className={classes.card}>
                            <CardHeader title={t.title} />
                            <CardContent>
                                <section className={classes.cardContent}>
                                    <div className="card-item">
                                        <Typography variant="subtitle1">Created by: {t.createdBy.username}</Typography>
                                        <Typography variant="subtitle1" className={classes.completeStatus}>
                                            Completed: {t.completed ? <CheckCircle color="primary"/> : <Cancel color="secondary"/>}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Created: {moment(t.createdOn, 'YYYYMMDD').fromNow()}
                                        </Typography>
                                    </div>
                                </section>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        );

        return (
            <Container maxWidth={false} className={classes.root}>
                <AppBar color="primary" position="static" className={classes.mainBar}>
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
