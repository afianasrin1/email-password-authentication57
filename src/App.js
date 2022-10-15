import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./components/Layout/Main";

import RegisterReactTailwind from "./components/RegisterReactTailwind";
import LoginTailwind from "./components/LoginTailwind";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main>0</Main>,
    children: [
      { path: "/", element: <RegisterReactTailwind></RegisterReactTailwind> },
      {
        path: "/register",
        element: <RegisterReactTailwind></RegisterReactTailwind>,
      },
      {
        path: "/login",
        element: <LoginTailwind></LoginTailwind>,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
