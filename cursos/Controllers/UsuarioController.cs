using Cursos.DTO;
using Cursos.Interfaces;
using Cursos.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cursos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioRepository _usuarioRepository;

    public UsuarioController(IUsuarioRepository usuarioRepository)
    {
        _usuarioRepository = usuarioRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            var usuarios = _usuarioRepository.Listar();
            return Ok(usuarios);
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        try
        {
            var usuario = _usuarioRepository.BuscarPorId(id);

            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            return Ok(usuario);
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPost]
    public IActionResult Post(Usuario usuario)
    {
        try
        {
            _usuarioRepository.Cadastrar(usuario);
            return Ok(new { mensagem = "Usuário cadastrado com sucesso!" });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut("{id}")]
    public IActionResult PutUrl(string id, Usuario usuario)
    {
        try
        {
            var usuarioBuscado = _usuarioRepository.BuscarPorId(id);

            if (usuarioBuscado == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            _usuarioRepository.AtualizarIdUrl(id, usuario);

            return Ok(new { mensagem = "Usuário atualizado com sucesso!" });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut]
    public IActionResult PutBody(Usuario usuario)
    {
        try
        {
            _usuarioRepository.AtualizarIdCorpo(usuario);
            return Ok(new { mensagem = "Usuário atualizado com sucesso!" });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        try
        {
            var usuarioBuscado = _usuarioRepository.BuscarPorId(id);

            if (usuarioBuscado == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            _usuarioRepository.Deletar(id);

            return Ok(new { mensagem = "Usuário deletado com sucesso!" });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }
}