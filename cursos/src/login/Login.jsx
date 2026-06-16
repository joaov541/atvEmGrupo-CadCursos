import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Botao from "../components/botao/Botao";
import Logo from "../assets/images/ChatGPT Image 11 de jun. de 2026, 16_14_46.png";
import { UsuarioContext } from "../context/UsuarioContext";
import { Alerta } from "../components/alerta/Alerta";
import api from "../services/services";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

            navigate("/curso");
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

        navigate("/curso");
    };

    const verificarLogin = () => {
        const logado = JSON.parse(localStorage.getItem("usuario"))//pega os dados no localStorage

        if(logado != undefined || logado != null){//se estiver logado
            setUsuario(logado)//atualza o state global do usuário (Usuário Context na Provider)
            navigate("/curso")//renderiza o usuário para a rota de /filmes
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
        <img src={Logo} alt="Logo" />

        <form
            className="form_login"
            onSubmit={realizarLogin}
        >
            <h1>Login</h1>

            <div className="campos_login">
                <div className="campo_input">
                    <label htmlFor="email">Email:</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                    />
                </div>

                <div className="campo_input">
                    <label htmlFor="senha">Senha:</label>

                    <input
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
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