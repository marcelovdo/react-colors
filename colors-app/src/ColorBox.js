import React, {useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";


function ColorBox(props) {
    const {
        name,
        background,
        moreUrl,
        showingFullPalette,
        classes
    } = props;
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout;
        if (copied) {
            timeout = setTimeout(() => setCopied(false), 1500);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [copied]);

    const handleCopied = () => {
        setCopied(true)
    };

    return (
        <CopyToClipboard text={background} onCopy={handleCopied}>
            <div style={{background}} className={classes.ColorBox}>
                <div style={{background}} 
                    className={
                        classNames(classes.copyOverlay, {
                            [classes.showOverlay]: copied
                        })
                    }
                />
                <div className={classNames(classes.copyMessage, {
                    [classes.showMessage]: copied
                })}>
                    <h1>copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent} >
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                </div>
                {showingFullPalette && (
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.seeMore}>MORE</span>
                    </Link>
                )}
            </div>
        </CopyToClipboard>
    );
}

export default withStyles(styles)(ColorBox);
