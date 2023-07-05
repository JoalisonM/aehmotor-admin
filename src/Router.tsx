import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Driver } from "./pages/Driver";
import { Student } from "./pages/Student";
import { Address } from "./pages/Address";
import { College } from "./pages/College";
import { Vehicle } from "./pages/Vehicle";
import { CityHall } from "./pages/CityHall";
import { Employee } from "./pages/Employee";
import { Dashboard } from "./pages/Dashboard";
import { CitiesRoute } from "./pages/CitiesRoute";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { RegisterEmployee } from "./pages/RegisterEmployee";
import { RequiredAuth } from "./contexts/auth/RequiredAuth";
import { Notification } from "./pages/Notification";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/dashboard" element={
          <RequiredAuth><Dashboard /></RequiredAuth>
        } />
        <Route path="/funcionarios" element={
          <RequiredAuth><Employee /></RequiredAuth>
        } />
        <Route path="/alunos" element={
          <RequiredAuth><Student /></RequiredAuth>
        } />
        <Route path="/enderecos" element={
          <RequiredAuth><Address /></RequiredAuth>
        } />
        <Route path="/instituicoesDeEnsino" element={
          <RequiredAuth><College /></RequiredAuth>
        } />
        <Route path="/motoristas" element={
          <RequiredAuth><Driver /></RequiredAuth>
        } />
        <Route path="/veiculos" element={
          <RequiredAuth><Vehicle /></RequiredAuth>
        } />
        <Route path="/prefeituras" element={
          <RequiredAuth><CityHall /></RequiredAuth>
        } />
        <Route path="/rotas" element={
          <RequiredAuth><CitiesRoute /></RequiredAuth>
        } />
        <Route path="/notification" element={
          <RequiredAuth><Notification /></RequiredAuth>
        } />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register-employee" element={<RegisterEmployee />} />
    </Routes>
  );
};