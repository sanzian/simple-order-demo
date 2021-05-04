using System;

namespace SimpleOrder.Models
{
    public class Invoice : EntityBase
    {
        public string InvoiceId { get; set; }

        public DateTime Date { get; set; }

        public Customer Customer { get; set; }

        public InvoiceLineItem[] Details { get; set; }

        public double SubTotal { get; set; }

        public double Discount { get; set; }

        public double Tax { get; set; }

        public double Total { get; set; }
    }
}
