import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";

import {
  Header,
  Container,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  NewDriverButton,
} from "./styles";
import { RouteProps } from "../../api/route";
import {CitiesRouteModal } from "./CitiesRouteModal";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { useCitiesRoutes } from "../../hooks/useCitiesRoutes";

export const CitiesRoute = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    citiesRoutes,
    getCitiesRoute,
    setCitiesRoute,
    fetchCitiesRoutes,
    deleteCitiesRoute,
  } = useCitiesRoutes();

  useEffect(() => {
    fetchCitiesRoutes();
  }, [fetchCitiesRoutes]);

  const handleShowCitiesRoute = (id?: number) => {
    if (id) {
      getCitiesRoute(id);
    } else {
      setCitiesRoute({} as RouteProps);
    }
  };

  const handleDeleteCitiesRoute = (id: number) => {
    deleteCitiesRoute(id);
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Rota</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewDriverButton
              onClick={() => handleShowCitiesRoute()}
            >
              Nova rota
            </NewDriverButton>
          </Dialog.Trigger>

          <CitiesRouteModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por motoristas" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>IdVeículo</th>
            <th>IdMotorista</th>
            <th>IdFaculdade</th>
            <th>IdPrefeitura</th>
            <th>CidadeOrigem</th>
            <th>CidadeDestino</th>
            <th>QtdAlunos</th>
            <th>HoraSaída</th>
          </tr>
        </thead>
        <tbody>
          {citiesRoutes && citiesRoutes.map((citiesRoute) => (
            <tr key={citiesRoute.id}>
              <td>{citiesRoute.id}</td>
              <td>{citiesRoute.id_veiculo}</td>
              <td>{citiesRoute.id_motorista}</td>
              <td>{citiesRoute.id_instituicao_ensino}</td>
              <td>{citiesRoute.id_prefeitura}</td>
              <td>{citiesRoute.cidade_origem}</td>
              <td>{citiesRoute.cidade_destino}</td>
              <td>{citiesRoute.qtd_alunos}</td>
              <td>{citiesRoute.horario_saida}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button onClick={() => handleShowCitiesRoute(citiesRoute.id)}>
                      <PencilSimpleLine size={16} />
                    </button>
                  </Dialog.Trigger>

                  <CitiesRouteModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button onClick={() => handleDeleteCitiesRoute(citiesRoute.id)}>
                    <TrashSimple size={16} />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Rota deletada com sucesso!</ToastTitle>
                  </ToastRoot>
                  <ToastViewport />
                </Toast.Provider>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};