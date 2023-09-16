import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/LoginPage";
import SignUpUser from "./components/SignUpUser";
import FileUpload from "./components/FileUpload";
import User from "./components/User";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/newsignup",
    element: <SignUpUser />,
  },

  {
    path: "/usercomp/:id",
    element: <User />,
  },
]);

export default router;
