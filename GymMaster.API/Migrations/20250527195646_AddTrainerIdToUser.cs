using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymMaster.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTrainerIdToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Xóa index cũ nếu tồn tại
            migrationBuilder.Sql("IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Users_TrainerId' AND object_id = OBJECT_ID('Users')) DROP INDEX IX_Users_TrainerId ON Users;");

            // Xóa foreign key cũ nếu tồn tại
            migrationBuilder.Sql("IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Users_Trainers_TrainerId') ALTER TABLE Users DROP CONSTRAINT FK_Users_Trainers_TrainerId;");

            // Tạo index mới (không unique)
            migrationBuilder.CreateIndex(
                name: "IX_Users_TrainerId",
                table: "Users",
                column: "TrainerId");

            // Tạo foreign key mới
            migrationBuilder.AddForeignKey(
                name: "FK_Users_Trainers_TrainerId",
                table: "Users",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "TrainerId",
                onDelete: ReferentialAction.SetNull);
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
        }
    }
} 