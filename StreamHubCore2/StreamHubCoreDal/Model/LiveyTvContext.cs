using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Web;

namespace StreamHubCoreDal.Models
{
    public class LiveyTvContext : DbContext
    {
      
        
        public LiveyTvContext(DbContextOptions options) : base(options)
        //: base("name=LiveyTvConnectionString")
        {
          //  Database.SetInitializer(new MigrateDatabaseToLatestVersion<LiveyTvContext, Migrations.Configuration>());
            //Database.SetInitializer<LiveyTvContext>(new LiveyTvContext());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemCategories>()
                .HasKey(c => new { c.CategoryID, c.ItemID });
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserFavoriteItem> UserFavoriteItems { get; set; }

        public DbSet<ItemCategories> itemCategories { get; set; }
    }
}