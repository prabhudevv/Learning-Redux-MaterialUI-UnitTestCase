import './App.css';
import { makeStyles } from '@mui/styles';
import { SPACING } from './constants/styleGuide';
import { PRIMARY_PURPLE } from './constants/colors';
import { PROJECT_TITLE } from './constants/constants';
import Navigation from './components/Navigation/Navigation';
import { useEffect } from 'react';
import { getService } from './axios/axios';
import { setUserData } from './store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
  projectTitle: {
    color: PRIMARY_PURPLE,
    fontSize: SPACING.s24
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allUsers = useSelector(state => state.user.userData);
  // console.log(allUsers);

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
      <Navigation>
        <p className={classes.projectTitle}>
          {PROJECT_TITLE}
        </p>
      </Navigation>
    </>
  );
}

export default App;