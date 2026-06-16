import "./alerta.css"
import Swal from "sweetalert2"

export const Alerta = ({
     title, 
     text, 
     icon, 
     showCancelButton = null,
     confirmButtonText = null,
     cancelButtonText = null,
     cancelButtonColor = "#d33",
    confirmButtonColor = "#d6a100ff",

    }) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
     })
    
}


