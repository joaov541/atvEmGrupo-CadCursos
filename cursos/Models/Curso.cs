using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Cursos.Models;

[Table("Curso")]
public partial class Curso
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string IdCurso { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string? Imagem { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [StringLength(40)]
    [Unicode(false)]
    public string? IdArea { get; set; }

    [ForeignKey("IdArea")]
    [InverseProperty("Cursos")]
    public virtual Area? IdAreaNavigation { get; set; }
}
