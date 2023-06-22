import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { College, CollegeProps, CreateCollegeInput, UpdateCollegeInput } from "../api/college";

interface CollegesContextType {
  college: CollegeProps;
  colleges: CollegeProps[];
  fetchColleges: () => Promise<void>;
  deleteCollege: (id: number) => void;
  setCollege: (value: CollegeProps) => void;
  getCollege: (id: number) => Promise<void>;
  getCollegeByName: (name: string) => Promise<void>;
  createCollege: (data: CreateCollegeInput) => Promise<void>;
  updateCollege: (data: UpdateCollegeInput) => Promise<void>;
}

interface CollegesContextProviderProps {
  children: ReactNode;
}

export const CollegesContext = createContext({} as CollegesContextType);

export const CollegesContextProvider = ({ children }: CollegesContextProviderProps) => {
  const [colleges, setColleges] = useState<CollegeProps[]>([]);
  const [college, setCollege] = useState<CollegeProps>({} as CollegeProps);

  const fetchColleges = useCallback(async () => {
    const response = await College.getAll();

    setColleges(response.data);
  }, []);

  const getCollege = useCallback(
    async (id: number) => {
      const response = await College.get(id);

      if (response) {
        setCollege(response.data);
      }
    }, []
  );

  const getCollegeByName = useCallback(
    async (name: string) => {
      const response = await College.getByName(name);

      if (response) {
        setColleges(response.data);
      }
    }, []
  );

  const createCollege = useCallback(
    async (data: CreateCollegeInput) => {
      const { nome, telefone, endereco } = data;

      const response = await College.create(
        {
          nome,
          telefone,
          endereco,
        }
      );

      setColleges((state) => [response.data, ...state]);
    }, []
  );

  const updateCollege = useCallback(
    async (data: UpdateCollegeInput) => {
      const { id, nome, telefone, endereco } = data;

      const response = await College.update(
        {
          id,
          nome,
          telefone,
          endereco
        }
      );

      setColleges((state) => state.map((College) => College.id === id ? response.data : College));
    }, []
  );

  const deleteCollege = async (id: number) => {
    College.delete(id);

    setColleges((state) => state.filter((College) => College.id !== id));
  }

  return (
    <CollegesContext.Provider
      value={{
        college,
        colleges,
        getCollege,
        setCollege,
        fetchColleges,
        createCollege,
        updateCollege,
        deleteCollege,
        getCollegeByName,
      }}
    >
      {children}
    </CollegesContext.Provider>
  );
}

export const useColleges = () => {
  const college = useContextSelector(CollegesContext, (context) => context.college);
  const colleges = useContextSelector(CollegesContext, (context) => context.colleges);
  const getCollege = useContextSelector(CollegesContext, (context) => context.getCollege);
  const setCollege = useContextSelector(CollegesContext, (context) => context.setCollege);
  const fetchColleges = useContextSelector(CollegesContext, (context) => context.fetchColleges);
  const createCollege = useContextSelector(CollegesContext, (context) => context.createCollege);
  const updateCollege = useContextSelector(CollegesContext, (context) => context.updateCollege);
  const deleteCollege = useContextSelector(CollegesContext, (context) => context.deleteCollege);
  const getCollegeByName = useContextSelector(CollegesContext, (context) => context.getCollegeByName);

  return {
    college,
    colleges,
    setCollege,
    getCollege,
    fetchColleges,
    createCollege,
    updateCollege,
    deleteCollege,
    getCollegeByName,
  };
}