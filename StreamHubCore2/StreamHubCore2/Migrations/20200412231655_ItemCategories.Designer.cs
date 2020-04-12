﻿// <auto-generated />
using System;
using LiveyServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace StreamHubCore2.Migrations
{
    [DbContext(typeof(LiveyTvContext))]
    [Migration("20200412231655_ItemCategories")]
    partial class ItemCategories
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LiveyServer.Models.Category", b =>
                {
                    b.Property<int>("CategoryID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CategoryID1");

                    b.Property<string>("CategoryName");

                    b.Property<int?>("ItemID");

                    b.HasKey("CategoryID");

                    b.HasIndex("CategoryID1");

                    b.HasIndex("ItemID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("LiveyServer.Models.Item", b =>
                {
                    b.Property<int>("ItemID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ItemDescription");

                    b.Property<int>("ItemDuration");

                    b.Property<string>("ItemImgURL");

                    b.Property<string>("ItemOwner");

                    b.Property<long>("ItemStartDate")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("ItemStartDateObj");

                    b.Property<string>("ItemTags");

                    b.Property<string>("ItemTitle");

                    b.Property<string>("ItemURL");

                    b.Property<int>("PlatformID");

                    b.Property<int?>("UserFavoriteItemID");

                    b.HasKey("ItemID");

                    b.HasIndex("PlatformID");

                    b.HasIndex("UserFavoriteItemID");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("LiveyServer.Models.ItemCategories", b =>
                {
                    b.Property<int>("CategoryID");

                    b.Property<int>("ItemID");

                    b.HasKey("CategoryID", "ItemID");

                    b.HasIndex("ItemID");

                    b.ToTable("itemCategories");
                });

            modelBuilder.Entity("LiveyServer.Models.Platform", b =>
                {
                    b.Property<int>("PlatformID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PlatdormParentID");

                    b.Property<string>("PlatformName");

                    b.HasKey("PlatformID");

                    b.ToTable("Platforms");
                });

            modelBuilder.Entity("LiveyServer.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PlatformID");

                    b.Property<string>("SocialID");

                    b.Property<int?>("UserFavoriteItemID");

                    b.Property<string>("UserPassword");

                    b.Property<string>("Username");

                    b.HasKey("UserID");

                    b.HasIndex("PlatformID");

                    b.HasIndex("UserFavoriteItemID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LiveyServer.Models.UserFavoriteItem", b =>
                {
                    b.Property<int>("UserFavoriteItemID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsFavorite");

                    b.HasKey("UserFavoriteItemID");

                    b.ToTable("UserFavoriteItems");
                });

            modelBuilder.Entity("LiveyServer.Models.Category", b =>
                {
                    b.HasOne("LiveyServer.Models.Category")
                        .WithMany("SubCategory")
                        .HasForeignKey("CategoryID1");

                    b.HasOne("LiveyServer.Models.Item")
                        .WithMany("Categories")
                        .HasForeignKey("ItemID");
                });

            modelBuilder.Entity("LiveyServer.Models.Item", b =>
                {
                    b.HasOne("LiveyServer.Models.Platform")
                        .WithMany("Items")
                        .HasForeignKey("PlatformID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LiveyServer.Models.UserFavoriteItem")
                        .WithMany("Items")
                        .HasForeignKey("UserFavoriteItemID");
                });

            modelBuilder.Entity("LiveyServer.Models.ItemCategories", b =>
                {
                    b.HasOne("LiveyServer.Models.Category", "Categories")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LiveyServer.Models.Item", "Items")
                        .WithMany()
                        .HasForeignKey("ItemID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LiveyServer.Models.User", b =>
                {
                    b.HasOne("LiveyServer.Models.Platform", "Platforms")
                        .WithMany()
                        .HasForeignKey("PlatformID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LiveyServer.Models.UserFavoriteItem")
                        .WithMany("Users")
                        .HasForeignKey("UserFavoriteItemID");
                });
#pragma warning restore 612, 618
        }
    }
}
