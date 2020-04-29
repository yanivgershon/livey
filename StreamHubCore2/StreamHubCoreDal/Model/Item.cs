﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace StreamHubCoreDal.Models
{
    public class Item
    {
        public Item()
        {
            this.Categories = new HashSet<Category>(); //defines many to many
            this.Platforms = new HashSet<Platform>(); //defines many to many
        }

        [Key]
        [Column(Order = 1)]
        public int ItemID { get; set; }

        public string ItemTitle { get; set; }

        public string ItemURL { get; set; }

        public string ItemDescription { get; set; }

        public string ItemTags { get; set; }

        [Column(TypeName = "bigint")]
        public int ItemStartDate { get; set; }
        public DateTime ItemStartDateObj { get; set; }
        public DateTime ItemEndDateObj { get; set; }
        public int ItemDuration { get; set; }

        public string ItemOwner { get; set; }

        public int PlatformID { get; set; }

        public string ItemImgURL { get; set; }
<<<<<<< HEAD
        public string ScarpingSource { get; set; }
=======
        public DateTime createDate { get; set; }
>>>>>>> 20aed989ee8817040bc118311ac876257b850cf6

        public virtual ICollection<Category> Categories { get; set; }
        [NotMapped]
        public virtual ICollection<Platform> Platforms { get; set; }
    }
}