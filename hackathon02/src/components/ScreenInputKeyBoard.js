import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputKeyboard: {
        display: "flex",
        flexDirection: "row",
        margin: "2vh",
        border: "4px solid #999"
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "6vh",
        height: "6vh",
        maxWidth: "8vw",
        maxHeight: "8vw",
        border: "2px solid #999",
        fontSize: "min(6vh, 6vw)",
        color: "#666",
        "&:hover": {
            backgroundColor: "#999",
            color: "#fff"
        }
    }
}));

export default function ScreenInputKeyBoard(props) {
    const classes = useStyles();
    const numbers = [...Array(10).keys()];

    return (
        <div className={classes.inputKeyboard} >
            {numbers.map(num => (<div id={`keyboard-input-${num}`} className={classes.grid} onClick={() => props.handleScreenKeyboardInput(num)}>{num === 0 ? "" : num}</div>))}
        </div>
    );
}