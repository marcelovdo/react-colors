import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";

function Navbar({ level, changeLevel, format, changeFormat, showingAllColors, classes }) {
    const [open, setOpen] = useState(false);

    const handleFormatChange = (e) => {
        changeFormat(e.target.value);
        setOpen(true);
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    return (
        <header className={classes.Navbar}>
            <div className={classes.logo}>
                <Link to='/'>reactcolorpicker</Link>
            </div>
            {showingAllColors && (
                <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                        step={100}
                        onAfterChange={changeLevel}
                        />
                    </div>
                </div>
            )}
            <div className={classes.selectContainer}>
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                message={
                    <span id='message-id'>
                        Format Changed To {format.toUpperCase()}
                    </span>
                }
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={closeSnackbar}
                action={[
                    <IconButton
                        onClick={closeSnackbar}
                        color='inherit'
                        key='close'
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </header>
    );
}


export default withStyles(styles)(Navbar);