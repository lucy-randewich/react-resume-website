import { CssBaseline, ThemeProvider } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Art from "./components/Art";
import Contact from "./components/Contact";
import Header from "./components/Header";
import LiveTank from "./components/LiveTank";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import { createAppTheme } from "./theme";

const getInitialMode = (): PaletteMode => {
  const savedMode = localStorage.getItem("colour-mode");
  if (savedMode === "light" || savedMode === "dark") return savedMode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const App = () => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("colour-mode", nextMode);
      return nextMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <Header mode={mode} onToggleMode={toggleMode} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <main>
                    <About id="about" />
                    <Projects id="projects" />
                    <Timeline id="experience" />
                  </main>
                  <Contact id="contact" />
                </>
              }
            />
            <Route
              path="/artwork"
              element={
                <main>
                  <Art id="paintings" />
                </main>
              }
            />
            <Route
              path="/shrimp-cam"
              element={
                <main>
                  <LiveTank />
                </main>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
