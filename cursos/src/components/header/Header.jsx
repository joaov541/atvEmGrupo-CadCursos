import "./Header.css";
import Logo from "../../assets/images/ChatGPT Image 11 de jun. de 2026, 16_14_52.png"
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
                    <img src={Logo} alt="Logo do Filmoteca" />
                </Link>

                <nav className="nav_header">
                    <Link className="link_header" to="/filmes">
                        Filme
                    </Link>

                    <Link className="link_header" to="/generos">
                        Gênero
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