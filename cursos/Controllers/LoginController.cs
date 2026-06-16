using Cursos.DTO;
using Cursos.Interfaces;
using Cursos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Cursos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly IUsuarioRepository _usuarioRepository;

    public LoginController(IUsuarioRepository usuarioRepository)
    {
        _usuarioRepository = usuarioRepository;
    }

    [HttpPost]
    public IActionResult Login(LoginDTO loginDto)
    {
        try
        {
            Usuario usuarioBuscado = _usuarioRepository.BuscarPorEmailESenha(
                loginDto.Email!,
                loginDto.Senha!
            );

            if (usuarioBuscado == null)
            {
                return NotFound(new { mensagem = "Email ou senha inválidos." });
            }

            // CLAIMS (dados dentro do token)
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario),
                new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email!),
                new Claim(ClaimTypes.Name, usuarioBuscado.Nome!)
            };

            // CHAVE SECRETA
            var secretKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes("filmes-chave-autenticacao-webapi-dev")
            );

            // CREDENCIAIS
            var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            // TOKEN
            var token = new JwtSecurityToken(
                issuer: "api_filmes",
                audience: "api_filmes",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
        catch (Exception erro)
        {
            return BadRequest(new { erro = erro.Message });
        }
    }
}