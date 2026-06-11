import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/img/logo.svg";
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../../components/alerta/Alerta";
import api from "../../services/services";
import { jwtDecode } from "jwt-decode";


const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

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

            navigate("/filmes");
        }
        catch (error) {
            console.log(error);

            Alerta({
                title: "Login",
                text: "Usuário não encontrado",
                icon: "error",
                confirmButtonText: "OK"
            });
        }


        setUsuario(usuario);

        navigate("/filmes");
    };

    const verificarLogin = () => {
        const logado = JSON.parse(localStorage.getItem("usuario"))//pega os dados no localStorage

        if(logado != undefined || logado != null){//se estiver logado
            setUsuario(logado)//atualza o state global do usuário (Usuário Context na Provider)
            navigate("/filmes")//renderiza o usuário para a rota de /filmes
        }
    }

    useEffect(() =>{
        verificarLogin()
    },[])



    return (
        <>


            <main className="main_login">
                <div className="banner"></div>

                <section className="section_login">
                    <img
                        src={Logo}
                        alt="Logo do Filmoteca"
                    />

                    <form
                        className="form_login"
                        onSubmit={realizarLogin}
                    >
                        <h1>Login</h1>

                        <div className="campos_login">
                            <div className="campo_input">


                                <label htmlFor="email">
                                    Email:
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Digite seu e-mail"
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
                                    name="senha"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Botao nomeDoBotao="Entrar" />
                    </form>
                </section>
            </main>


        </>
    );
};

export default Login;