import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cats from "./pages/Cats";
import Join from "./pages/Join";
import Add from "./pages/Add";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cats />} />
          <Route path="/join" element={<Join />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
