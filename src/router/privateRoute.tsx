import React, { FC, useContext, useState } from "react";
import { GlobalContext } from "../global/globalProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<any> = ({ children }) => {
  const { userID }: any = useContext(GlobalContext);

  return (
    <div>{userID ? <div>{children}</div> : <Navigate to="/auth/login" />}</div>
  );
};

export default PrivateRoute;
