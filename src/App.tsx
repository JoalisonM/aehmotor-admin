import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { globalStyles } from "./styles/global"
import { PeopleContextProvider } from "./hooks/usePeople";

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <PeopleContextProvider>
        <Router/>
      </PeopleContextProvider>
    </BrowserRouter>
  )
}

export default App
