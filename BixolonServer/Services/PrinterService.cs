using TfhkaNet.IF.VE;
using TfhkaNet.IF;
using BixolonServer.Models;

namespace BixolonServer.Services;

public class PrinterService : IPrinterService
{
    private readonly Tfhka fiscal = new();
    private readonly Settings settings = new();
    public void ReportX()
    {
        bool bRet;
        try
        {
            if (fiscal.OpenFpCtrl(settings.Port))
            {
                bRet = fiscal.SendCmd("I0X");
                fiscal.CloseFpCtrl();
            }
        }
        catch (PrinterException x)
        {
            throw new Exception(string.Format("Error de impresora: {0}, estatus {1}", x.Message, fiscal.Estado));

        }
        catch (Exception x)
        {
            throw new Exception(string.Format("Error de conexión\n{0}\nEstatus {1}", x.Message, fiscal.Status_Error));
        }

    }

    public void ReportZ() { }

    public void PrintDocument(BixolonServer.Models.Document document) { }

}