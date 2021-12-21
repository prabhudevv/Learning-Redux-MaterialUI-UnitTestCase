import './App.css';
import { makeStyles } from '@mui/styles';
import { SPACING } from './constants/styleGuide';
import { PRIMARY_PURPLE } from './constants/colors';
import { PROJECT_TITLE } from './constants/constants';
import Navigation from './components/Navigation/Navigation';

const useStyles = makeStyles({
  projectTitle: {
    color: PRIMARY_PURPLE,
    fontSize: SPACING.s24
  },
});

function App() {
  const classes = useStyles();

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