using CsvHelper;
using Microsoft.EntityFrameworkCore;
using StreamHubCoreDal.Model;
using StreamHubCoreDal.Models;
using System;
using System.Globalization;
using System.IO;
using System.Linq;

namespace StreamHubCoreJobs
{
    class Program
    {
        private static LiveyTvContext liveyTvContext;
        static void Main(string[] args)
        {
            
            var optionsBuilder = new DbContextOptionsBuilder<LiveyTvContext>();
            StreamHubCoreDal.AppConfig.AppConfiguration appConfiguration = new StreamHubCoreDal.AppConfig.AppConfiguration();

            optionsBuilder.UseSqlServer(appConfiguration.ConnectionString);
            liveyTvContext = new LiveyTvContext(optionsBuilder.Options);
            iterateAllFiles("D:\\programming3\\livey\\Data-Scrapping\\Data");
        }
        private static void iterateAllFiles(string targetDirectory)
        {

            //https://docs.microsoft.com/en-us/dotnet/api/system.io.directory.getfiles?view=netframework-4.8
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
                insertCsvContentToDb(fileName);

            // Recurse into subdirectories of this directory.
            // string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);

            //foreach (string subdirectory in subdirectoryEntries)
            //  ProcessDirectory(subdirectory);

        }

        private static void insertCsvContentToDb(string filePath)
        {
            int count = 0;
            var line = "";
            string fileName = filePath.Split("\\").Last().ToString();
            liveyTvContext.RemoveRange(liveyTvContext.Items.Where(x => x.ScarpingSource == fileName));
            using (var reader = new StreamReader(filePath))
            {
                while (( line = reader.ReadLine()) != null)
                {
                    if (count > 0)
                    {
                        var spl = line.Split(".,");
                        string Date = spl[0];
                        string Time = spl[1];
                        string Title = spl[2];
                        string Caterogies = spl[3];
                        string Url = spl[4];
                        var dateTime = convertDateAndTimeToDateTime(Date, Time);


                        Item item = new Item
                        {
                            createDate = DateTime.Now,
                            Categories = null,
                            ItemDescription = "",
                            ItemDuration = 0,
                            ItemEndDateObj = dateTime,
                            ItemImgURL = "",
                            ItemOwner = "",
                            ItemStartDate = 0,
                            ItemStartDateObj = dateTime,
                            ItemTags = Caterogies,
                            ItemTitle = Title,
                            ItemURL = Url,
                            PlatformID = 1,
                            ScarpingSource = fileName
                        };
                        liveyTvContext.Add(item);
                    }
                    count++;
                }
                liveyTvContext.SaveChanges();
            }

/*
            using (var csv = new CsvReader(reader,  CultureInfo.InvariantCulture))
            {
                csv.Configuration.Delimiter = ".,";
                csv.Configuration.HasHeaderRecord = true;
                var records = csv.GetRecords<CsvScrapingInput>();
                liveyTvContext.RemoveRange(liveyTvContext.Items.Where(x => x.ScarpingSource == fileName));
                records.ToList().ForEach(line =>
               {
                   Item item = new Item
                   {
                       createDate = DateTime.Now,
                       Categories = null,
                       ItemDescription = "",
                       ItemDuration = 0,
                       ItemEndDateObj = new DateTime(),
                       ItemImgURL = "",
                       ItemOwner = "",
                       ItemStartDate = 0,
                       ItemStartDateObj = new DateTime(),
                       ItemTags = line.Caterogies,
                       ItemTitle = line.Title,
                       ItemURL = line.Url,
                       PlatformID = 1,
                       ScarpingSource = fileName
                   };
                   liveyTvContext.Add(item);

               });
            }
            */
        }
        private static DateTime convertDateAndTimeToDateTime(string Date,string Time)
        {
            var splDate = Date.Split(".").Select(x => Int32.Parse(x)).ToArray();
            var splTime = Time.Split(":").Select(x => Int32.Parse(x)).ToArray();

            return new DateTime(splDate[2], splDate[1], splDate[0], splTime[0], splTime[1], 0);
        }
    }
}
