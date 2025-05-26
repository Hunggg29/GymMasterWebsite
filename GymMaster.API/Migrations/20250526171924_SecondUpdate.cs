using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymMaster.API.Migrations
{
    /// <inheritdoc />
    public partial class SecondUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainer_Users_UserId",
                table: "Trainer");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSessions_Trainer_TrainerId",
                table: "TrainingSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trainer",
                table: "Trainer");

            migrationBuilder.RenameTable(
                name: "Trainer",
                newName: "Trainers");

            migrationBuilder.RenameIndex(
                name: "IX_Trainer_UserId",
                table: "Trainers",
                newName: "IX_Trainers_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trainers",
                table: "Trainers",
                column: "TrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainers_Users_UserId",
                table: "Trainers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSessions_Trainers_TrainerId",
                table: "TrainingSessions",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "TrainerId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainers_Users_UserId",
                table: "Trainers");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSessions_Trainers_TrainerId",
                table: "TrainingSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trainers",
                table: "Trainers");

            migrationBuilder.RenameTable(
                name: "Trainers",
                newName: "Trainer");

            migrationBuilder.RenameIndex(
                name: "IX_Trainers_UserId",
                table: "Trainer",
                newName: "IX_Trainer_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trainer",
                table: "Trainer",
                column: "TrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainer_Users_UserId",
                table: "Trainer",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSessions_Trainer_TrainerId",
                table: "TrainingSessions",
                column: "TrainerId",
                principalTable: "Trainer",
                principalColumn: "TrainerId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
