import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroCurso from "./pages/cadastroCurso/CadastroCurso";
import CadastroArea from "./pages/cadastroArea/CadastroArea";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/cursos"
                    element={
                      <PrivateRoute>
                          <CadastroCurso />
                      </PrivateRoute>
                        
                    }
                />

                <Route
                    path="/areas"
                    element={
                        <PrivateRoute>
                            <CadastroArea />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};