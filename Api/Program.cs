using System.Reflection;
using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Auth.Models;
using Api.Features.Auth.Services;
using Api.Features.Products.Dtos;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

const bool isDevelopment = true;

var builder = WebApplication.CreateBuilder(args);

// Add validators
builder.Services.AddValidatorsFromAssemblyContaining(typeof(ProductDTO));

// Config
builder.Configuration.Sources.Clear();
builder.Configuration
  .AddJsonFile("appsettings.json")
  .AddJsonFile("appsettings.Development.json", false)
  .AddUserSecrets(Assembly.GetEntryAssembly()!)
  .AddEnvironmentVariables();


// Connect DB
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<Dbc>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("db")));
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// add documentation helpers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure identity
builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<Dbc>();

// Cors 
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    var origins = builder.Configuration.GetSection("AllowedOrigins");
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins(origins.Value ?? "*");
                      });
});


builder.Services.AddEndpointDefinitions(typeof(IEndpointDefinition));

// Authentication services
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorizationBuilder();

// Add the service to generate JWT tokens
builder.Services.AddTokenService();

// State that represents the current user from the database *and* the request
builder.Services.AddCurrentUser();

// Authorization service
builder.Services.AddAuthorization();

// Add Users service
builder.Services.AddScoped<IUsersService, UsersService>();

var app = builder.Build();

app.UseCors();

// use Authentication + authorization services

app.UseAuthentication();

app.UseAuthorization();

// activate swagger in development
if (isDevelopment)
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// add endpoints
app.MapGet("/", () => "rest-app api is runing!");
app.UseEndpointDefinitions();

// test logger
app.Logger.LogInformation("The app started");

app.Run();
