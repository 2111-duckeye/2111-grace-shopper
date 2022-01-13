import React from "react";
import AllProducts from "./components/AllProducts";

import Navibar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navibar />
      {/* <AllProducts /> */}
      <Routes />
    </div>
  );
};

export default App;
