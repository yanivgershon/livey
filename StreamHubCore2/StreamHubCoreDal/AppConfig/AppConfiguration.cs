using Microsoft.Extensions.Configuration;
using System.IO;
namespace StreamHubCoreDal.AppConfig
{
    public class AppConfiguration
    {
        public readonly string _connectionString = string.Empty;
        public AppConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionString").GetSection("LiveyTvDb").Value;
            var appSetting = root.GetSection("ApplicationSettings");
        }
        public string ConnectionString
        {
            get => _connectionString;
        }

    }
}
