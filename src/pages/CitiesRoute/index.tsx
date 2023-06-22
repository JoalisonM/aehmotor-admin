import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';
import { TrashSimple, PencilSimpleLine, MapTrifold } from "phosphor-react";

import { Container } from "./styles";
import { Map } from "../../components/Map";
import { RouteProps } from "../../api/route";
import {CitiesRouteModal } from "./CitiesRouteModal";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { useCitiesRoutes } from "../../hooks/useCitiesRoutes";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const CitiesRoute = () => {
  const {
    citiesRoutes,
    getCitiesRoute,
    setCitiesRoute,
    fetchCitiesRoutes,
    deleteCitiesRoute,
    getCitiesRouteByDestinationCity,
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
  };

  const handleSearchFilter = (destinationCity: string) => {
    getCitiesRouteByDestinationCity(destinationCity);
  };

  return (
    <Container>
      <Header
        title="Rota"
        buttonTitle="Nova rota"
        onShowModal={handleShowCitiesRoute}
      >
        <CitiesRouteModal />
      </Header>
      <SearchForm
        onSearchAll={fetchCitiesRoutes}
        placeholder="Buscar por motoristas"
        onSearchFilter={handleSearchFilter}
      />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
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
              <td>{citiesRoute.id_prefeitura}</td>
              <td>{citiesRoute.cidade_origem}</td>
              <td>{citiesRoute.cidade_destino}</td>
              <td>{citiesRoute.qtd_alunos}</td>
              <td>{citiesRoute.horario_saida}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="icon">
                      <MapTrifold size={16} />
                    </Button>
                  </Dialog.Trigger>

                  <Map
                    originCity={citiesRoute.cidade_origem}
                    destinationCity={citiesRoute.cidade_destino}
                  />
                </Dialog.Root>
              </td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button
                      variant="icon"
                      onClick={() => handleShowCitiesRoute(citiesRoute.id)}
                    >
                      <PencilSimpleLine size={16} />
                    </Button>
                  </Dialog.Trigger>

                  <CitiesRouteModal />
                </Dialog.Root>
              </td>
              <td>
                <AlertDialogRadix.Root>
                  <AlertDialogRadix.Trigger asChild>
                    <Button variant="icon" hover="danger">
                      <TrashSimple size={16} />
                    </Button>
                  </AlertDialogRadix.Trigger>
                  <AlertDialog
                    id={citiesRoute.id}
                    onClickAction={handleDeleteCitiesRoute}
                    description="Essa ação não pode ser desfeita.
                    Isso excluirá permanentemente a sua rota."
                  />
                </AlertDialogRadix.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};