import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";

let LoaderCircle = ({value, children}) => {
    return (value === true ? <CircularProgress style={{ color: "#e64343" }} thickness={5}/> : <React.Fragment>{children}</React.Fragment>)
}

export default LoaderCircle;