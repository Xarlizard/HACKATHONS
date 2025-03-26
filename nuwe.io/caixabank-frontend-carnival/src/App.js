import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { TourProvider } from "./tour/AppTour";

import Portfolio from "./components/Portfolio/Portfolio";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import LoanCalculator from "./components/LoanCalculator/LoanCalculator";

function App() {
  return (
    <TourProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <img
              src="/caixabank-icon.png"
              alt="CaixaBank logo"
              style={{ width: 80 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              CaixaBank Lite
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                Investments Portfolio
              </Button>
              <Button color="inherit" component={Link} to="/currency-converter">
                Currency Converter
              </Button>
              <Button color="inherit" component={Link} to="/loan-calculator">
                Loan Calculator
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="lg"
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
          </Routes>
        </Container>
      </Router>
    </TourProvider>
  );
}

export default App;
