using Microsoft.AspNetCore.OpenApi;
using Api.EndpointDefinitions;

const bool isDevelopment = true;

var builder = WebApplication.CreateBuilder(args);
// read aditional config

builder.Configuration.AddJsonFile("customSettings.json", optional: true, reloadOnChange: true);

// add documentation helpers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddEndpointDefinitions(typeof(IEndpointDefinition));
var app = builder.Build();

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
