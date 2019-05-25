import React from 'react';
import {CircularProgress} from "@material-ui/core";

const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    color:'#28A745'
};

const Progress = () => {
    return (
        <CircularProgress
            thickness={7}
            style={styles}
        />
    );
};

export default Progress;