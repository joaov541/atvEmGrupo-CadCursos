namespace Cursos.DTO
{
    public class CriarUsuarioDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public IFormFile? Imagem { get; set; }


    }
}