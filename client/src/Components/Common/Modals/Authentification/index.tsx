import React, { useState } from "react";

import { SignIn } from "./SignIn/index";
import { SignUp } from "./SignUp/index";

export const UserForms = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  function switchSignType() {
    setIsSignIn((prev) => !prev);
  }
  return isSignIn ? (
    <SignIn switchToSignUp={switchSignType} />
  ) : (
    <SignUp switchToSignIn={switchSignType} />
  );
};
