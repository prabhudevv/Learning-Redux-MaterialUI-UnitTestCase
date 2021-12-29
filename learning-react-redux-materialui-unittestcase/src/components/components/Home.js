import { makeStyles } from '@mui/styles';
import { SPACING } from '../../constants/styleGuide';
import { PRIMARY_PURPLE } from '../../constants/colors';
import { PROJECT_TITLE } from '../../constants/constants';
import { useEffect } from 'react';
import { getService } from '../../axios/axios';
import { setUserData } from '../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles({
    projectTitle: {
        color: PRIMARY_PURPLE,
        fontSize: SPACING.s24
    },
});

const Home = () => {
    const rows = [];
    const classes = useStyles();
    const dispatch = useDispatch();

    const allUsers = useSelector(state => state.user.userData);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, sortable: true },
        { field: 'title', headerName: 'Title', width: 130, sortable: false },
        { field: 'author', headerName: 'Author', width: 130, sortable: false }
    ];

    allUsers.map((item, idx) => {
        rows.push({ "title": item.title, "author": item.author, "id": item.id });
    })

    useEffect(() => {
        getService('USER_SERVICE', '/users')
            .then((res) => {
                dispatch(setUserData(res.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setUserData(err));
            })
    }, [])
    return (
        <>
            <p className={classes.projectTitle}>
                {PROJECT_TITLE}
            </p>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                // checkboxSelection
                />
            </div>
        </>
    );
}

export default Home;