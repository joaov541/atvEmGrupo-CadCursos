using Cursos.Models;

namespace Cursos.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuario> Listar();

        Usuario BuscarPorId(string id);

        Usuario BuscarPorEmailESenha(string email, string senha);

        void Cadastrar(Usuario usuario);

        void AtualizarIdUrl(string id, Usuario usuario);

        void AtualizarIdCorpo(Usuario usuario);

        void Deletar(string id);
    }
}