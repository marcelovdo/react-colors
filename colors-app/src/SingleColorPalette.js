import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";


function SingleColorPalette(props) {
    const [format, setFormat] = useState("hex");

    const gatherShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    };

    // TODO: how to store shades for the same component and don't do gatherShades every time
    const shades = gatherShades(props.palette, props.colorId);
    const { paletteName, emoji, id } = props.palette;
    const { classes } = props;

    const colorBoxes = shades.map(color => (
        <ColorBox
          key={color.name}
          name={color.name}
          background={color[format]}
          showingFullPalette={false}
        />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar 
            format={format}
            changeFormat={setFormat}
            showingAllColors={false}
        />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} >GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
}
export default withStyles(styles)(SingleColorPalette);