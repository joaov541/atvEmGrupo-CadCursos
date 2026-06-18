import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./CadastroArea.css";
import Cadastro from "../../components/cadastro/Cadastro";
import { useEffect, useState } from "react";
import api from "../../services/services";
import Lista from "../../components/lista/Lista";

import { Alerta } from "../../components/alerta/Alerta";

const CadastroArea = () => {

    const [valor, setValor] = useState("");
    const [idEditar, setIdEditar] = useState(0);
    const [editar, setEditar] = useState(false);
    const [listaAreas, setListaAreas] = useState([]);

    // CADASTRAR ÁREA
    const cadastrarArea = async (e) => {
        e.preventDefault();

        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Área",
                text: "Área deve ser preenchida antes de cadastrar!",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return false;
        }

        const objCadastro = {
            nome: valor.trim()
        };

        try {
            const retornoAPI = await api.post("/Area", objCadastro);

            if (retornoAPI.status === 201 || retornoAPI.status === 200) {
                Alerta({
                    title: "Cadastro de Área",
                    text: `Área ${objCadastro.nome} cadastrada com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                limparFormulario();
                getAreas();
            } else {
                Alerta({
                    title: "Cadastro de Área",
                    text: "Houve algum problema para cadastrar...",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(error);
            Alerta({
                title: "Cadastro de Área",
                text: "Erro na chamada da API...",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        return false;
    };

    // LIMPAR FORMULÁRIO
    const limparFormulario = () => {
        setValor("");
        setEditar(false);
        setIdEditar(0);
    };

    // EXCLUIR ÁREA
    const excluirArea = async (item) => {
        const result = await Alerta({
            title: "Você tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d6a100ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) {
            return;
        }

        const idExcluir = item.idArea || item.idGenero || item.id;

        try {
            await api.delete(`/Area/${idExcluir}`);

            const novaLista = listaAreas.filter(
                area => (area.idArea || area.idGenero || area.id) !== idExcluir
            );

            setListaAreas(novaLista);

            Alerta({
                title: "Excluir Área",
                text: "Área excluída com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error(error);
            Alerta({
                title: "Excluir Área",
                text: "Erro ao excluir a área.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // PRÉ-EDIÇÃO
    const preEditar = (item) => {
        const id = item.idArea || item.idGenero || item.id;
        setIdEditar(id);
        setValor(item.nome);
        setEditar(true);
    };

    // EDITAR ÁREA (RESOLVIDO PARA A PORTA 7023)
    const editarArea = async (e) => {
        e.preventDefault();

        if (valor.trim().length === 0) {
            Alerta({
                title: "Editar Área",
                text: "Área deve ser preenchida.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return false;
        }

        // Monta o JSON contendo os nomes possíveis de ID que a API mapeia internamente
        const objEditar = {
            idArea: idEditar,
            idGenero: idEditar,
            id: idEditar,
            nome: valor.trim()
        };

        try {
            // CORREÇÃO CRÍTICA: Removido o "/${idEditar}" da URL para não estourar o erro 405
            const retornoAPI = await api.put("/Area", objEditar);

            if (retornoAPI.status === 200 || retornoAPI.status === 204) {
                const novaLista = listaAreas.map((area) => {
                    const idAreaAtual = area.idArea || area.idGenero || area.id;
                    if (idAreaAtual === idEditar) {
                        return {
                            ...area,
                            nome: valor.trim()
                        };
                    }
                    return area;
                });

                limparFormulario();
                setListaAreas(novaLista);

                Alerta({
                    title: "Editar Área",
                    text: "Área editada com sucesso!",
                    icon: "success"
                });
            } else {
                Alerta({
                    title: "Editar Área",
                    text: "Erro ao editar a área.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Erro detalhado na requisição:", error.response || error);
            Alerta({
                title: "Editar Área",
                text: "Erro na chamada da API.",
                icon: "error"
            });
        }

        return false;
    };

    // GET ÁREAS
    const getAreas = async () => {
        try {
            const retornoAPI = await api.get("/Area");
            setListaAreas(retornoAPI.data || []);
        } catch (error) {
            console.error(error);
            setListaAreas([]);
            Alerta({
                title: "Cadastro de Área",
                text: "Erro ao retornar os dados.",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        getAreas();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Áreas"
                    visibilidade="none"
                    placeholder="área"
                    valor={valor}
                    setValor={setValor}
                    cancelarEdicao={limparFormulario}
                    funcCadastro={editar ? editarArea : cadastrarArea}
                    btnEditar={editar}
                />

                <Lista
                    tituloLista="Lista de Áreas"
                    visibilidade="none"
                    lista={listaAreas}
                    tipoLista="genero"
                    funcExcluir={excluirArea}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>
    );
};

export default CadastroArea;