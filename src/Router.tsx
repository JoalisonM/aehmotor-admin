import { Routes, Route } from "react-router-dom";

import { Person } from "./pages/Person";
import { Driver } from "./pages/Driver";
import { Student } from "./pages/Student";
import { Address } from "./pages/Address";
import { College } from "./pages/College";
import { Vehicle } from "./pages/Vehicle";
import { CityHall } from "./pages/CityHall";
import { Employee } from "./pages/Employee";
import { CitiesRoute } from "./pages/CitiesRoute";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* <Route path="/pessoas" element={<Person />} /> */}
        <Route path="/funcionarios" element={<Employee />} />
        <Route path="/alunos" element={<Student />} />
        <Route path="/enderecos" element={<Address />} />
        <Route path="/instituicoesDeEnsino" element={<College />} />
        <Route path="/motoristas" element={<Driver />} />
        <Route path="/veiculos" element={<Vehicle />} />
        <Route path="/prefeituras" element={<CityHall />} />
        <Route path="/rotas" element={<CitiesRoute />} />
      </Route>
    </Routes>
  );
};