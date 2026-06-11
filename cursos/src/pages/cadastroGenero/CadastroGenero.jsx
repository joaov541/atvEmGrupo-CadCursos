import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import "./CadastroGenero.css"
import Cadastro from "../../components/cadastro/Cadastro"
import { useEffect, useState } from "react"
import api from "../../services/services"
import Lista from "../../components/lista/Lista"

//sweet alert personalizado
import { Alerta } from "../../components/alerta/Alerta"

//biblioteca de alertas
import Swal from "sweetalert2"

const CadastroGenero = () => {
    //states e variáveris
    const [valor, setValor] = useState("")

    const [idEditar, setIdEditar] = useState(0)
    const [editar, setEditar] = useState(false)

    const [listaGeneros, setListaGeneros] = useState([])
    const [idGeneroEditado, setIdGeneroEditado] = useState(null)

    //ciclo de vida e funções
    const cadastrarGenero = async (e) => {

        e.preventDefault()

        // validação
        if (valor.trim().length == 0) {

            Alerta({
                title: "Cadastro de Gênero",
                text: "Gênero deve ser preenchido antes de cadastrar!!",
                icon: "warning",
                confirmButtonText: "OK",
            })
            // alert("Gênero deve ser preenchido antes de cadastrar!!")
            return false
        }

        const objCadastro = {
            nome: valor
        }

        try {

            const retornoAPI = await api.post("/Genero", objCadastro)

            if (retornoAPI.status == 201) {

                Alerta({
                    title: "Cadastro de Gênero",
                    text: `Gênero ${objCadastro.nome} cadastrado com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK",
                })


                limparFormulario()

                // atualiza a lista automaticamente
                getGeneros()

            } else {

                Alerta({
                    title: "Cadastro de Gênero",
                    text: `Houve algum problema para cadastrar...`,
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }

        } catch (error) {

            Alerta({
                title: "Cadastro de Gênero",
                text: `Erro na chamada da API...`,
                icon: "error",
                confirmButtonText: "OK",
            })

            console.log(error)
        }

        return false
    }

    //reseta o formulário e esconde o botão
    const limparFormulario = () => {
        setValor("")
        setEditar(false)
        setIdEditar(0)
    }

    const excluirGenero = async (item) => {

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

        // se clicar em cancelar
        if (!result.isConfirmed) {
            return
        }

        try {

            await api.delete(`/Genero/${item.idGenero}`)

            // remove da lista na tela
            const novaLista = listaGeneros.filter(
                genero => genero.idGenero !== item.idGenero
            )

            setListaGeneros(novaLista)

            Alerta({
                title: "Excluir Gênero",
                text: "Gênero excluído com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
            })

        } catch (error) {

            console.log(error)

            Alerta({
                title: "Excluir Gênero",
                text: "Erro ao excluir o gênero :(",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    }

    const preEditar = (item) => {
        //joga os dados no formulário
        setIdEditar(item.idGenero)
        setValor(item.nome)
        setEditar(true)
        console.log(item)
    }


    //EDITAR
    const editarGenero = async (e) => {

        e.preventDefault()

        if (valor.trim().length == 0) {
           Alerta({
                title: "Editar Gênero",
                text: `Gênero deve ser preenchido`,
                icon: "warning",
                confirmButtonText: "OK",
            })
            return false
        }

        const objEditar = {
            nome: valor
        }

        try {

            const retornoAPI = await api.put(`/Genero/${idEditar}`, objEditar
            )

            if (retornoAPI.status == 200 || retornoAPI.status == 204) {

                const novaLista = listaGeneros.map((genero) => {

                    if (genero.idGenero == idEditar) {
                        return {
                            ...genero,
                            nome: valor
                        }
                    }

                    return genero

                })

                limparFormulario()
                getGeneros()

                setListaGeneros(novaLista)

                Alerta({
                    title: "Editar Gênero",
                    text: `Gênero editado com sucesso!`,
                    icon: "success"
                })

            } else {

                Alerta({
                    title: "Editar Gênero",
                    text: `Erro ao editar o Gênero :(`,
                    icon: "success"
                })
            }

        } catch (error) {

            console.log(error)

           Alerta({
                title: "Editar Gênero",
                text: `Erro na chamada da API`,
                icon: "error"
            })
        }

        return false
    }

    useEffect(() => {
        //chamar os dados da api
        getGeneros()
    }, [])

    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero")//chama a api
            const dados = retornoAPI.data//extrai os dados retornados
            setListaGeneros(dados)//guarda os dados no state (já exibe na lista)

        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
                text: `Erro ao retornar os dados`,
                icon: "error"
            })
        }
    }

    //o jsx
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gêneros"
                    visibilidade="none"
                    placeholder="gênero"

                    //state
                    valor={valor}
                    //função para cancelar a pré edição
                    cancelarEdicao={limparFormulario}
                    setValor={setValor}
                    funcCadastro={editar ? editarGenero : cadastrarGenero}
                    btnEditar={editar}

                />

                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"


                    funcExcluir={excluirGenero}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero