import { Routes, Route } from "react-router-dom";

import { Person } from "./pages/Person";
import { Student } from "./pages/Student";
import { Address } from "./pages/Address";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/pessoas" element={<Person />} />
        <Route path="/alunos" element={<Student />} />
        <Route path="/enderecos" element={<Address />} />
\      </Route>
    </Routes>
  );
};