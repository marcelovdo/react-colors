import React, {useState} from 'react';
import ColorBox from './ColorBox';
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";


function Palette({ palette, classes }) {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    const { colors, paletteName, emoji, id } = palette;

    console.log(palette);
    const colorBoxes = colors[level].map(color => (
        <ColorBox 
            background={color[format]} 
            name={color.name} 
            key={color.id} 
            moreUrl={`/palette/${id}/${color.id}`}
            showingFullPalette
        />
    ));

    return (
        <div className={classes.Palette}>
            <Navbar
                level={level}
                changeLevel={setLevel}
                format={format}
                changeFormat={setFormat}
                showingAllColors
            />
            <div className={classes.colors}>
                {colorBoxes}
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
}

export default withStyles(styles)(Palette);