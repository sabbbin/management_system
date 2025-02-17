import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import {
  useLoginSessionStore,
  LoginSession,
} from "./store/login-session-store";

function App() {
  // const [loginState] =
  // 		useLoginSessionStore((state: LoginSession) => [
  // 			state.loginState,
  // 			state.logout,
  // 			state.login,
  // 		]);

  // if (loginState === 'uncertain') {
  // 	return <div> loading ...</div>;
  // }
  return <RouterProvider router={router} />;
}

export default App;
