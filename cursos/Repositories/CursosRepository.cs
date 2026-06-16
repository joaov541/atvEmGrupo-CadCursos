using Cursos.BdContextCursos;
using Cursos.Interfaces;
using Cursos.Models;

namespace Cursos.Repositories;

public class CursosRepository : ICursoRepository
{
    private readonly CursosContext _context;

    public CursosRepository(CursosContext context)
    {
        _context = context;
    }

    public List<Curso> Listar()
    {
        return _context.Cursos.ToList();
    }

    public Curso BuscarPorId(string id)
    {
        return _context.Cursos.FirstOrDefault(
            x => x.IdCurso == id
        )!;
    }

    public void Cadastrar(Curso curso)
    {
        _context.Cursos.Add(curso);

        _context.SaveChanges();
    }

    public void AtualizarIdUrl(string id, Curso curso)
    {
        Curso cursoBuscado =
            _context.Cursos.FirstOrDefault(
                x => x.IdCurso == id
            )!;

        cursoBuscado.Nome = curso.Nome;
        cursoBuscado.IdArea = curso.IdArea;
        cursoBuscado.Imagem = curso.Imagem;

        _context.Cursos.Update(cursoBuscado);

        _context.SaveChanges();
    }

    public void AtualizarIdCorpo(Curso curso)
    {
        _context.Cursos.Update(curso);

        _context.SaveChanges();
    }

    public void Deletar(string id)
    {
        Curso cursoBuscado =
            _context.Cursos.FirstOrDefault(
                x => x.IdCurso == id
            )!;

        _context.Cursos.Remove(cursoBuscado);

        _context.SaveChanges();
    }
}