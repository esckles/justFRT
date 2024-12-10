import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { GlobalProvider } from "./global/globalProvider";
import { Provider } from "react-redux";
import { store } from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const App = () => {
  return (
    <GlobalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </GlobalProvider>
  );
};

export default App;
