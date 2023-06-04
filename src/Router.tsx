import { Routes, Route } from "react-router-dom";

import { Person } from "./pages/Person";
import { Student } from "./pages/Student";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/pessoas" element={<Person />} />
        <Route path="/alunos" element={<Student />} />
      </Route>
    </Routes>
  );
};