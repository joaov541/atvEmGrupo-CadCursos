using Cursos.DTO;
using Cursos.Interfaces;
using Cursos.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cursos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CursosController : ControllerBase
{
    private readonly ICursoRepository _cursosRepository;

    public CursosController(ICursoRepository cursosRepository)
    {
        _cursosRepository = cursosRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var cursos = _cursosRepository.Listar();

        var cursosDto = cursos.Select(x => new RespostaCurso
        {
            IdCurso = x.IdCurso,
            Nome = x.Nome,
            Imagem = x.Imagem,
            IdArea = x.IdArea
        });

        return Ok(cursosDto);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        try
        {
            return Ok(_cursosRepository.BuscarPorId(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Post([FromForm] CriarCurso dto)
    {
        try
        {
            string imagemNome = null;

            if (dto.Imagem != null)
            {
                imagemNome = Guid.NewGuid() + Path.GetExtension(dto.Imagem.FileName);

                var pasta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(pasta))
                {
                    Directory.CreateDirectory(pasta);
                }

                var caminho = Path.Combine(pasta, imagemNome);

                using (var stream = new FileStream(caminho, FileMode.Create))
                {
                    dto.Imagem.CopyTo(stream);
                }
            }

            var curso = new Curso
            {
                IdCurso = Guid.NewGuid().ToString(),
                Nome = dto.Nome,
                IdArea = dto.IdArea,
                Imagem = imagemNome
            };

            _cursosRepository.Cadastrar(curso);

            return Ok(new
            {
                mensagem = "Curso cadastrado com sucesso!"
            });
        }
        catch (Exception erro)
        {
            return BadRequest(new
            {
                erro = erro.Message,
                inner = erro.InnerException?.Message
            });
        }
    }


    [HttpPut("{id}")]
    public IActionResult Put(string id, [FromForm] CriarCurso dto)
    {
        try
        {
            var curso = _cursosRepository.BuscarPorId(id);

            if (curso == null)
            {
                return NotFound();
            }

            curso.Nome = dto.Nome;
            curso.IdArea = dto.IdArea;

            _cursosRepository.AtualizarIdCorpo(curso);

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
            _cursosRepository.Deletar(id);

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}