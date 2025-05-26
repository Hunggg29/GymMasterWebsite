using Microsoft.EntityFrameworkCore;
using GymMaster.API.Models;

namespace GymMaster.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<GymRoom> GymRoom { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<TrainningSession> TrainingSessions { get; set; }

        public DbSet<Trainer> Trainers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).IsRequired();
            });

            // Configure Plan entity
            modelBuilder.Entity<Plan>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Price)
                    .IsRequired()
                    .HasPrecision(18, 2);
            });

            // Configure Subscription entity
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Plan)
                .WithMany(p => p.Subscriptions)
                .HasForeignKey(s => s.PlanId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure ContactUs entity
            modelBuilder.Entity<ContactUs>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Message).IsRequired();
            });

            // Configure Feedback entity
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Message).IsRequired();
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId);
            });

            modelBuilder.Entity<TrainningSession>()
                .HasOne(ts => ts.Trainer)
                .WithMany(u => u.TrainingSessions)
                .HasForeignKey(ts => ts.TrainerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TrainningSession>()
                .HasOne(ts => ts.GymRoom)
                .WithMany(gr => gr.TrainningSessions)
                .HasForeignKey(ts => ts.RoomId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Payment entity
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount)
                    .IsRequired()
                    .HasPrecision(18, 2);
                entity.Property(e => e.PaymentMethod)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50);
                
                // Configure one-to-one relationship with Subscription
                entity.HasOne(p => p.Subscription)
                    .WithOne(s => s.Payment)
                    .HasForeignKey<Subscription>(s => s.PaymentId);
            });
        }
    }
} 