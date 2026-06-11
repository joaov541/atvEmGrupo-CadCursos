import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastroFilme from "./pages/cadastroFilme/CadastroFilme";
import CadastroGenero from "./pages/cadastroGenero/CadastroGenero";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";

export const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path="/"/> 

                <Route 
                element={
                    <PrivateRoute>
                        <CadastroFilme/>
                    </PrivateRoute>
                } path="/filmes"/> 

                <Route 
                element={
                    <PrivateRoute>
                        <CadastroGenero/>
                    </PrivateRoute>
                } path="/generos"/> 
                
            </Routes>
        </BrowserRouter>
    )
}

