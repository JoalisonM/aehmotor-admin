import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { globalStyles } from "./styles/global"
import { AuthProvider } from "./contexts/auth";
import { UfsContextProvider } from "./hooks/useUfs";
import { PeopleContextProvider } from "./hooks/usePeople";
import { CitiesContextProvider } from "./hooks/useCities";
import { DriversContextProvider } from "./hooks/useDrivers";
import { StudentsContextProvider } from "./hooks/useStudent";
import { AddressContextProvider } from "./hooks/useAddresses";
import { VehiclesContextProvider } from "./hooks/useVehicles";
import { CollegesContextProvider } from "./hooks/useColleges";
import { EmployeesContextProvider } from "./hooks/useEmployees";
import { PrefecturesContextProvider } from "./hooks/usePrefectures";
import { CitiesRoutesContextProvider } from "./hooks/useCitiesRoutes";
import { NotificationProvider } from "./contexts/notification";

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <AuthProvider>
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
                              <NotificationProvider>
                                <Router />
                              </NotificationProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
