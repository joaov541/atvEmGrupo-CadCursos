import "./Botao.css"

import "./Botao.css"

const Botao = (props) => {

    return(
        <button
            className="botao"
            type={props.btnEditar ? "button" : "submit"}
            onClick={props.cancelarEdicao}
        >
            {props.nomeDoBotao}
        </button>
    )
}


export default Botao;