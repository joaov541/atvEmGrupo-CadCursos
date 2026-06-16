using Cursos.Models;

namespace Cursos.Interfaces
{
    public interface ICursoRepository
    {
        List<Curso> Listar();

        Curso BuscarPorId(string id);

        void Cadastrar(Curso curso);

        void AtualizarIdCorpo(Curso curso);

        void Deletar(string id);
    }
}
