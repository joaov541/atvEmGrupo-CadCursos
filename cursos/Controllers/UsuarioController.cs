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

    
}