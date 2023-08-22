using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Auth.Models;
using Api.Features.Auth.Services;
using Microsoft.EntityFrameworkCore;


const bool isDevelopment = true;

var builder = WebApplication.CreateBuilder(args);
// read aditional config

var config = builder.Configuration.AddJsonFile("customSettings.json", optional: true, reloadOnChange: true);

// Connect DB
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<Dbc>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("db")));

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
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("*");
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
