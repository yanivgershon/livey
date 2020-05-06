using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StreamHubCoreDal.Migrations
{
    public partial class add2fieldstoitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ItemEndDateObj",
                table: "Items",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ScarpingSource",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemEndDateObj",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ScarpingSource",
                table: "Items");
        }
    }
}
