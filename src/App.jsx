import Layout from "./components/Layout";
import { DataContext } from "./context/context";
import { useReducer } from "react";
import reducer, { initialValue } from "./context/reducer";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";

function App() {
  const [data, dispatch] = useReducer(reducer, initialValue);
  useEffect(() => {
    const url = window.location.hash;
    const tokenObj = url
      .substring(1)
      .split("&")
      .reduce((intitial, cur) => {
        const part = cur.split("=");
        intitial[part[0]] = part[1];
        return intitial;
      }, {});
    window.location.hash = "";
    const token = tokenObj.access_token;
    dispatch({ type: "SET_TOKEN", token });
  }, []);
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {data.token ? <Layout></Layout> : <LoginPage />}
    </DataContext.Provider>
  );
}

export default App;
