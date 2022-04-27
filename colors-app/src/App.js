import React, {useEffect, useState} from 'react';
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page";

function SelectPalette(props) {
  const { isSingleColor, palettes } = props;
  const params = useParams()

  function findPalette(id) {
    return palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  return (
    isSingleColor ?
      <SingleColorPalette 
        palette={generatePalette(findPalette(params.paletteId))} 
        colorId={params.colorId} 
      /> :
      <Palette palette={generatePalette(findPalette(params.paletteId))} />
  );
}

function App(props) {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(palettes)
    );
  }, [palettes]);

  const deletePalette = (id) => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  }

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames='page' timeout={500}>
        <Routes location={location}>
          <Route path='/palette/new' element={
            <Page>
              <NewPaletteForm savePalette={savePalette} palettes={palettes} />
            </Page>
          } />
          <Route path='/' element={
            <Page>
              <PaletteList palettes={palettes} deletePalette={deletePalette} />
            </Page>
          } />
          <Route
            path='/palette/:paletteId'
            element={
              <Page>
                <SelectPalette isSingleColor={false} palettes={palettes} />
              </Page>
            }
          />
          <Route
              path='/palette/:paletteId/:colorId'
              element={
                <Page>
                  <SelectPalette isSingleColor={true} palettes={palettes} />
                </Page>
              }
          />
          <Route element={
            <Page>
              <PaletteList palettes={palettes} deletePalette={deletePalette} />
            </Page>
          } />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
