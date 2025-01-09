import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./page/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./page/WelcomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div >
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<LoginPage/>} />
            <Route path="/welcome" element={<WelcomePage/>} />

          </Routes>
        </BrowserRouter>
       
      </div>
    </>
  );
}

export default App;
