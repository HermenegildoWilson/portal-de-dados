import { useAuthProvider } from "../context/AuthProvider";

export default function Main() {
    const { user } = useAuthProvider();

    return (
        <>
            <h1>Main</h1>
            <p>Seja bem vindo {user?.nome}</p>
        </>
    );
}
