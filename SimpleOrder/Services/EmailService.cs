using SendGrid;
using SendGrid.Helpers.Mail;
using SimpleOrder.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleOrder.Services
{
    public class EmailService
    {
        // TODO: should be refactored to store values in appsettings
        public static string EMAIL_API_KEY = "your-SendGrid-api-key";
        const string DEFAULT_FROM_EMAIL = "your@email.here";
        const string DEFAULT_FROM_NAME = "Your Name Here";

        public async Task SendEmailAsync(Invoice invoice)
        {
            var email = await this.CreateInvoiceEmail(invoice);
            await this.SendEmailAsync(invoice.Customer.EmailAddress, $"Order {invoice.Id}", email);
        }

        public async Task SendEmailAsync(string deliverTo, string subject, string body)
        {
            var client = new SendGridClient(EMAIL_API_KEY);
            var from = new EmailAddress(DEFAULT_FROM_EMAIL, DEFAULT_FROM_NAME);
            var to = new EmailAddress(deliverTo);
            var toList = new List<EmailAddress>();
            toList.Add(to);
            toList.Add(from);

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, toList, subject, "", body, false);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task<string> CreateInvoiceEmail(Invoice value)
        {
            var customerInfo = 
                $"<div>{value.Customer.FirstName} {value.Customer.LastName}</div>" +
                $"<div>{value.Customer.EmailAddress}";
            if (!string.IsNullOrEmpty(value.Customer.PhoneNumber)) {
                customerInfo += $"<div>{value.Customer.PhoneNumber}</div>";
            }

            var itemDetail = string.Empty;
            foreach (var detail in value.Details)
            {
                itemDetail += "<tr>";
                itemDetail += $"<td>{detail.ItemNumber}</td>";
                itemDetail += $"<td>";
                itemDetail += $"<div>{detail.Description}</div>";
                if (detail.Discount > 0)
                {
                    itemDetail += $"<div>-{detail.Discount}</div>";
                }
                itemDetail += $"</td>";
                itemDetail += $"<td style='text-align: right;'>{detail.UnitPrice.ToString("c")}</td>";
                itemDetail += $"<td style='text-align: right;'>{detail.Quantity}</td>";
                itemDetail += $"<td style='text-align: right;'>{detail.SubTotal.ToString("c")}</td>";
                itemDetail += "</tr>";
            }

            var invoiceInfo =
                $"<tr>" +
                $"<td colspan='4' style='text-align: right;'>Sub Total:</td>" +
                $"<td style='text-align: right;'>{value.SubTotal.ToString("c")}</td>" +
                $"</tr>" +
                $"<tr>" +
                $"<td colspan='4' style='text-align: right;'>Discount:</td>" +
                $"<td style='text-align: right;'>{value.Discount.ToString("c")}</td>" +
                $"</tr>" +
                $"<tr>" +
                $"<td colspan='4' style='text-align: right;'>Tax:</td>" +
                $"<td style='text-align: right;'>{value.Tax.ToString("c")}</td>" +
                $"</tr>" +
                $"<tr>" +
                $"<td colspan='4' style='text-align: right;'>Total:</td>" +
                $"<td style='text-align: right;'>{value.Total.ToString("c")}</td>" +
                $"</tr>";

            itemDetail = $"<table border='1' cellspacing='0'>{itemDetail}{invoiceInfo}</table>";

            var email =
                $"<div>{customerInfo}</div>" +
                $"<div>{itemDetail}</div>" + 
                $"<p>" +
                $"<li>Zelle or Paypal*: send to 626-524-4523</li>" +
                $"<li>Cash: deliver in person</li>" +
                $"<li>Check: deliver in person or or mail to<br>PO Box 1261<br>Glendora, CA 91740</li>" +
                $"* Use \"Sending to a friend\" option please" +
                $"</p>";

            return email;
        }
    }
}
