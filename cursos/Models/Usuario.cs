using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Cursos.Models;

[Table("Usuario")]
[Index("Email", Name = "UQ__Usuario__A9D10534BD21A32C", IsUnique = true)]
public partial class Usuario
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string IdUsuario { get; set; } = Guid.NewGuid().ToString();

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [StringLength(256)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Senha { get; set; } = null!;
}
