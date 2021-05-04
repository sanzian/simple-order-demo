namespace SimpleOrder.Models
{
    public class InvoiceLineItem : EntityBase
    {
        public int LineNumber { get; set; }

        public string ItemNumber { get; set; }

        public string Description { get; set; }

        public double UnitPrice { get; set; }

        public int Quantity { get; set; }

        public double Discount { get; set; }

        public double SubTotal { get; set; }
    }
}
