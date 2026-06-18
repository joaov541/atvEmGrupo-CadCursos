import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";
import Visualizar from "../../assets/img/eye.svg"

const Lista = (props) => {
    return (
        <section className="layout_grid">
            <div className="listagem">

                <h1>{props.tituloLista}</h1>
                <hr />

                <div className="tabela">
                    <table>

                        {/* CABEÇALHO */}
                        <thead>
                            <tr className="table_cabecalho">
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Área</th>
                                <th>Editar</th>
                                {props.fnResumo && <th>Resumo</th>}
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        {/* CORPO */}
                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (
                                    <tr
                                        className="item_lista"
                                        key={
                                            props.tipoLista === "area"
                                                ? item.idArea
                                                : item.idCurso
                                        }
                                    >

                                        {/* LISTA DE GÊNEROS */}
                                        {props.tipoLista === "curso" ? (
                                            <>
                                                <td data-cell="Nome">
                                                    {item.nome}
                                                </td>

                                                <td
                                                    style={{ display: props.visibilidade }}
                                                ></td>

                                                <td
                                                    style={{ display: props.visibilidade }}
                                                ></td>
                                            </>
                                        ) : (
                                            <>
                                                {/* LISTA DE Curso */}

                                                {/* CARTAZ AGORA NA COLUNA NOME */}
                                                <td data-cell="Nome">
                                                    <img
                                                        className="cartaz"
                                                        src={`https://localhost:7159/imagens/${item.imagem}`}
                                                        alt={item.titulo}
                                                    />
                                                </td>

                                                {/* TÍTULO AGORA NA COLUNA IMAGEM */}
                                                <td
                                                    data-cell="Imagem"
                                                    style={{ display: props.visibilidade }}
                                                >
                                                    {item.titulo}
                                                </td>

                                                {/* Área */}
                                                <td
                                                    data-cell="Area"
                                                    style={{ display: props.visibilidade }}
                                                >
                                                    {item.idGeneroNavigation?.nome || "-"}
                                                </td>
                                            </>
                                        )}

                                        {/* EDITAR */}
                                        <td data-cell="Editar">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcEditar(item)}
                                            >
                                                <img src={Editar} alt="Editar" />
                                            </button>
                                        </td>

                                        {/* Vizualizar Resumo */}
                                        {props.fnResumo && (
                                            <td data-cell="Visualizar">
                                                <button
                                                    className="icon"
                                                    onClick={() => props.fnResumo(item)}
                                                >
                                                    <img src={Visualizar} alt="Olho" />
                                                </button>
                                            </td>
                                        )}

                                    

                                        {/* EXCLUIR */}
                                        <td data-cell="Excluir">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcExcluir(item)}
                                            >
                                                <img src={Excluir} alt="Excluir" />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={
                                            props.tipoLista === "genero"
                                                ? 3
                                                : 5
                                        }
                                    >
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </section>
    );
};

export default Lista;