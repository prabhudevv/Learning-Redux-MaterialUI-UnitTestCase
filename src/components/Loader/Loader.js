import PropagateLoader from "react-spinners/PropagateLoader";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#ffffffc4",
    width: "100%",
    height: "100%",
    zIndex: "9999",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
  },
});

function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}>
        <PropagateLoader color="#1976d2" loading size={30} />
      </div>
    </div>
  );
}

export default Loader;
