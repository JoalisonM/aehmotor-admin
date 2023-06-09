import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";

import {
  Container,
  Header,
  NewCityHallButton,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "./styles";
import { CityHallModal } from "./CityHallModal";
import { CityHallProps } from "../../api/cityHall";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { usePrefectures } from "../../hooks/usePrefectures";

export const CityHall = () => {
  const [openToast, setOpenToast] = useState(false);
  const { prefectures, fetchPrefectures, setCityHall, getCityHall, deleteCityHall } = usePrefectures();

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
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Faculdade</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewCityHallButton
              onClick={() => handleShowCityHall()}
            >
              Nova faculdade
            </NewCityHallButton>
          </Dialog.Trigger>

          <CityHallModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por endereços" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id secretário</th>
            <th>Id endereço</th>
          </tr>
        </thead>
        <tbody>
          {prefectures && prefectures.map((cityHall) => (
            <tr key={cityHall.id}>
              <td>{cityHall.id}</td>
              <td>{cityHall.secretario}</td>
              <td>{cityHall.id_endereco}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button>
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowCityHall(cityHall.id)}
                      />
                    </button>
                  </Dialog.Trigger>

                  <CityHallModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button>
                    <TrashSimple
                      size={16}
                      onClick={() => handleDeleteCityHall(cityHall.id)}
                    />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Faculdade deletada com sucesso!</ToastTitle>
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