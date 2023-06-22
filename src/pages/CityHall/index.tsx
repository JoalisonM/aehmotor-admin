import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { CityHallModal } from "./CityHallModal";
import { CityHallProps } from "../../api/cityHall";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { usePrefectures } from "../../hooks/usePrefectures";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const CityHall = () => {
  const {
    prefectures,
    setCityHall,
    getCityHall,
    deleteCityHall,
    fetchPrefectures,
    getCityHallByName,
  } = usePrefectures();

  useEffect(() => {
    fetchPrefectures();
  }, [fetchPrefectures]);

  const handleShowCityHall = (id?: number) => {
    if (id) {
      getCityHall(id);
    } else {
      setCityHall({} as CityHallProps);
    }
  };

  const handleDeleteCityHall = (id: number) => {
    deleteCityHall(id);
  };

  const handleSearchFilter = (name: string) => {
    getCityHallByName(name);
  };

  return (
    <Container>
      <Header
        title="Prefeitura"
        buttonTitle="Nova prefeitura"
        onShowModal={handleShowCityHall}
      >
        <CityHallModal />
      </Header>
      <SearchForm
        onSearchAll={fetchPrefectures}
        placeholder="Buscar por endereços"
        onSearchFilter={handleSearchFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Id secretário</th>
          </tr>
        </thead>
        <tbody>
          {prefectures && prefectures.map((cityHall) => (
            <tr key={cityHall.id}>
              <td>{cityHall.id}</td>
              <td>{cityHall.nome}</td>
              <td>{cityHall.secretario}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="icon">
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowCityHall(cityHall.id)}
                      />
                    </Button>
                  </Dialog.Trigger>

                  <CityHallModal />
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
                    id={cityHall.id}
                    onClickAction={handleDeleteCityHall}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente a prefeitura."
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