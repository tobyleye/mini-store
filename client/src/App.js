import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import ProductList from "./features/product/ProductList";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={ProductList} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
