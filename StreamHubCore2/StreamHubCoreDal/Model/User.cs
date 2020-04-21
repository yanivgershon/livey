using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace StreamHubCoreDal.Models
{
    public class User
    {
        [Key]
        [Column(Order = 1)]
        public int UserID { get; set; }

        public string Username { get; set; }

        public string UserPassword { get; set; }

        public string SocialID { get; set; }

        [Display(Name = "Platform")]
        public virtual int PlatformID { get; set; }

        [ForeignKey("PlatformID")]
        public virtual Platform Platforms{ get; set; }


    }
}