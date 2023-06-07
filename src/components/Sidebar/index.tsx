import {
  User,
  House,
  Person,
  Compass,
  UserFocus,
} from "phosphor-react";

import { Aside, Header, Item } from "./styles";

const menuItems = {
  PERSON: {
    path: "/pessoas",
    name: "Pessoa",
    icon: <Person size={18} weight="fill" />
  },
  STUDENT: {
    path: "/alunos",
    name: "Aluno",
    icon: <User size={18} weight="fill" />
  },
  // EMPLOYER: {
  //   path: "/funcionarios",
  //   name: "Funcionario",
  //   icon: <UserFocus size={18} weight="fill" />
  // },
  ADDRESS: {
    path: "/enderecos",
    name: "Endereço",
    icon: <House size={18} weight="fill" />
  },
};

export const Sidebar = () => {
  return (
    <Aside>
      <Header>
        <span>Aehmotor admin</span>
      </Header>
      {Object.entries(menuItems).map(([key, item]) => (
        <Item key={key} to={item.path}>
          {item.icon}
          <span>{item.name}</span>
        </Item>
      ))}
    </Aside>
  );
};