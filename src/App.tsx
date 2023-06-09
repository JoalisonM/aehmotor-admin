import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { globalStyles } from "./styles/global"
import { PeopleContextProvider } from "./hooks/usePeople";
import { StudentsContextProvider } from "./hooks/useStudent";
import { UfsContextProvider } from "./hooks/useUfs";
import { CitiesContextProvider } from "./hooks/useCities";
import { AddressContextProvider } from "./hooks/useAddresses";
import { CollegesContextProvider } from "./hooks/useColleges";
import { EmployeesContextProvider } from "./hooks/useEmployees";
import { VehiclesContextProvider } from "./hooks/useVehicles";
import { DriversContextProvider } from "./hooks/useDrivers";
import { PrefecturesContextProvider } from "./hooks/usePrefectures";
import { CitiesRoutesContextProvider } from "./hooks/useCitiesRoutes";

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <PeopleContextProvider>
        <StudentsContextProvider>
          <UfsContextProvider>
            <CitiesContextProvider>
              <AddressContextProvider>
                <CollegesContextProvider>
                  <EmployeesContextProvider>
                    <VehiclesContextProvider>
                      <DriversContextProvider>
                        <PrefecturesContextProvider>
                          <CitiesRoutesContextProvider>
                            <Router />
                          </CitiesRoutesContextProvider>
                        </PrefecturesContextProvider>
                      </DriversContextProvider>
                    </VehiclesContextProvider>
                  </EmployeesContextProvider>
                </CollegesContextProvider>
              </AddressContextProvider>
            </CitiesContextProvider>
          </UfsContextProvider>
        </StudentsContextProvider>
      </PeopleContextProvider>
    </BrowserRouter>
  )
}

export default App
