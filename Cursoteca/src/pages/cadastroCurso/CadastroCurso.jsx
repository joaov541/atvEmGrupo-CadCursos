import { useEffect, useState } from "react";
import "./CadastroCurso.css";

import api from "../../services/services";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

import { Alerta } from "../../components/alerta/Alerta";
import { gerarResumo } from "../../services/IAServices";

const CadastroCurso = () => {

    const [valor, setValor] = useState("");
    const [listaAreas, setListaAreas] = useState([]);
    const [listaCursos, setListaCursos] = useState([]);
    const [area, setArea] = useState("");
    const [idEditar, setIdEditar] = useState(0);
    const [editar, setEditar] = useState(false);
    const [imagem, setImagem] = useState(null);

    // GET CURSOS
    const getCursos = async () => {
        try {
            const retornoAPI = await api.get("/Curso");
            setListaCursos(retornoAPI.data);
        } catch (error) {
            console.log(error);
        }
    };

    // GET ÁREAS
    const getAreas = async () => {
        try {
            const retornoAPI = await api.get("/Area");
            setListaAreas(retornoAPI.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCursos();
        getAreas();
    }, []);

    // CADASTRAR CURSO
    const cadastroCurso = async (e) => {
        e.preventDefault();

        const idAreaNumber = Number(area);

        if (!valor.trim() || !area || isNaN(idAreaNumber)) {
            Alerta({
                title: "Cadastro de Curso",
                text: "Preencha nome e área corretamente!",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        const formData = new FormData();

        formData.append("titulo", valor.trim());
        formData.append("idArea", idAreaNumber);

        if (imagem) {
            formData.append("imagem", imagem);
        }

        try {

            if (editar) {

                await api.put(`/Curso/${idEditar}`, formData);

                Alerta({
                    title: "Curso atualizado",
                    text: "Curso editado com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

            } else {

                await api.post("/Curso", formData);

                Alerta({
                    title: "Cadastro de Curso",
                    text: `Curso ${valor} cadastrado com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }

            limparFormulario();
            getCursos();

        } catch (error) {

            console.log(error);

            Alerta({
                title: "Erro",
                text: "Erro ao salvar curso",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // EXCLUIR CURSO
    const excluirCurso = async (item) => {

        const result = await Alerta({
            title: "Você tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/Curso/${item.idCurso}`);

            setListaCursos(
                listaCursos.filter(
                    curso => curso.idCurso !== item.idCurso
                )
            );

            Alerta({
                title: "Excluir Curso",
                text: "Curso excluído com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            });

        } catch (error) {
            console.log(error);
        }
    };

    // PRÉ-EDIÇÃO
    const preEditar = (item) => {
        setValor(item.titulo);
        setArea(item.idArea);
        setEditar(true);
        setIdEditar(item.idCurso);
    };

    // LIMPAR FORMULÁRIO
    const limparFormulario = () => {
        setValor("");
        setArea("");
        setEditar(false);
        setImagem(null);
        setIdEditar(0);
    };

    // RESUMO IA
    const resumoDoCurso = async (curso) => {

        try {

            const resumoIA = await gerarResumo(curso.titulo);

            Alerta({
                title: curso.titulo,
                text: resumoIA,
                icon: "success",
                confirmButtonText: "Fechar",
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />

            <Cadastro
                tituloCadastro="Cadastro de Cursos"
                placeholder="curso"

                valor={valor}
                setValor={setValor}

                genero={area}
                setGenero={setArea}

                imagem={imagem}
                setImagem={setImagem}

                funcCadastro={cadastroCurso}
                cancelarEdicao={limparFormulario}
                btnEditar={editar}

                listaGeneros={listaAreas}
            />

            <Lista
                tituloLista="Lista de Cursos"
                lista={listaCursos}
                tipoLista="curso"

                funcExcluir={excluirCurso}
                funcEditar={preEditar}

                listaGeneros={listaAreas}
                fnResumo={resumoDoCurso}
            />

            <Footer />
        </>
    );
};

export default CadastroCurso;