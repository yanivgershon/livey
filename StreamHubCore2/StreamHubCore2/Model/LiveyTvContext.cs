using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LiveyServer.Models
{
    public class LiveyTvContext : DbContext
    {
      
        
        public LiveyTvContext(DbContextOptions options) : base(options)
        //: base("name=LiveyTvConnectionString")
        {
          //  Database.SetInitializer(new MigrateDatabaseToLatestVersion<LiveyTvContext, Migrations.Configuration>());
            //Database.SetInitializer<LiveyTvContext>(new LiveyTvContext());
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserFavoriteItem> UserFavoriteItems { get; set; }
    }
}