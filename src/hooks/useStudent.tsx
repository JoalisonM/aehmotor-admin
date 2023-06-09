import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Student, StudentProps, CreateStudentInput, UpdateStudentInput } from "../api/student";

interface StudentContextType {
    student: StudentProps;
    students: StudentProps[];
    fetchStudents: () => Promise<void>;
    deleteStudent: (id: number) => void;
    setStudent: (value: StudentProps) => void;
    getStudent: (id: number) => Promise<void>;
    getStudentByName: (name: string) => Promise<void>;
    createStudent: (data: CreateStudentInput) => Promise<void>;
    updateStudent: (data: UpdateStudentInput) => Promise<void>;
}

interface StudentsContextProviderProps {
    children: ReactNode;
}

export const StudentsContext = createContext({} as StudentContextType);

export const StudentsContextProvider = ({ children }: StudentsContextProviderProps) => {
    const [students, setStudents] = useState<StudentProps[]>([]);
    const [student, setStudent] = useState<StudentProps>({} as StudentProps);

    const fetchStudents = useCallback(async () => {
        const response = await Student.getAll();

        setStudents(response.data);
    }, []);

    const getStudent = useCallback(
        async (id: number) => {
            const response = await Student.get(id);

            if (response) {
                setStudent(response.data);
            }
        }, []
    );

    const getStudentByName = useCallback(
        async (name: string) => {
        const response = await Student.getByName(name);

        if (response) {
            setStudents(response.data);
        }
        }, []
    );

    const createStudent = useCallback(
        async (data: CreateStudentInput) => {
            const { nome, email, nascimento, telefone, senha,
                curso, matricula, turno, id_instituicao_ensino
            } = data;

            const response = await Student.create(
                {
                    nome,
                    email,
                    nascimento,
                    telefone,
                    senha,
                    curso,
                    matricula,
                    turno,
                    id_instituicao_ensino,
                }
            );

            setStudents((state) => [response.data, ...state]);
        }, []
    );

    const updateStudent = useCallback(
        async (data: UpdateStudentInput) => {
            const { id, nome, email, nascimento, telefone, senha,
                curso, matricula, turno, id_instituicao_ensino,
            } = data;

            const response = await Student.update(
                {
                id,
                id_instituicao_ensino,
                nome,
                email,
                nascimento,
                telefone,
                senha,
                curso,
                matricula,
                turno,
                }
            );

            setStudents((state) => state.map((student) => student.id === id ? response.data : student));
        }, []
    );

    const deleteStudent = async (id: number) => {
        Student.delete(id);

        setStudents((state) => state.filter((student) => student.id !== id));
    }

    return (
        <StudentsContext.Provider
            value={{
                student,
                students,
                getStudent,
                setStudent,
                fetchStudents,
                createStudent,
                updateStudent,
                deleteStudent,
                getStudentByName,
            }}
        >
            {children}
        </StudentsContext.Provider>
    );
}

export const useStudents = () => {
    const student = useContextSelector(StudentsContext, (context) => context.student);
    const students = useContextSelector(StudentsContext, (context) => context.students);
    const getStudent = useContextSelector(StudentsContext, (context) => context.getStudent);
    const setStudent = useContextSelector(StudentsContext, (context) => context.setStudent);
    const fetchStudents = useContextSelector(StudentsContext, (context) => context.fetchStudents);
    const createStudent = useContextSelector(StudentsContext, (context) => context.createStudent);
    const updateStudent = useContextSelector(StudentsContext, (context) => context.updateStudent);
    const deleteStudent = useContextSelector(StudentsContext, (context) => context.deleteStudent);
    const getStudentByName = useContextSelector(StudentsContext, (context) => context.getStudentByName);

    return {
        student,
        students,
        setStudent,
        getStudent,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
        getStudentByName,
    };
}