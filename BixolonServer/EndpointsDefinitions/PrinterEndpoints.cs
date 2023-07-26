using System.Reflection;
using BixolonServer.Services;
using BixolonServer.Models;

namespace BixolonServer.EndpointDefinitions;

public class PrinterEndpointDefinition : IEndpointDefinition
{
    public void DefineServices(IServiceCollection services)
    {
        services.AddSingleton<IPrinterService, PrinterService>();
    }
    public void DefineEndpoints(WebApplication app)
    {
        // Home route
        app.MapGet("/", () => new { Message = "Bixolon printer service is runing!" });

        // Printer routes
        app.MapGet("/reports/x", ReportX);
        app.MapGet("/reports/z", ReportZ);

    }

    internal static IResult ReportX(IPrinterService service)
    {
        try
        {
            service.ReportX();
        }
        catch (System.Exception e)
        {
            return Results.BadRequest(new { Error = $"Error printing report X ({e.Message})" });
        }
        return Results.Ok(new { Message = "Success" });

    }

    internal static IResult ReportZ(IPrinterService service)
    {
        try
        {
            service.ReportZ();
        }
        catch (System.Exception e)
        {
            return Results.BadRequest(new { Error = $"Error printing report Z ({e.Message})" });
        }
        return Results.Ok(new { Message = "Success" });
    }

    internal static IResult PrintDocument(PrinterService service, Document document)
    {
        try
        {
            service.PrintDocument(document);
        }
        catch (System.Exception e)
        {
            return Results.BadRequest(new { Error = $"Error printing Document({e.Message})" });
        }
        return Results.Ok(new { Message = "Success" });
    }

}