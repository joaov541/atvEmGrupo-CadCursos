using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Cursos.Models;

[Table("Area")]
public partial class Area
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string IdArea { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [InverseProperty("IdAreaNavigation")]
    public virtual ICollection<Curso> Cursos { get; set; } = new List<Curso>();


}
