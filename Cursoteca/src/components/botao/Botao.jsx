import "./Botao.css";

const Botao = (props) => {
    return (
        <button
            className={`botao ${props.btnEditar ? "btn-cancelar" : ""}`}
            type={props.btnEditar ? "button" : "submit"}
            onClick={props.cancelarEdicao}
        >
            {props.nomeDoBotao}
        </button>
    );
};

export default Botao;