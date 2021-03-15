import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import ProductList from "./features/product/ProductList";
import Checkout from "./features/product/Checkout";
import storage from "./storage";
import { loginSuccess } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  console.log("---isauthenticated", isAuthenticated);
  useEffect(() => {
    //before mounting app, check for saved session
    storage.retrieveSession().then((session) => {
      if (session) {
        dispatch(loginSuccess(session));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider>
      <Router>
        {isAuthenticated ? (
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/checkout" exact component={Checkout} />
            <Redirect from="*" to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register} />
            <Redirect from="*" to="/login" />
          </Switch>
        )}
      </Router>
    </ChakraProvider>
  );
}

export default App;
