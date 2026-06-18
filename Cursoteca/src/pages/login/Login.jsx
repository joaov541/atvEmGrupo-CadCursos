import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LogoTipo from "../../assets/img/Group 1.png";

import Botao from "../../components/botao/Botao";
import { UsuarioContext } from "../../context/UsuarioContext";
import { Alerta } from "../../components/alerta/Alerta";
import api from "../../services/services";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { setUsuario } = useContext(UsuarioContext);

    const navigate = useNavigate();

    const realizarLogin = async (e) => {
        e.preventDefault();

        const usuario = {
            email,
            senha,
        };

        try {
            const retornoAPI = await api.post("/Login", usuario);

            const token = retornoAPI.data.token;

            localStorage.setItem("token", token);

            const usuarioDecoded = jwtDecode(token);

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioDecoded)
            );

            setUsuario(usuarioDecoded);

            navigate("/cursos");
        } catch (error) {
            console.log(error);

            Alerta({
                title: "Login",
                text: "Usuário não encontrado",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const verificarLogin = () => {
        const logado = JSON.parse(localStorage.getItem("usuario"));

        if (logado) {
            setUsuario(logado);
            navigate("/cursos");
        }
    };

    useEffect(() => {
        verificarLogin();
    }, []);

    return (
        <main className="main_login">
            <div className="banner"></div>

            <section className="section_login">
                <form
                    className="form_login"
                    onSubmit={realizarLogin}
                >
                    <img
                        src={LogoTipo}
                        alt="Logo Cursos"
                        className="logo_login"
                    />

                    <h2 className="textlogin">
                        Faça login para continuar
                    </h2>

                    <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="email">
                                Email:
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo_input">
                            <label htmlFor="senha">
                                Senha:
                            </label>

                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Botao nomeDoBotao="Entrar" />
                </form>
            </section>
        </main>
    );
};

export default Login;