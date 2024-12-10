import { createContext, FC, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider: FC<any> = ({ children }) => {
  const [userID, setUserID] = useState<string>(
    JSON.parse(localStorage.getItem("userAuthLogin")!)
  );
  return (
    <GlobalContext.Provider value={{ userID, setUserID }}>
      {children}
    </GlobalContext.Provider>
  );
};
