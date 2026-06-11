import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "./CadastroArea.css";
import Cadastro from "../components/cadastro/Cadastro";
import { useEffect, useState } from "react";
import api from "../services/services";
import Lista from "../components/lista/Lista";
import { Alerta } from "../components/alerta/Alerta";

const CadastroArea = () => {

    // States
    const [valor, setValor] = useState("")

    const [idEditar, setIdEditar] = useState(0)
    const [editar, setEditar] = useState(false)

    const [listaAreas, setListaAreas] = useState([])

    // Cadastrar Área
    const cadastrarArea = async (e) => {

        e.preventDefault()

        if (valor.trim().length === 0) {

            Alerta({
                title: "Cadastro de Área",
                text: "Área deve ser preenchida antes de cadastrar!",
                icon: "warning",
                confirmButtonText: "OK",
            })

            return false
        }

        const objCadastro = {
            nome: valor
        }

        try {

            const retornoAPI = await api.post("/Area", objCadastro)

            if (retornoAPI.status === 201) {

                Alerta({
                    title: "Cadastro de Área",
                    text: `Área ${objCadastro.nome} cadastrada com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK",
                })

                limparFormulario()
                getAreas()

            } else {

                Alerta({
                    title: "Cadastro de Área",
                    text: "Houve algum problema para cadastrar...",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }

        } catch (error) {

            console.log(error)

            Alerta({
                title: "Cadastro de Área",
                text: "Erro na chamada da API...",
                icon: "error",
                confirmButtonText: "OK",
            })
        }

        return false
    }

    // Limpar formulário
    const limparFormulario = () => {
        setValor("")
        setEditar(false)
        setIdEditar(0)
    }

    // Excluir Área
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
        })

        if (!result.isConfirmed) {
            return
        }

        try {

            await api.delete(`/Area/${item.idArea}`)

            const novaLista = listaAreas.filter(
                area => area.idArea !== item.idArea
            )

            setListaAreas(novaLista)

            Alerta({
                title: "Excluir Área",
                text: "Área excluída com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            })

        } catch (error) {

            console.log(error)

            Alerta({
                title: "Excluir Área",
                text: "Erro ao excluir a área :(",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    }

    // Pré edição
    const preEditar = (item) => {

        setIdEditar(item.idArea)
        setValor(item.nome)
        setEditar(true)

        console.log(item)
    }

    // Editar Área
    const editarArea = async (e) => {

        e.preventDefault()

        if (valor.trim().length === 0) {

            Alerta({
                title: "Editar Área",
                text: "Área deve ser preenchida",
                icon: "warning",
                confirmButtonText: "OK",
            })

            return false
        }

        const objEditar = {
            nome: valor
        }

        try {

            const retornoAPI = await api.put(
                `/Area/${idEditar}`,
                objEditar
            )

            if (
                retornoAPI.status === 200 ||
                retornoAPI.status === 204
            ) {

                const novaLista = listaAreas.map((area) => {

                    if (area.idArea === idEditar) {
                        return {
                            ...area,
                            nome: valor
                        }
                    }

                    return area
                })

                setListaAreas(novaLista)

                limparFormulario()
                getAreas()

                Alerta({
                    title: "Editar Área",
                    text: "Área editada com sucesso!",
                    icon: "success"
                })

            } else {

                Alerta({
                    title: "Editar Área",
                    text: "Erro ao editar a Área :(",
                    icon: "error"
                })
            }

        } catch (error) {

            console.log(error)

            Alerta({
                title: "Editar Área",
                text: "Erro na chamada da API",
                icon: "error"
            })
        }

        return false
    }

    // Buscar Áreas
    const getAreas = async () => {

        try {

            const retornoAPI = await api.get("/Area")
            const dados = retornoAPI.data

            setListaAreas(dados)

        } catch (error) {

            console.log(error)

            Alerta({
                title: "Cadastro de Área",
                text: "Erro ao retornar os dados",
                icon: "error"
            })
        }
    }

    useEffect(() => {
        getAreas()
    }, [])

    return (
        <>
            <Header />

            <main>

                <Cadastro
                    tituloCadastro="Cadastro de Áreas"
                    visibilidade="none"
                    placeholder="Área"

                    valor={valor}
                    setValor={setValor}

                    cancelarEdicao={limparFormulario}

                    funcCadastro={
                        editar
                            ? editarArea
                            : cadastrarArea
                    }

                    btnEditar={editar}
                />

                <Lista
                    tituloLista="Lista de Áreas"
                    visibilidade="none"

                    lista={listaAreas}
                    tipoLista="area"

                    funcExcluir={excluirArea}
                    funcEditar={preEditar}
                />

            </main>

            <Footer />
        </>
    )
}

export default CadastroArea