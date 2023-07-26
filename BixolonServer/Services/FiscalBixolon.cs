using System.Reflection.Metadata;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.IO;
using System.Data;
using System.Linq;
using TfhkaNet.IF.VE;
using TfhkaNet.IF;
using BixolonServer.Models;
using Microsoft.AspNetCore.Http.Features;

namespace BixolonServer.Services;
public class FiscalBixolon : IDisposable
{
    readonly private Settings settings;
    readonly private Tfhka fiscal;
    /// <inheritdoc/>
    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public FiscalBixolon()
    {
        fiscal = new Tfhka();
        settings = new Settings();
        fiscal.OpenFpCtrl(settings.Port);
        if (fiscal.OpenFpCtrl(settings.Port))
        {
            if (!fiscal.ReadFpStatus())
            {
                throw new Exception(string.Format("Error connection on port :{0}", fiscal.Status_Error));
            }
        }
    }

    ~FiscalBixolon()
    {
        fiscal.CloseFpCtrl();
        Dispose();
    }

    public void VerifyPrinter()
    {
        try
        {
            bool test = fiscal.CheckFPrinter();
            var x = fiscal.Estado;
            throw new Exception(string.Format("Error connection on port :{0}", fiscal.ComPort));
        }
        catch (PrinterException x)
        {
            throw new Exception(string.Format("Error on printer: {0}, estatus {1}", x.Message, fiscal.Estado));

        }
    }
    public S2PrinterData GetS2PrinterData()
    {
        try
        {
            return fiscal.GetS2PrinterData();
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
    public S1PrinterData GetS1PrinterData()
    {
        try
        {
            return fiscal.GetS1PrinterData();
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

    public void ReportX()
    {
        bool bRet;
        try
        {
            bRet = fiscal.SendCmd("I0X");
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
    public void ReportZ()
    {
        try
        {
            S1PrinterData d = fiscal.GetS1PrinterData();
            if (d.QuantityOfInvoicesToday < 1)
            {
                throw new Exception("No hay facturas aún hoy");
            }
            fiscal.SendCmd("I0Z");
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
    private void PrintDocumentHeader(BixolonServer.Models.Document document)
    {
        fiscal.SendCmd("i01Cedula/Rif:" + document.ClientId);
        fiscal.SendCmd("i02Razon Social:");
        if (document.ClientName.Length <= 37)
        {
            fiscal.SendCmd("i03" + document.ClientName);
        }
        else
        {
            fiscal.SendCmd("i03" + document.ClientName.Substring(0, 36));
            fiscal.SendCmd("i04" + document.ClientName.Substring(36, document.ClientName.Length - 36));
        }
        if (document.ClientId == "V000000000")
        {
            fiscal.SendCmd("i04 SIN DERECHO A CREDITO FISCAL");
        }
        if (document.Address != null)
        {
            if (document.Address.Length > 40)
            {
                fiscal.SendCmd("i05" + document.Address);
                fiscal.SendCmd("i06" + document.Address.Substring(40, document.Address.Length - 40));
            }
            else
            {
                fiscal.SendCmd("i06" + document.Address);
            }

        }
    }

    private void PrintDocumentProducts(List<DocumentProduct> DocumentProducts)
    {
        foreach (DocumentProduct Item in DocumentProducts)
        {
            string sCmd = sCmd = " ";
            if (Item.Tax == settings.Taxes[0]) sCmd = " ";
            if (Item.Tax == settings.Taxes[1]) sCmd = "!";
            if (Item.Tax == settings.Taxes[2]) sCmd = '"'.ToString();
            if (Item.Tax == settings.Taxes[3]) sCmd = '#'.ToString();
            string Price = "0000000000";
            if (settings.TaxMode == "INCLUIDO")
            {
                Price = (Item.PricePlusTax * 100).ToString("0000000000");
            }
            else
            {
                Price = (Item.Price * 100).ToString("0000000000");
            }
            string Quantity = (Item.Quantity * 1000).ToString("00000000");
            string Description = Item.Description.PadRight(37).Substring(0, 36);
            var bRet = fiscal.SendCmd(sCmd + Price + Quantity + Description);
            if (!bRet)
            {
                PrinterStatus e = fiscal.GetPrinterStatus();
                throw new Exception(string.Format("Estatus:{0},Error:{1}", e.PrinterStatusDescription, e.PrinterErrorDescription));
            }
        }
    }

    private S2PrinterData PrintDocumentPayments(List<DocumentPayments> documentPayments)
    {
        foreach (var item in documentPayments)
        {
            double x = item.Amount;
            fiscal.SendCmd(item.Code + (item.Amount * 100).ToString("000000000000"));
        }
        S2PrinterData s2 = GetS2PrinterData();
        if (s2.AmountPayable > 0)
        {
            fiscal.SendCmd(settings.PayRest + (s2.AmountPayable * 100).ToString("000000000000"));
        }
        // End document
        fiscal.SendCmd("199");
        return s2;
    }

    public BixolonServer.Models.Document PrintDocument(BixolonServer.Models.Document document)
    {
        if (document == null)
        {
            throw new Exception("document en blanco no se puede imprimir");
        }
        if (document.Total <= 0 || document.Products.Count == 0)
        {
            throw new Exception("Esta factura no tiene productos");
        }
        PrintDocumentHeader(document);
        PrintDocumentProducts(document.Products);
        // Totalize
        fiscal.SendCmd("3"); // subtotal
        var s2 = PrintDocumentPayments(document.Payments);
        Thread.Sleep(500);

        // Load printed document        
        S1PrinterData s1 = GetS1PrinterData();

        document.Date = DateTime.Now;
        document.LastInvoiceNumber = s1.LastInvoiceNumber.ToString("00000000");
        document.DailyClosureCounter = (s1.DailyClosureCounter + 1).ToString("0000");
        document.SubTotalBases = s2.SubTotalBases;
        document.SubTotalTax = s2.SubTotalTax;
        document.Total = s2.SubTotalBases + s2.SubTotalTax;
        return document;

    }

}


