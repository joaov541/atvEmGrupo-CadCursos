using Cursos.BdContextCursos;
using Cursos.Interfaces;
using Cursos.Models;

namespace Cursos.Repositories;

public class AreaRepository : IAreaRepository
{
    private readonly CursosContext _context;

    public AreaRepository(CursosContext context)
    {
        _context = context;
    }

    public List<Area> Listar()
    {
        return _context.Areas.ToList();
    }

    public Area BuscarPorId(string id)
    {
        return _context.Areas.FirstOrDefault(
            x => x.IdArea == id
        )!;
    }

    public void Cadastrar(Area area)
    {
        area.IdArea = Guid.NewGuid().ToString();

        _context.Areas.Add(area);

        _context.SaveChanges();
    }

    public void AtualizarIdCorpo(Area area)
    {
        _context.Areas.Update(area);

        _context.SaveChanges();
    }

    public void Deletar(string id)
    {
        Area areaBuscada = _context.Areas.FirstOrDefault(
            x => x.IdArea == id
        )!;

        _context.Areas.Remove(areaBuscada);

        _context.SaveChanges();
    }
}