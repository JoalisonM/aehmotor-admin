import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { globalStyles } from "./styles/global"
import { PeopleContextProvider } from "./hooks/usePeople";
import { StudentsContextProvider } from "./hooks/useStudent";
import { UfsContextProvider } from "./hooks/useUfs";
import { CitiesContextProvider } from "./hooks/useCities";
import { AddressContextProvider } from "./hooks/useAddresses";

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <PeopleContextProvider>
        <StudentsContextProvider>
          <UfsContextProvider>
            <CitiesContextProvider>
              <AddressContextProvider>
                <Router />
              </AddressContextProvider>
            </CitiesContextProvider>
          </UfsContextProvider>
        </StudentsContextProvider>
      </PeopleContextProvider>
    </BrowserRouter>
  )
}

export default App
