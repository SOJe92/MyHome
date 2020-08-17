using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyHome.Model.App.Resources.Get
{
    [Table("menu")]
    public class Menu
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Created { get; set; }

        public Guid CreatedBy { get; set; }

        public List<MenuItem> Items { get; set; }
    }
}
