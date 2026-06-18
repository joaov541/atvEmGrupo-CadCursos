using Cursos.DTO;
using Cursos.Interfaces;
using Cursos.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cursos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AreaController : ControllerBase
{
    private readonly IAreaRepository _areaRepository;

    public AreaController(IAreaRepository areaRepository)
    {
        _areaRepository = areaRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            var areas = _areaRepository.Listar();

            var dto = areas.Select(x => new AreaDTO
            {
                IdArea = x.IdArea,
                Nome = x.Nome
            });

            return Ok(dto);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        try
        {
            var area = _areaRepository.BuscarPorId(id);

            if (area == null)
                return NotFound();

            var dto = new AreaDTO
            {
                IdArea = area.IdArea,
                Nome = area.Nome
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPost]
    public IActionResult Post(CriarAreaDTO dto)
    {
        try
        {
            var area = new Area
            {
                IdArea = Guid.NewGuid().ToString(),
                Nome = dto.Nome
            };

            _areaRepository.Cadastrar(area);

            return Ok(new AreaDTO
            {
                IdArea = area.IdArea,
                Nome = area.Nome
            });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }
    [HttpPut]
    public IActionResult Put(AreaDTO dto)
    {
        try
        {
            var area = new Area
            {
                IdArea = dto.IdArea,
                Nome = dto.Nome
            };

            _areaRepository.AtualizarIdCorpo(area);

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        try
        {
            _areaRepository.Deletar(id);

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}