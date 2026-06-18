import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/streamline-ultimate_pen-write-bold.png";
import Excluir from "../../assets/img/fa7-solid_trash.png";
import Visualizar from "../../assets/img/Vector (2).png"

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
                                            props.tipoLista === "genero" || props.tipoLista === "area"
                                                ? item.idArea
                                                : item.idCurso
                                        }
                                    >

                                        {/* VERIFICAÇÃO SE É O TIPO GÊNERO/ÁREA */}
                                        {props.tipoLista === "genero" || props.tipoLista === "area" ? (
                                            <>
                                                {/* Esconde a coluna da imagem */}
                                                <td style={{ display: props.visibilidade }}></td>

                                                {/* Mostra apenas o nome da Área */}
                                                <td data-cell="Nome">
                                                    {item.nome}
                                                </td>

                                                {/* Esconde a coluna da área descritiva */}
                                                <td style={{ display: props.visibilidade }}></td>
                                            </>
                                        ) : (
                                            <>
                                                {/* SE FOR CURSO (RENDERIZAÇÃO PADRÃO COM IMAGEM) */}
                                                <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                                    {item.imagem ? (
                                                        <img
                                                            className="cartaz"
                                                            /* CORREÇÃO 1: Pasta 'images' minúscula e extensão dinâmica do banco (.webp, .png, etc) */
                                                            src={`https://localhost:7023/images/${item.imagem}`}
                                                            alt={item.nome}
                                                            onError={(e) => {
                                                                // Corta o loop infinito imediatamente desativando o trigger
                                                                e.target.onerror = null; 
                                                                // Placeholder padrão caso a imagem não exista de fato no servidor
                                                                e.target.src = "https://placehold.co/80x50?text=Sem+Foto";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="sem-foto">Sem Foto</div>
                                                    )}
                                                </td>

                                                <td data-cell="Nome">
                                                    {item.nome}
                                                </td>

                                                <td data-cell="Area" style={{ display: props.visibilidade }}>
                                                    {/* CORREÇÃO 2: Busca o nome textual da Área ("T.I") usando o GUID idArea vindo da API */}
                                                    {props.listaGeneros?.find(g => g.idArea === item.idArea || g.idGenero === item.idArea)?.nome || "-"}
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

                                        {/* Visualizar Resumo */}
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
                                            props.tipoLista === "genero" || props.tipoLista === "area"
                                                ? 3
                                                : 6
                                        }
                                        style={{ textAlign: "center", padding: "20px" }}
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