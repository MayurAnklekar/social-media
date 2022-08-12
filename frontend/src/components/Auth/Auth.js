import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

function Auth() {
  const [isRegistering, setIsRegistering] = useState(true);
  return (
    <div>
      <section>
        {isRegistering ? (
          <Login setIsRegistering={setIsRegistering} />
        ) : (
          <Register setIsRegistering={setIsRegistering} />
        )}

        {/* <Login setIsRegistering={setIsRegistering} /> */}

        {/* <Register setIsRegistering={setIsRegistering} /> */}
      </section>
    </div>
  );
}

export default Auth;
