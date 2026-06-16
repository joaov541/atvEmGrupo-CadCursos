import "./Header.css";
import Logo from "../../assets/img/ChatGPT Image 16_06_2026, 13_46_25.png"
import { Link } from "react-router-dom";
import { UsuarioContext } from "../../context/UsuarioContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
//import { ThemeContext } from "../../context/ThemeContext";



const Header = () => {
    const { setUsuario } = useContext(UsuarioContext);
    // const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();


    const realizarLogout = () => {
        localStorage.removeItem("usuario");

        setUsuario(null);

        navigate("/");
    };

    return (
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/">
                    <img src={Logo} alt="Logo da Cursoteca" />
                </Link>

                <nav className="nav_header">
                    <Link className="link_header" to="/cursos">
                        Curso
                    </Link>

                    <Link className="link_header" to="/areas">
                        Área
                    </Link>

                    {/* <button className="themebutton"
                     onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button> */}

                    <button
                        className="btn_logout"
                        onClick={realizarLogout}
                    >
                        Sair
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;