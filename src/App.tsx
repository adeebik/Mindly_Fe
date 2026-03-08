import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SharedContent from "./pages/SharedContent";
import SharedMind from "./pages/SharedMind";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shared-content/:hash" element={<SharedContent />} />
        <Route path="/share/:hash" element={<SharedMind/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
