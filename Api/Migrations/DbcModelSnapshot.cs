﻿// <auto-generated />
using System;
using Api.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(Dbc))]
    partial class DbcModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Api.Features.Producs.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Api.Features.Producs.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<double>("Tax")
                        .HasColumnType("double precision");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Api.Features.Producs.Models.Product", b =>
                {
                    b.HasOne("Api.Features.Producs.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Products_Category");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Api.Features.Producs.Models.Category", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
