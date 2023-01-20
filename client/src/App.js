import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cats from "./pages/Cats";
import Join from "./pages/Join";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Header from "./components/Header/Header";
import { UploadFile } from "./components/UploadFile/UploadFile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header/>
        <Routes>
          <Route path="/" element={<Cats />} />
          <Route path="/join" element={<Join />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/add" element={<Add />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
