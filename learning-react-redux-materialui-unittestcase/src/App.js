import './App.css';
import { makeStyles } from '@mui/styles';
import { SPACING } from './constants/styleGuide';
import { PRIMARY_PURPLE } from './constants/colors';
import { PROJECT_TITLE } from './constants/constants';

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
      <p className={classes.projectTitle}>
        {PROJECT_TITLE}
      </p>
    </>
  );
}

export default App;