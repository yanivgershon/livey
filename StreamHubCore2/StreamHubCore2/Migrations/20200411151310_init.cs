using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StreamHubCore2.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Platforms",
                columns: table => new
                {
                    PlatformID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PlatformName = table.Column<string>(nullable: true),
                    PlatdormParentID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Platforms", x => x.PlatformID);
                });

            migrationBuilder.CreateTable(
                name: "UserFavoriteItems",
                columns: table => new
                {
                    UserFavoriteItemID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsFavorite = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavoriteItems", x => x.UserFavoriteItemID);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemTitle = table.Column<string>(nullable: true),
                    ItemURL = table.Column<string>(nullable: true),
                    ItemDescription = table.Column<string>(nullable: true),
                    ItemTags = table.Column<string>(nullable: true),
                    ItemStartDate = table.Column<long>(type: "bigint", nullable: false),
                    ItemStartDateObj = table.Column<DateTime>(nullable: false),
                    ItemDuration = table.Column<int>(nullable: false),
                    ItemOwner = table.Column<string>(nullable: true),
                    PlatformID = table.Column<int>(nullable: false),
                    ItemImgURL = table.Column<string>(nullable: true),
                    UserFavoriteItemID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemID);
                    table.ForeignKey(
                        name: "FK_Items_Platforms_PlatformID",
                        column: x => x.PlatformID,
                        principalTable: "Platforms",
                        principalColumn: "PlatformID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_UserFavoriteItems_UserFavoriteItemID",
                        column: x => x.UserFavoriteItemID,
                        principalTable: "UserFavoriteItems",
                        principalColumn: "UserFavoriteItemID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: true),
                    UserPassword = table.Column<string>(nullable: true),
                    SocialID = table.Column<string>(nullable: true),
                    PlatformID = table.Column<int>(nullable: false),
                    UserFavoriteItemID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Platforms_PlatformID",
                        column: x => x.PlatformID,
                        principalTable: "Platforms",
                        principalColumn: "PlatformID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_UserFavoriteItems_UserFavoriteItemID",
                        column: x => x.UserFavoriteItemID,
                        principalTable: "UserFavoriteItems",
                        principalColumn: "UserFavoriteItemID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CategoryName = table.Column<string>(nullable: true),
                    CategoryID1 = table.Column<int>(nullable: true),
                    ItemID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryID);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_CategoryID1",
                        column: x => x.CategoryID1,
                        principalTable: "Categories",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Categories_Items_ItemID",
                        column: x => x.ItemID,
                        principalTable: "Items",
                        principalColumn: "ItemID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CategoryID1",
                table: "Categories",
                column: "CategoryID1");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ItemID",
                table: "Categories",
                column: "ItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PlatformID",
                table: "Items",
                column: "PlatformID");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserFavoriteItemID",
                table: "Items",
                column: "UserFavoriteItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PlatformID",
                table: "Users",
                column: "PlatformID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserFavoriteItemID",
                table: "Users",
                column: "UserFavoriteItemID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Platforms");

            migrationBuilder.DropTable(
                name: "UserFavoriteItems");
        }
    }
}
