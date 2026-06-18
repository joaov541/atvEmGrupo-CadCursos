import { useEffect, useState } from "react";
import "./CadastroCurso.css";

import api from "../../services/services";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { LoadingIcon } from "../../components/loading/LoadingIcon";
import { Alerta } from "../../components/alerta/Alerta";
import { gerarResumo } from "../../services/IAServices";

const CadastroCurso = () => {
    const [valor, setValor] = useState("");
    const [listaAreas, setListaAreas] = useState([]);
    const [listaCursos, setListaCursos] = useState([]);
    const [area, setArea] = useState("");
    const [idEditar, setIdEditar] = useState("");
    const [editar, setEditar] = useState(false);
    const [imagem, setImagem] = useState(null);
    const [loading, setLoading] = useState(false);

    // GET CURSOS - Isolado com tratamento de falha
    const getCursos = async () => {
        try {
            const retornoAPI = await api.get("/Cursos");
            if (retornoAPI && retornoAPI.data) {
                setListaCursos(retornoAPI.data);
            }
        } catch (error) {
            console.error("Erro ao carregar os cursos da API:", error);
            // Evita que a lista fique null/undefined e quebre o layout
            setListaCursos([]); 
        }
    };

    // GET ÁREAS - Protegido contra falhas de rota ou CORS
    const getAreas = async () => {
        try {
            // Tenta a rota padrão do seu backend para Áreas
            const retornoAPI = await api.get("/Areas");
            if (retornoAPI && retornoAPI.data) {
                setListaAreas(retornoAPI.data);
            }
        } catch (error) {
            console.warn("Falha na rota secundária /Areas, tentando /Area...");
            try {
                // Segunda tentativa caso seu backend use o singular
                const retornoAPI = await api.get("/Area");
                if (retornoAPI && retornoAPI.data) {
                    setListaAreas(retornoAPI.data);
                }
            } catch (err) {
                console.error("Ambas as rotas de Área falharam no servidor:", err);
                setListaAreas([]); // Mantém um array vazio seguro para o layout não quebrar
                Alerta({
                    title: "Cadastro de Área",
                    text: "Erro ao retornar os dados das Áreas do servidor.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    useEffect(() => {
        getCursos();
        getAreas();
    }, []);

    // CADASTRAR / ATUALIZAR CURSO
    const cadastroCurso = async (e) => {
        e.preventDefault();

        if (!valor.trim() || !area.trim()) {
            Alerta({
                title: "Cadastro de Curso",
                text: "Preencha nome e área corretamente!",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        const formData = new FormData();
        formData.append("nome", valor.trim()); 
        formData.append("idArea", area);

        if (imagem) {
            formData.append("imagem", imagem);
        }

        try {
            if (editar) {
                await api.put(`/Cursos/${idEditar}`, formData);
                Alerta({
                    title: "Curso Atualizado",
                    text: "Curso editado com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                await api.post("/Cursos", formData);
                Alerta({
                    title: "Cadastro de Curso",
                    text: `Curso "${valor}" cadastrado com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }

            limparFormulario();
            getCursos();
        } catch (error) {
            console.error(error);
            Alerta({
                title: "Erro",
                text: "Erro ao salvar o curso. Verifique o console e a conexão.",
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
            await api.delete(`/Cursos/${item.idCurso}`);
            setListaCursos(listaCursos.filter(curso => curso.idCurso !== item.idCurso));
            Alerta({
                title: "Excluir Curso",
                text: "Curso excluído com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const preEditar = (item) => {
        setValor(item.nome || item.titulo || "");
        setArea(item.idArea || "");
        setEditar(true);
        setIdEditar(item.idCurso || "");
    };

    const limparFormulario = () => {
        setValor("");
        setArea("");
        setEditar(false);
        setImagem(null);
        setIdEditar("");
    };

   const resumoDoCurso = async (curso) => {
    try {
        setLoading(true); 
        
        const nomeCurso = curso.nome || curso.titulo;
        const termoBusca = `Curso de ${nomeCurso}`; 
        
       
        const resumoIA = await gerarResumo(termoBusca, {
            temperature: 0.4,
            max_tokens: 180
        });
        
        Alerta({
            title: `Resumo: ${nomeCurso}`,
            text: resumoIA,
            icon: "success",
            confirmButtonText: "Fechar",
        });
    } catch (error) {
        console.error(error);
        Alerta({
            title: "Erro",
            text: "Não foi possível gerar o resumo do curso no momento.",
            icon: "error",
            confirmButtonText: "Fechar",
        });
    } finally {
        setLoading(false); 
    }
};

    return (
        <>

            <LoadingIcon showHide={loading} />

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