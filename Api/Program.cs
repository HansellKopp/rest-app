using Api.Db;
using Api.EndpointDefinitions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


const bool isDevelopment = true;

var builder = WebApplication.CreateBuilder(args);
// read aditional config

builder.Configuration.AddJsonFile("customSettings.json", optional: true, reloadOnChange: true);

// Connect DB
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<Dbc>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("db")));

// add documentation helpers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
var app = builder.Build();
app.UseCors();

// activate swagger
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
