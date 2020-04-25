using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StreamHubCoreDal;
using StreamHubCoreDal.Models;

namespace StreamHubDailySummary
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Item> lstItemsEnteredToday = CollectAllDBItemsEntered();
            SendMail(lstItemsEnteredToday);

        }

        private static List<Item> CollectAllDBItemsEntered()
        {
            LiveyTvContext liveyTvContext;
            var optionsBuilder = new DbContextOptionsBuilder<LiveyTvContext>();
            StreamHubCoreDal.AppConfig.AppConfiguration appConfiguration = new StreamHubCoreDal.AppConfig.AppConfiguration();

            optionsBuilder.UseSqlServer(appConfiguration.ConnectionString);
            liveyTvContext = new LiveyTvContext(optionsBuilder.Options);
            List<Item> lstItemsEnteredToday = new List<Item>();
            lstItemsEnteredToday = liveyTvContext.Items.Where(x => x.createDate >= DateTime.Today.AddDays(-1)).ToList();

            return lstItemsEnteredToday;
        }

        private static void SendMail(List<Item> items)
        {

            var fromAddress = new MailAddress("streamhub.net@gmail.com", "From streamHub");
            var toAddress = new MailAddress("y.g.interactive@gmail.com", "To streamHub");
            // const string fromPassword = "Hack2020";
            const string fromPassword = "pndmrgmvdcxdirxl";
            const string subject = "Trying from core Daily summary";

          
            string body = createMaiBody(items); 
            try
            {
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,

                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    IsBodyHtml = true,
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
            catch (Exception ex)
            {
            }

            //try
            //{
            //    MailMessage mail = new MailMessage();
            //    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            //    mail.From = new MailAddress("streamhub.net@gmail.com");// your_email_address@gmail.com");
            //    mail.To.Add("tblass@ycdmultimedia.com");
            //    mail.Subject = "Test Mail";
            //    mail.Body = "This is for testing SMTP mail from GMAIL";

            //    SmtpServer.Port = 587;
            //            SmtpServer.UseDefaultCredentials = true;  
            //    SmtpServer.Credentials = new System.Net.NetworkCredential("streamhub.net", "Hack2020");

            //  SmtpServer.EnableSsl = true;
            //    SmtpServer.Send(mail);
            //    //////   MessageBox.Show("mail Send");
            //}
            //catch (Exception ex)
            //{
            //    //     MessageBox.Show(ex.ToString());d
            //}
        }

      
        private static string createMaiBody(List<Item> items)
        {
            string body=
            "<html><head>" +
                "<style>" +
                "table {font - family: arial, sans - serif;border - collapse: collapse;width: 100 %;}" +
                "td, th {border: 1px solid #dddddd;text - align: left;padding: 8px;}tr: nth - child(even) {background - color: #dddddd;}</style>" +
                "</head>" +
                "<body><h2> HTML Table </h2>" +
                "<table><tr>" +

                "<th> Title </th>" +
                "<th> URL </th>" +
                "<th> Description </th>" +
                 "<th> Tags </th>" +
                 "<th> Start Date </th>" +
                 "<th> Owner </th>" +
                    "<th> Img URL </th>" +
                "</tr>";
            items.ForEach(item =>
            {
                body += "<tr>" +
                            " <td>" + item.ItemTitle + "</td>" +
                            " <td>" + item.ItemURL + "</td>" +
                            " <td>" + item.ItemDescription + "</td>" +
                            " <td>" + item.ItemTags + "</td>" +
                            " <td>" + item.ItemStartDateObj.ToString() + "</td>" +
                            " <td>" + item.ItemOwner + "</td>" +
                            " <td>" + item.ItemImgURL + "</td>" +
                        "</tr>";
            });

            body += "</table></body>" +
             "</html> ";

            return body;
        }
    }
}
