import { NavLink } from "react-router-dom";
import "./header.scss";
// import Join from "./pages/Join";
// import Cats from "./pages/Cats";
// import Add from "./pages/Add";
// import Update from "./pages/Update";

const Header = () => {
    return (
        <div className="header">
          <div className="wraplogo">
          <img alt="logo" className="logo" src="./img/logo-nfc.png"></img>
          </div>
            <NavLink to="../"> Main </NavLink>
            <NavLink to="../Join"> Join us </NavLink>
            <NavLink to="../Add"> Add a cat </NavLink>
            <NavLink to="../Cats"> My space </NavLink>
            {/* <a href="./Join"> Join us!</a> */}
            {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cats />} />
          <Route path="/join" element={<Join />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter> */}
        </div>
    )
}

export default Header;
