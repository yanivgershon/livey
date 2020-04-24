using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
            SendMail();

        }

        private static List<Item> CollectAllDBItemsEntered()
        {
            LiveyTvContext liveyTvContext;
            var optionsBuilder = new DbContextOptionsBuilder<LiveyTvContext>();
            StreamHubCoreDal.AppConfig.AppConfiguration appConfiguration = new StreamHubCoreDal.AppConfig.AppConfiguration();

            optionsBuilder.UseSqlServer(appConfiguration.ConnectionString);
            liveyTvContext = new LiveyTvContext(optionsBuilder.Options);
            List<Item> lstItemsEnteredToday = new List<Item>();
            lstItemsEnteredToday = liveyTvContext.Items.Where(x => x.ItemStartDateObj == DateTime.Today.AddDays(-1)).ToList();

            return lstItemsEnteredToday;
        }

        private static void SendMail()
        {

            var fromAddress = new MailAddress("streamhub.net@gmail.com", "From streamHub");
            var toAddress = new MailAddress("tblass@ycdmultimedia.com", "To tehila");
            const string fromPassword = "Hack2020";
            const string subject = "Trying from core Daily summary";
            const string body = "bla bla bla";
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
    }
}
