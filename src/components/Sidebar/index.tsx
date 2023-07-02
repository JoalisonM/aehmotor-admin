import {
  Bus,
  User,
  List,
  House,
  MapPin,
  SignOut,
  Student,
  Buildings,
  ChartBar,
  GraduationCap,
  IdentificationCard,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import * as Tooltip from '@radix-ui/react-tooltip';

import {
  Aside, Header, Item, TooltipContent, TooltipArrow, SignOutButton
} from "./styles";
import { useAuth } from "../../contexts/auth";

const menuItems = {
  DASHBOARD: {
    path: "/dashboard",
    name: "Dashboard",
    icon: <ChartBar size={18} weight="fill" />
  },
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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleMenuShown = () => {
    onMenuShown(!menuShown);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
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
        <>
          {Object.entries(menuItems).map(([key, item]) => (
            <Item
              key={key}
              to={item.path}
            >
              {item.icon}
              <span>{item.name}</span>
            </Item>
          ))}
          <SignOutButton
            menuShown={menuShown}
            onClick={() => handleSignOut()}
          >
            <SignOut size={18} weight="bold" />
            Sair
          </SignOutButton>
        </>
      ) : (
          <>
            {Object.entries(menuItems).map(([key, item]) => (
              <Tooltip.Provider key={key} delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Item
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
            ))}
            <SignOutButton
              menuShown={menuShown}
              onClick={() => handleSignOut()}
            >
              <SignOut size={18} weight="bold" />
            </SignOutButton>
          </>
      )}
    </Aside>
  );
};