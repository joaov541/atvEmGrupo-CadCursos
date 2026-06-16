using Cursos.BdContextCursos;
using Cursos.Interfaces;
using Cursos.Models;

namespace Cursos.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly CursosContext _context;

    public UsuarioRepository(CursosContext context)
    {
        _context = context;
    }

    public List<Usuario> Listar()
    {
        return _context.Usuarios.ToList();
    }

    public Usuario BuscarPorId(string id)
    {
        return _context.Usuarios.FirstOrDefault(
            x => x.IdUsuario == id
        )!;
    }

    public void Cadastrar(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        _context.SaveChanges();
    }

    public void AtualizarIdUrl(string id, Usuario usuario)
    {
        Usuario usuarioBuscado =
            _context.Usuarios.FirstOrDefault(
                x => x.IdUsuario == id
            )!;

        usuarioBuscado.Nome = usuario.Nome;
        usuarioBuscado.Email = usuario.Email;
        usuarioBuscado.Senha = usuario.Senha;

        _context.Usuarios.Update(usuarioBuscado);
        _context.SaveChanges();
    }

    public void AtualizarIdCorpo(Usuario usuario)
    {
        _context.Usuarios.Update(usuario);
        _context.SaveChanges();
    }

    public void Deletar(string id)
    {
        Usuario usuarioBuscado =
            _context.Usuarios.FirstOrDefault(
                x => x.IdUsuario == id
            )!;

        _context.Usuarios.Remove(usuarioBuscado);
        _context.SaveChanges();
    }

    public Usuario BuscarPorEmailESenha(string email, string senha)
    {
        return _context.Usuarios.FirstOrDefault(
            x => x.Email == email && x.Senha == senha
        )!;
    }
    public Usuario BuscarPorEmail(string email)
    {
        throw new NotImplementedException();
    }
}