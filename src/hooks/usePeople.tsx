import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Person, PersonProps, CreatePersonInput, UpdatePersonInput } from "../api/person";

interface PeopleContextType {
  person: PersonProps;
  people: PersonProps[];
  fetchPeople: () => Promise<void>;
  deletePerson: (id: number) => void;
  setPerson: (value: PersonProps) => void;
  getPerson: (id: number) => Promise<void>;
  createPerson: (data: CreatePersonInput) => Promise<void>;
  updatePerson: (data: UpdatePersonInput) => Promise<void>;
}

interface PeopleContextProviderProps {
  children: ReactNode;
}

export const PeopleContext = createContext({} as PeopleContextType);

export const PeopleContextProvider = ({ children }: PeopleContextProviderProps) => {
  const [people, setPeople] = useState<PersonProps[]>([]);
  const [person, setPerson] = useState<PersonProps>({} as PersonProps);

  const fetchPeople = useCallback(async () => {
    const response = await Person.getAll();

    setPeople(response.data);
  }, []);

  const getPerson = useCallback(
    async (id: number) => {
      const response = await Person.get(id);

      if (response) {
        setPerson(response.data);
      }
    }, []
  );

  const createPerson = useCallback(
    async (data: CreatePersonInput) => {
      const { nome, email, nascimento, telefone, senha } = data;

      const response = await Person.create(
        {
          nome,
          email,
          nascimento,
          telefone,
          senha,
        }
      );

      setPeople((state) => [response.data, ...state]);
    }, []
  );

  const updatePerson = useCallback(
    async (data: UpdatePersonInput) => {
      const { id, nome, email, nascimento, telefone, senha } = data;

      const response = await Person.update(
        {
          id,
          nome,
          email,
          nascimento,
          telefone,
          senha,
        }
      );

      setPeople((state) => state.map((person) => person.id === id ? response.data : person));
    }, []
  );

  const deletePerson = async (id: number) => {
    Person.delete(id);

    setPeople((state) => state.filter((person) => person.id !== id));
  }

  return (
    <PeopleContext.Provider
      value={{
        person,
        people,
        getPerson,
        setPerson,
        fetchPeople,
        createPerson,
        updatePerson,
        deletePerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
}

export const usePeople = () => {
  const person = useContextSelector(PeopleContext, (context) => context.person);
  const people = useContextSelector(PeopleContext, (context) => context.people);
  const getPerson = useContextSelector(PeopleContext, (context) => context.getPerson);
  const setPerson = useContextSelector(PeopleContext, (context) => context.setPerson);
  const fetchPeople = useContextSelector(PeopleContext, (context) => context.fetchPeople);
  const createPerson = useContextSelector(PeopleContext, (context) => context.createPerson);
  const updatePerson = useContextSelector(PeopleContext, (context) => context.updatePerson);
  const deletePerson = useContextSelector(PeopleContext, (context) => context.deletePerson);

  return {
    person,
    people,
    setPerson,
    getPerson,
    fetchPeople,
    createPerson,
    updatePerson,
    deletePerson,
  };
}