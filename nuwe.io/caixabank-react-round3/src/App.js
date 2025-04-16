import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from "./components/Layout";
import Header from "./components/Header";
import CardGenerator from "./components/CardGenerator";
import CardList from "./components/CardList";
import { CardsProvider } from './context/CardsContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CardsProvider>
        <Layout>
          <Header />
          <CardGenerator />
          <CardList />
        </Layout>
      </CardsProvider>
    </ThemeProvider>
  );
};

export default App;
