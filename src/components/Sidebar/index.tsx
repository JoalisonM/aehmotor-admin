import {
  Bus,
  User,
  List,
  House,
  Student,
  Buildings,
  MapPin,
  GraduationCap,
  IdentificationCard,
} from "phosphor-react";
import * as Tooltip from '@radix-ui/react-tooltip';

import { Aside, Header, Item, TooltipContent, TooltipArrow } from "./styles";

const menuItems = {
  // PERSON: {
  //   path: "/pessoas",
  //   name: "Pessoa",
  //   icon: <Person size={18} weight="fill" />
  // },
  EMPLOYER: {
    path: "/funcionarios",
    name: "Funcionário",
    icon: <User size={18} weight="fill" />
  },
  STUDENT: {
    path: "/alunos",
    name: "Aluno",
    icon: <Student size={18} weight="fill" />
  },
  ADDRESS: {
    path: "/enderecos",
    name: "Endereço",
    icon: <House size={18} weight="fill" />
  },
  COLLEGE: {
    path: "/instituicoesDeEnsino",
    name: "Faculdade",
    icon: <GraduationCap size={18} weight="fill" />
  },
  DRIVER: {
    path: "/motoristas",
      name: "Motorista",
    icon: <IdentificationCard size={18} weight="fill" />
  },
  VEHICLE: {
    path: "/veiculos",
      name: "Veículo",
    icon: <Bus size={18} weight="fill" />
  },
  CITY_HALL: {
    path: "/prefeituras",
      name: "Prefeitura",
    icon: <Buildings size={18} weight="fill" />
  },
  ROUTE: {
    path: "/rotas",
      name: "Rota",
    icon: <MapPin size={18} weight="fill" />
  },
};

interface SidebarProps {
  menuShown: boolean;
  onMenuShown: (value: boolean) => void;
}

export const Sidebar = ({ menuShown, onMenuShown }: SidebarProps) => {
  const handleMenuShown = () => {
    onMenuShown(!menuShown);
  };

  return (
    <Aside menuShown={menuShown}>
      <Header menuShown={menuShown}>
        {menuShown && <span>Aehmotor</span>}
        <button onClick={() => handleMenuShown()}>
          <List size={18} weight="bold" />
        </button>
      </Header>
      {menuShown ? (
        Object.entries(menuItems).map(([key, item]) => (
          <Item
            key={key}
            to={item.path}
          >
            {item.icon}
            <span>{item.name}</span>
          </Item>
        ))
      ) : (
        Object.entries(menuItems).map(([key, item]) => (
          <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Item
                  key={key}
                  to={item.path}
                  menuShown={menuShown}
                >
                  {item.icon}
                </Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <TooltipContent side="right" sideOffset={5}>
                  {item.name}
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))
      )}
    </Aside>
  );
};