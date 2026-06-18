namespace Cursos.DTO
{
    public class CriarCurso
    {
        public string Nome { get; set; }
        public string IdArea { get; set; }
        public IFormFile? Imagem { get; set; }
    }
}