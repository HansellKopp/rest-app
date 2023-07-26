using System.Reflection.Metadata;
using BixolonServer.Models;

namespace BixolonServer.Services;

public interface IPrinterService
{
    void ReportX();
    void ReportZ();
    void PrintDocument(BixolonServer.Models.Document document);
}
