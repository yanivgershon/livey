using CsvHelper;
using StreamHubCoreDal.Models;
using System;
using System.Globalization;
using System.IO;

namespace StreamHubCoreJobs
{
    class Program
    {
        // private static LiveyTvContext liveyTvContext = new LiveyTvContext();
        static void Main(string[] args)
        {
            iterateAllFiles("D:\\programming3\\skyCommerceV2\\SkyCommerceMigration\\csv");
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
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.HasHeaderRecord = false;
                //  var records = csv.GetRecords<CsvScrapingInput>();
                //  records.ToList().ForEach(line =>
                // {


                // }
            }

        }
    }
}
