import "./Cadastro.css";
import Botao from "../botao/Botao";

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form
                onSubmit={props.funcCadastro}
                className="layout_grid form_cadastro"
            >
                <h1>{props.tituloCadastro}</h1>
                <hr />

                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder={`Digite o nome do ${props.placeholder}`}
                            value={props.valor}
                            onChange={(e) => props.setValor(e.target.value)}
                        />
                    </div>

                    <div
                        style={{
                            display: props.visibilidade === "none" ? "none" : "flex",
                            gap: "1rem",
                            alignItems: "flex-end",
                        }}
                    >
                        <div className="campo_cad_genero">
                            <label htmlFor="genero">Gênero</label>

                            <select
                                value={props.genero}
                                onChange={(e) => props.setGenero(e.target.value)}
                            >
                                <option value="">Selecione</option>

                                {Array.isArray(props.listaGeneros) &&
                                    props.listaGeneros.map((g) => (
                                        <option
                                            key={g.idGenero}
                                            value={g.idGenero}
                                        >
                                            {g.nome}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="campo_cad_imagem">
                            <label htmlFor="arquivo">Imagem</label>

                            <label
                                htmlFor="arquivo"
                                className="btn_arquivo"
                            >
                                {props.imagem?.name || "Escolher Arquivo"}
                            </label>

                            <input
                                id="arquivo"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                    props.setImagem(e.target.files[0])
                                }
                            />
                        </div>
                    </div>

                    <Botao nomeDoBotao="Cadastrar" />

                    {props.btnEditar && (
                        <Botao
                            nomeDoBotao="Cancelar"
                            cancelarEdicao={props.cancelarEdicao}
                            btnEditar={props.btnEditar}
                        />
                    )}
                </div>
            </form>
        </section>
    );
};

export default Cadastro;