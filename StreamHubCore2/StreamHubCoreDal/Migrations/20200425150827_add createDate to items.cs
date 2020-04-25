using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StreamHubCoreDal.Migrations
{
    public partial class addcreateDatetoitems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "createDate",
                table: "Items",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "createDate",
                table: "Items");
        }
    }
}
