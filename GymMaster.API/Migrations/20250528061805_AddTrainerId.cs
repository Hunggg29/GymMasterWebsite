using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymMaster.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTrainerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainers_Users_UserId",
                table: "Trainers");

            migrationBuilder.DropIndex(
                name: "IX_Trainers_UserId",
                table: "Trainers");

            migrationBuilder.AddColumn<int>(
                name: "TrainerId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TrainerId",
                table: "Users",
                column: "TrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Trainers_TrainerId",
                table: "Users",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "TrainerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Trainers_TrainerId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TrainerId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TrainerId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Trainers_UserId",
                table: "Trainers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainers_Users_UserId",
                table: "Trainers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
