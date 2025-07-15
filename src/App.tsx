import { UiContextProvider } from "./context/ui-context";
import Router from "./router/Router.tsx";

function App() {
  return (
    <UiContextProvider>
      <Router />
    </UiContextProvider>
  );
}

export default App;
