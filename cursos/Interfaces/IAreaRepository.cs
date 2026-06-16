using Cursos.Models;

namespace Cursos.Interfaces;

public interface IAreaRepository
{
    List<Area> Listar();

    Area BuscarPorId(string id);

    void Cadastrar(Area area);

    void AtualizarIdCorpo(Area area);

    void Deletar(string id);
}