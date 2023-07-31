using System.Text.RegularExpressions;
using Api.Features.Producs.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Db;

class Dbc : DbContext
{
    public Dbc(DbContextOptions<Dbc> options)
        : base(options)
    {

    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            // One to Many relationship
            entity.HasOne(d => d.Category)
                .WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Products_Category");
        });


    }
}