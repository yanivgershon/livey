using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamHubCoreDal.Models
{
    public class Category
    {
        public Category()
        {
            this.Items = new HashSet<Item>(); //defines many to many
            this.SubCategory = new HashSet<Category>(); //defines many to many
        }

        [Key]
        [Column(Order = 1)]
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        [NotMapped]
        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<Category> SubCategory { get; set; }
    }
}