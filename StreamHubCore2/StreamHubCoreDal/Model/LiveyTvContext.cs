using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StreamHubCoreDal.Models;
using System.Configuration;
using System.IO;
using Microsoft.Extensions.Configuration;
using StreamHubCoreDal.AppConfig;

namespace StreamHubCoreDal.Models
{
    public class LiveyTvContext : DbContext
    {

        AppConfiguration AppConfiguration = new AppConfiguration();
        public LiveyTvContext(DbContextOptions options) : base(options)
        //: base("name=LiveyTvConnectionString")
        {

          //  Database.SetInitializer(new MigrateDatabaseToLatestVersion<LiveyTvContext, Migrations.Configuration>());
            //Database.SetInitializer<LiveyTvContext>(new LiveyTvContext());
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            string _connectionString = string.Empty;
            _connectionString = AppConfiguration.ConnectionString;
            /*
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionString").GetSection("DataConnection").Value;
            var appSetting = root.GetSection("ApplicationSettings");

           // string conStr = 
           */

            optionsBuilder.UseSqlServer(AppConfiguration.ConnectionString);
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