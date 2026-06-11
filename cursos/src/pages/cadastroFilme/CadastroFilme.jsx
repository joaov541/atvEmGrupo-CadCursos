import { useEffect, useState } from "react"
import "./CadastroFilme.css"

import api from "../../services/services"

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"

import { Alerta } from "../../components/alerta/Alerta"

const CadastroFilme = () => {

    const [valor, setValor] = useState("")
    const [listaGeneros, setListaGeneros] = useState([])
    const [listaFilmes, setlistaFilmes] = useState([])
    const [genero, setGenero] = useState("")
    const [idEditar, setIdEditar] = useState(0)
    const [editar, setEditar] = useState(false)
    const [imagem, setImagem] = useState(null)

//--------------------------------------GET FILMES-------------------------------------
    const getFilmes = async () => {
        try {
            const retornoAPI = await api.get("/Filme")
            setlistaFilmes(retornoAPI.data)
        } catch (error) {
            console.log(error)
        }
    }
//---------------------------------------------------------------------------------------





//----------------------------------------GET GENEROS--------------------------------------
    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero")
            setListaGeneros(retornoAPI.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFilmes()
        getGeneros()
    }, [])
//------------------------------------------------------------------------------





//------------------------------------CADASTRAR--------------------------------------
    const cadastroFilme = async (e) => {
    e.preventDefault()

    const idGeneroNumber = Number(genero)

    if (!valor.trim() || !genero || isNaN(idGeneroNumber)) {
        Alerta({
            title: "Cadastro de Filme",
            text: "Preencha nome e gênero corretamente!",
            icon: "warning",
            confirmButtonText: "OK",
        })
        return
    }

    const formData = new FormData()

    formData.append("titulo", valor.trim())
    formData.append("idGenero", idGeneroNumber)

    if (imagem) {
    formData.append("imagem", imagem)
}

    try {

        
        if (editar) {
            await api.put(`/Filme/${idEditar}`, formData)

            Alerta({
                title: "Filme atualizado",
                text: "Filme editado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            })
        }

        else {
            await api.post("/Filme", formData)

            Alerta({
                title: "Cadastro de Filmes",
                text: `Filme ${valor} cadastrado com sucesso!`,
                icon: "success",
                confirmButtonText: "OK",
            })
        }

        limparFormulario()
        getFilmes()

    } catch (error) {
        console.log("ERRO:", error.response?.data || error)

        Alerta({
            title: "Erro",
            text: "Erro ao salvar filme",
            icon: "error",
            confirmButtonText: "OK",
        })
    }
}
//-----------------------------------------------------------------------------------






//-----------------------------------------EXCLUIR------------------------------------
    const excluirFilme = async (item) => {
        const result = await Alerta({
            title: "Você tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        })

        if (!result.isConfirmed) return

        try {
            await api.delete(`/Filme/${item.idFilme}`)

            setlistaFilmes(listaFilmes.filter(f => f.idFilme !== item.idFilme))

            Alerta({
                title: "Excluir Filme",
                text: "Filme excluído com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            })

        } catch (error) {
            console.log(error)
        }
    }
//----------------------------------------------------------------------------------





//---------------------------EDITAR------------------------------
    const preEditar = (item) => {
        setValor(item.titulo)
        setGenero(item.idGenero)
        setEditar(true)
        setIdEditar(item.idFilme)
    }
//---------------------------------------------------------------





//---------------------------LIMPAR-----------------------------
    const limparFormulario = () => {
        setValor("")
        setGenero("")
        setEditar(false)
        setImagem(null)
        setIdEditar(0)
    }
//--------------------------------------------------------------





    return (
        <>
            <Header />

            <Cadastro
                tituloCadastro="Cadastro de Filmes"
                placeholder="filme"

                valor={valor}
                setValor={setValor}

                genero={genero}
                setGenero={setGenero}

                imagem={imagem}
                setImagem={setImagem}

                funcCadastro={cadastroFilme}
                cancelarEdicao={limparFormulario}
                btnEditar={editar}

                listaGeneros={listaGeneros}
                />

            <Lista
                tituloLista="Lista de Filmes"
                lista={listaFilmes}
                tipoLista="filme"
                funcExcluir={excluirFilme}
                funcEditar={preEditar}
                listaGeneros={listaGeneros}
            />

            <Footer />
        </>
    )
}

export default CadastroFilme