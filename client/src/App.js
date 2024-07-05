import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Bounce, Flip, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/loginpage" element={<LoginPage/>}></Route>
          <Route path="/homepage" element={<LandingPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
