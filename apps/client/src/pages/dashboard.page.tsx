import { useState } from "react";
import {
  LoginSession,
  useLoginSessionStore,
} from "../store/login-session-store";
import { Model } from "../component/ui/dialog-box";
import { createPortal } from "react-dom";
import { RegisterPage } from "./admin-register-page";

export const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const { navItem } = useLoginSessionStore<LoginSession>((state) => state);
  console.log("daah", navItem);
  return (
    <div>
      <nav>
        asdf
        {navItem.map((val) => val.name)}
      </nav>
      <main>
        <button className="cursor-pointer" onClick={() => setOpen(true)}>
          {" "}
          open{" "}
        </button>
        {open &&
          createPortal(
            <Model onClose={() => setOpen(false)}>
              <RegisterPage />
            </Model>,
            document.body,
          )}
      </main>
    </div>
  );
};
