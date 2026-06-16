import { useEffect, useState } from "react"
import { UsuarioContext } from "./UsuarioContext"

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const dadosStorage = localStorage.getItem("usuario");

        return dadosStorage
            ? JSON.parse(dadosStorage)
            : null;
    });

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    );
};