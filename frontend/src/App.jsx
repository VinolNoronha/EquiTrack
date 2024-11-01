import "./App.css";
import Homepage from "./Pages/Homepage";
import Market from "./Pages/Market";
import Portfolio from "./Pages/Portfolio";
import News from "./Pages/News";
import Authentication from "./features/auth/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./features/auth/UserProvider";
import StocksProvider from "./features/stocks/StocksProvider";
import Login from "./features/auth/Login";

function App() {
  return (
    <StocksProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/market" element={<Market />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/news" element={<News />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </StocksProvider>
  );
}

export default App;
