import "./alerta.css"
import Swal from "sweetalert2"

export const Alerta = ({
     title, 
     text, 
     icon, 
     showCancelButton = false, // Mudado de null para false (padrão do Swal)
     confirmButtonText = "OK", // Deixando "OK" como padrão para evitar botões vazios
     cancelButtonText = "Cancelar", // Deixando "Cancelar" como padrão
     cancelButtonColor = "#d33",
     confirmButtonColor = "#d6a100", // CORRIGIDO: Removido o "ff" daqui!
}) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
    })
}