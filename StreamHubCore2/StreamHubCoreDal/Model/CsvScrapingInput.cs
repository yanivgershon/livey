using System;
using System.Collections.Generic;
using System.Text;

namespace StreamHubCoreDal.Model
{
    public class CsvScrapingInput
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public string Title { get; set; }
        public string Caterogies { get; set; }
        public string Url { get; set; }
    }
}
