using Microsoft.Extensions.Configuration;
using System.IO;
namespace StreamHubCoreDal.AppConfig
{
    public class AppConfiguration
    {
        public readonly string _connectionString = string.Empty;
        public AppConfiguration()
        {
            /*
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionString").GetSection("LiveyTvDb").Value;
           

            var appSetting = root.GetSection("ApplicationSettings");
             */
            _connectionString = "server=stream-hub.database.windows.net;database=streamHub;User ID=stream-hub;password=sS8370098;";
        }
        public string ConnectionString
        {
            get => _connectionString;
        }

    }
}
