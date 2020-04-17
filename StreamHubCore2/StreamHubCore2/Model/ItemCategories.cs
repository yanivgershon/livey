using LiveyServer.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LiveyServer.Models
{
    public class ItemCategories
    {

        public ItemCategories()
        {
            //this.Categories = new HashSet<Category>(); //defines many to many
            //this.Items = new HashSet<Item>(); //defines many to many
        }

        [Key]
        public int CategoryID { get; set; }
        [Key]
        public int ItemID { get; set; }


        public virtual Category Categories { get; set; }


     
        public virtual Item Items { get; set; }

        //[Key]
        //public virtual ICollection<Category> Categories { get; set; }

        //[Key]
        //public virtual ICollection<Item> Items { get; set; }


    }
}
