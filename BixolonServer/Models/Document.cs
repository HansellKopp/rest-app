namespace BixolonServer.Models;
public class Document
{
    public required string ClientId { get; set; }
    public required string ClientName { get; set; }
    public string? Address { get; set; }
    public double SubTotalBases { get; set; }
    public double SubTotalTax { get; set; }
    public double Taxes { get; set; }
    public double Total { get; set; } = 0;
    public DateTime Date { get; set; }
    public string? LastInvoiceNumber { get; set; }
    public string? DailyClosureCounter;
    public List<DocumentProduct> Products { get; } = new List<DocumentProduct>();
    public List<DocumentPayments> Payments { get; } = new List<DocumentPayments>();
}

public class DocumentPayments
{
    public required string Code;
    public required double Amount;
}

public class DocumentProduct
{
    public double Quantity { get; set; }
    public required string Description { get; set; }
    public double Price { get; set; }
    public double PricePlusTax { get; set; }
    public double Tax { get; set; }
}
