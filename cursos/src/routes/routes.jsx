import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastroCurso from "../cadastroCurso/CadastroCurso";
import CadastroArea from "../cadastroArea/CadastroArea";
import Login from "../login/Login";import PrivateRoute from "./PrivateRoute";

export const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path="/"/> 

                <Route 
                element={
                    <PrivateRoute>
                        <CadastroCurso/>
                    </PrivateRoute>
                } path="/curso"/> 

                <Route 
                element={
                    <PrivateRoute>
                        <CadastroArea/>
                    </PrivateRoute>
                } path="/area"/> 
                
            </Routes>
        </BrowserRouter>
    )
}

