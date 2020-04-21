using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamHubCoreDal.Models;

namespace StreamHubCore2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvProcessingController : ControllerBase
    {
        private readonly LiveyTvContext _context;

        public CsvProcessingController(LiveyTvContext context)
        {
            _context = context;
        }
        // GET: api/CsvProcessing
        /*
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        */
        // GET: api/CsvProcessing/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CsvProcessing
        [HttpPost]
        //[HttpGet]
        public void Post([FromBody] string value)
        {
            try
            {

                var value1 = $@"Date., Time., Title., Caterogies., Url /N
14.4.2020.,9:00.,ODSC Virtual Conference.,['lectures'].,https://www.meetup.com/Tel-Aviv-Data-Science-ODSC/events/269601942/ 
14.4.2020.,16:30.,Evening Zen: Mindful Practices for Creativity & Relaxation.,['fitness'].,https://www.meetup.com/mindfuladventuresIL/events/wxkmlrybccbcc/ 
14.4.2020.,17:30.,Evening Zen: Mindful Practices for Creativity & Relaxation.,['fitness'].,https://www.meetup.com/mindfuladventuresIL/events/wxkmlrybcgbsb/
14.4.2020.,18:00.,tinyML Talk: \Adaptive AI for a Smarter Edge by Sek Chai, Latent AI.,[].,https://www.meetup.com/tinyML-Enabling-ultra-low-Power-ML-at-the-edge-Herzeliyya-IL/events/269905393/ 
14.4.2020., 18:00., KaggleIL #10 - WiDS Challenge 1st Place Overview.,[].,https://www.meetup.com/DataHack/events/270028110/ 
15.4.2020., 10:30.,[Free event] Virtual AI Career Expo.,['lectures'].,https://www.meetup.com/Tel-Aviv-Data-Science-ODSC/events/269500187/ 
15.4.2020.,19:00.,Online Global Startup Pitching Event.,['lectures'].,https://www.meetup.com/StartupBlink-Haifa/events/dsbfrrybcgbtb/ 
15.4.2020.,19:00.,Online Global Startup Pitching Event.,['lectures'].,https://www.meetup.com/Startups-in-Tel-Aviv/events/jpbjrrybcgbtb/ 
15.4.2020.,20:00.,deeplearning.ai free mini course: Real-world AI Applications in Medicine.,['lectures'].,https://www.meetup.com/Caesarea-Machine-Learning/events/269968767/ 
15.4.2020.,20:00.,deeplearning.ai free mini mourse: Real-world AI Applications in Medicine.,['lectures'].,https://www.meetup.com/deeplearning-ai-tel-aviv/events/269968825/ 
15.4.2020.,20:30.,Visual Program Represtentation Ideas & Hacking - Virtual Edition.,['lectures'].,https://www.meetup.com/Building-Visual-Support-Tooling-for-Programmers-Workshop/events/khsrdrybcgbtb/ 
15.4.2020.,21:00.,What is the Product-C initiative?        a Corona-time PM task force.,[].,https://www.meetup.com/P-PS-Product-Product-Strategy-by-Y-Perspective/events/270006332/ 
16.4.2020.,9:00.,Community Day - Learn AI.,['lectures'].,https://www.meetup.com/Big-Data-Developers-in-Tel-Aviv-Yafo/events/269902510/ 
16.4.2020.,9:00.,Community Day - Learn AI.,['lectures'].,https://www.meetup.com/Tel-Aviv-Streams/events/269913592/ 
16.4.2020.,10:00.,SNAP LIVE TALK UX.,['lectures'].,https://www.meetup.com/SNAP-Web-UX-Graphic-Design-Meetup/events/269872549/ 
16.4.2020.,10:30.,[Free Event]
        ODSC Virtual AI Expo.,[].,https://www.meetup.com/Tel-Aviv-Data-Science-ODSC/events/269601959/
16.4.2020.,15:00.,Dr. Matan Protter: AlphaZero- Reinforcement Learning is a Game Changer.,['lectures'].,https://www.meetup.com/Tel-Aviv-Yafo-Deep-Corona-Academy-Alibaba/events/269906477/
16.4.2020.,16:00.,Learn AI: Hands on Labs, Leadership, Lessons from AI Experts - Virtual Event.,['lectures'].,https://www.meetup.com/IBM-Startup-Developer-Tel-Aviv/events/269886298/
16.4.2020.,16:00.,First Tel-Aviv Virtual ACE.,[].,https://www.meetup.com/Israel-Atlassian-User-Group/events/269971112/
16.4.2020.,16:00.,My Website is Slow, Now What?.,[].,https://www.meetup.com/at-wix/events/270020380/
16.4.2020.,17:00.,למכור מרחוק - המדריך ליזם: כך תגדילו את הרווחים מהבידוד.,[].,https://www.meetup.com/Fusion-LA-Israel/events/269878021/
16.4.2020.,17:00.,Execute Inside Sales while in Quarantine.,[].,https://www.meetup.com/RAINMAKERS-IL/events/269896063/
16.4.2020.,17:00.,יחסי עובד-מעסיק בזמן הקורונה - סשן שאלות ותשובות על דיני עבודה.,['lectures'].,https://www.meetup.com/Fusion-LA-Israel/events/269968613/
16.4.2020.,18:00.,Design Sprint Webinar: Experiencing the Sprint.,[].,https://www.meetup.com/Design-Sprint-Nation/events/269731799/
16.4.2020.,18:00.,WEBINAR - How COVID-19 is Affecting Digital Marketing Globally?.,['lectures'].,https://www.meetup.com/Digital-Marketing-Tel-Aviv/events/270022241/
16.4.2020.,18:30.,DoiT International Google Cloud Quizzical.,['lectures'].,https://www.meetup.com/multicloud/events/269767979/
16.4.2020.,18:30.,On-line Pair/Mob programming with TDD Workshop.,['lectures'].,https://www.meetup.com/Code-Mavens/events/269912329/
16.4.2020.,19:00.,Online Workshop - Predict values with regression.,['lectures'].,https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269478251/
16.4.2020.,19:30.,DataTalks #23: Mathematical models as tools for coping with epidemics.,[].,https://www.meetup.com/DataHack/events/269947668/
16.4.2020.,20:00.,Working in pajamas: Collaborative design work, from home..,['lectures'].,https://www.meetup.com/Startup-Designers/events/269926240/
16.4.2020.,20:00.,The Future is Coming Fast: Big Changes to Expect in the Next 10 Yrs-Online Event.,[].,https://www.meetup.com/Amman-Startup-Founder-101/events/269934651/
16.4.2020.,20:00.,The Future is Coming Fast: Big Changes to Expect in the Next 10 Yrs-Online Event.,[].,https://www.meetup.com/Israel-Startup-Founder-101/events/269934726/
16.4.2020.,20:00.,The Future is Coming Fast: Big Changes to Expect in the Next 10 Yrs-Online Event.,[].,https://www.meetup.com/Jerusalem-Startup-Founder-101/events/269934918/
16.4.2020.,20:00.,The Future is Coming Fast: Big Changes to Expect in the Next 10 Yrs-Online Event.,[].,https://www.meetup.com/Ramallah-Startup-Founder-101/events/269934985/
16.4.2020.,20:30.,חווית מדיטציה בשידור חי.,['fitness'].,https://www.meetup.com/Tel-Aviv-Yafo-Spiritual-Growth-Meetup/events/ljfgrrybcgbvb/
17.4.2020.,8:30.,Free Live on-line Go course in Hebrew - part 3.,[].,https://www.meetup.com/Code-Mavens/events/269837222/
17.4.2020.,13:00.,Free Online Guided Meditation- Beginners & Intermediate.,[].,https://www.meetup.com/%D7%9E%D7%93%D7%99%D7%98%D7%A6%D7%99%D7%94-%D7%9C%D7%94%D7%92%D7%A9%D7%9E%D7%94-%D7%A2%D7%A6%D7%9E%D7%99%D7%AA-%D7%95%D7%94%D7%AA%D7%A4%D7%AA%D7%97%D7%95%D7%AA-%D7%A8%D7%95%D7%97%D7%A0%D7%99%D7%AA/events/mcsfrrybcgbwb/
17.4.2020.,13:00.,Friday Online Guided Meditation: Beginners and Intermediate.,[].,https://www.meetup.com/Tel-Aviv-Yafo-Spiritual-Growth-Meetup/events/klbjrrybcgbwb/
17.4.2020.,13:00.,Free Online Guided Meditation- Beginners & Above.,[].,https://www.meetup.com/%D7%9E%D7%A4%D7%92%D7%A9%D7%99-%D7%99%D7%95%D7%92%D7%94-%D7%95%D7%9E%D7%93%D7%99%D7%98%D7%A6%D7%99%D7%94-%D7%9C%D7%94%D7%92%D7%A9%D7%9E%D7%94-%D7%A2%D7%A6%D7%9E%D7%99%D7%AA-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D/events/nmbjrrybcgbwb/
19.4.2020.,9:30.,Tackle Cloud Financial Management with FinOps - Live Webinar.,['lectures'].,https://www.meetup.com/AWS-Quaterly-Updates/events/269867932/
19.4.2020.,15:00.,Dr. Asi Messica - When Deep Learning Meets Recommender Systems.,['lectures'].,https://www.meetup.com/Tel-Aviv-Yafo-Deep-Corona-Academy-Alibaba/events/270020436/
19.4.2020.,16:45.,Free Online Guided Meditation: Beginners and Follow-up.,[].,https://www.meetup.com/%D7%9E%D7%93%D7%99%D7%98%D7%A6%D7%99%D7%94-%D7%9C%D7%94%D7%92%D7%A9%D7%9E%D7%94-%D7%A2%D7%A6%D7%9E%D7%99%D7%AA-%D7%95%D7%94%D7%AA%D7%A4%D7%AA%D7%97%D7%95%D7%AA-%D7%A8%D7%95%D7%97%D7%A0%D7%99%D7%AA/events/gjkhrrybcgbzb/
19.4.2020.,16:45.,Free Online Guided Meditation: Beginners and Intermediate.,[].,https://www.meetup.com/Tel-Aviv-Yafo-Spiritual-Growth-Meetup/events/nlkhrrybcgbzb/
19.4.2020.,16:45.,Free Online Guided Meditation- Beginners & Above.,[].,https://www.meetup.com/%D7%9E%D7%A4%D7%92%D7%A9%D7%99-%D7%99%D7%95%D7%92%D7%94-%D7%95%D7%9E%D7%93%D7%99%D7%98%D7%A6%D7%99%D7%94-%D7%9C%D7%94%D7%92%D7%A9%D7%9E%D7%94-%D7%A2%D7%A6%D7%9E%D7%99%D7%AA-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D/events/bmkhrrybcgbzb/
19.4.2020.,18:00.,Pydata April meetup.,['lectures'].,https://www.meetup.com/PyData-Tel-Aviv/events/268808132/
19.4.2020.,18:00.,Junior Excellerator Program  - Live Streaming.,['lectures', 'kids'].,https://www.meetup.com/JR-Devs-IL/events/269831533/
19.4.2020.,19:00.,הכלים הפרקטיים לקידום האתר שלך, יום ראשון, 19.04.20 ב- 19:00.,[].,https://www.meetup.com/Freelance-Israel/events/269887133/
19.4.2020.,20:00.,visual productivity toolbox.,[].,https://www.meetup.com/Startup-Designers/events/270020516/
19.4.2020.,20:00.,הטכנולוגיות שישנו את חיינו - מבט אל העתיד.,[].,https://www.meetup.com/Wize-Night-Talks/events/270039541/
20.4.2020.,10:00.,Online Workshop: Kubernetes, Docker, Containers for Beginners.,[].,https://www.meetup.com/IBM-Startup-Developer-Tel-Aviv/events/269890614/
20.4.2020.,10:00.,איך הופכים תהיה לעשייה, 20.04.20 ב- 10:00.,[].,https://www.meetup.com/Freelance-Israel/events/270019809/
20.4.2020.,15:00.,[Webinar]
        Haifa Volunteer WordPress Help Desk.,['lectures'].,https://www.meetup.com/Haifa-WordPress-Meetup-Group/events/twdsqrybcgbbc/
20.4.2020.,17:30.,ironSource Kotlin bootcamp - April.,['lectures'].,https://www.meetup.com/ironSource-Kotlin-bootcamp-April/
20.4.2020.,18:30.,April Meetup - Online.,[].,https://www.meetup.com/Go-Israel/events/kjvczlybchbjb/
20.4.2020.,19:00.,Weekly Hasadna hack-night.,[].,https://www.meetup.com/The-Public-Knowledge-Workshop/events/cchvlrybcgbbc/
20.4.2020.,19:00.,ZK-TLV 0x0b - At Home Edition - MPC-in-the-Head, another ZK approach.,[].,https://www.meetup.com/Zero-Knowledge-Tel-Aviv/events/270030098/
20.4.2020.,21:00.,Pair-up event #17: Founders looking for co-founders.,[].,https://www.meetup.com/tlvstartuphub/events/269870040/
20.4.2020.,21:00.,Virtual Pair-up event #17: Founders looking for co-founders.,[].,https://www.meetup.com/TLVStartupHubTech/events/270039565/
21.4.2020.,10:00.,Build & Deploy Microservice using the 12 Factors methodology., ['lectures']., https://www.meetup.com/IBM-Startup-Developer-Tel-Aviv/events/269646027/
21.4.2020.,15:00., Virtual Workshop: The Power of Apache Cassandra, Apache Kafka and Elasticsearch., ['fitness']., https://www.meetup.com/Tel-Aviv-AI-Tech-Talks/events/269987749/
21.4.2020.,16:00., Property-Backed Digital Securities & How They Will Transform Real Estate., []., https://www.meetup.com/Real-Estate-Networking-Meetup-Group/events/269925954/
22.4.2020.,8:00., DigitalHealth.il+ 2020 SAVE THE DATE!., []., https://www.meetup.com/Digital-Health-Israel/events/265176771/
22.4.2020.,13:00., לקדם את העסק בפייסבוק לבד ובלי כסף, 22.04.20 ב- 13:00., []., https://www.meetup.com/Freelance-Israel/events/269905594/
22.4.2020.,15:00., Tom Tirer - GANs N' Denoisers: Appetite for Reconstruction.,[].,https://www.meetup.com/Tel-Aviv-Yafo-Deep-Corona-Academy-Alibaba/events/269772219/
22.4.2020.,16:00., [ONLINE] Kafka at massive scale: develop & monitor your microservices like a pro., ['lectures']., https://www.meetup.com/ApacheKafkaTLV/events/268831792/
22.4.2020.,16:00., Unified Endpoint Security - Live Meetup., []., https://www.meetup.com/msc-il/events/269806087/
22.4.2020.,16:00., Unified Endpoint Security - Live Meetup., []., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269808641/
22.4.2020.,16:00., Handling Increasing Load and Reducing Costs During COVID-19 Crisis., ['lectures']., https://www.meetup.com/Israeli-Aerospike-User-Group/events/269809325/
22.4.2020.,16:00., Virtual meetup- How Agile Are We?., []., https://www.meetup.com/Scrum-Masters/events/270010675/
22.4.2020.,16:00., [ONLINE] Kafka at massive scale: develop & monitor your microservices like a pro., ['lectures']., https://www.meetup.com/Meetups-at-Riskified/events/270020603/
22.4.2020.,17:00., Azure IoT Security - Live Meetup., ['lectures']., https://www.meetup.com/msc-il/events/269773302/
22.4.2020.,17:00., Azure IoT Security - Live Meetup., ['lectures']., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269905264/
22.4.2020.,18:00., React-IL Meetup @ Natural Intelligence!., []., https://www.meetup.com/React-IL/events/266866752/
22.4.2020.,18:00., Basics of Design for Non-Designers., []., https://www.meetup.com/Haifa-Tech-Talks/events/267085314/
22.4.2020.,18:00., Impact FinTech - from 'Nice to Have' to an Essence - ONLINE EVENT., []., https://www.meetup.com/FinTech-Aviv/events/269786192/
22.4.2020.,18:00., [ONLINE] Istio - new features, hybrid mesh., []., https://www.meetup.com/cncf-tlv/events/269814330/
22.4.2020.,18:00., AI as a Service - Live Meetup (MVP Show)., []., https://www.meetup.com/msc-il/events/269895045/
22.4.2020.,18:00., AI as a Service Overview., []., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269905286/
22.4.2020.,19:00., Chatbot Developers & Conversation Designers Unite… Again!., ['lectures']., https://www.meetup.com/Chatbots-And-Conversation-Design/events/269764839/
22.4.2020.,19:00., Back to Business! Market Entry Strategy for Startups., ['lectures']., https://www.meetup.com/Fusion-LA-Israel/events/270021452/
23.4.2020.,10:15., rancher virtual rodeo (instead of planned physical meetup).,[].,https://www.meetup.com/rancher-israel/events/269158232/
23.4.2020.,24:00.,Online meetup: Inside Snowflake., []., https://www.meetup.com/Tel-Aviv-Data-Professionals/events/ctvsgqybcgbfc/
23.4.2020.,15:00., Webinar (April 23rd): Brazil's Healthcare Market.,['lectures'].,https://www.meetup.com/mHealth-Israel/events/269952135/
23.4.2020.,16:00.,Moodle 3.9 QA Israel testing Meetup., []., https://www.meetup.com/Moodle-Israel/events/268350827/
23.4.2020.,16:00., Budget During Covid-19 Times - Eran Schindler., ['lectures']., https://www.meetup.com/Petakh-Tiqwa-Innovation-Center-The-Nest/events/269786522/
23.4.2020.,16:00., Protect Microsoft Teams with Cloud App Security - Live Meetup., ['lectures']., https://www.meetup.com/msc-il/events/269895982/
23.4.2020.,16:00., Protect Microsoft Teams with Cloud App Security - Live Meetup., ['lectures']., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269905305/
23.4.2020.,17:45., RISC-V Service Tools Virtual Meetup., []., https://www.meetup.com/Israel-RISC-V-meetups/events/269926192/
23.4.2020.,17:45., RISC-V Service Tools Virtual Meetup., []., https://www.meetup.com/IsraelConsumerHardware/events/269928377/
23.4.2020.,18:00., AWS Service Mesh & CNCF Envoy., ['lectures']., https://www.meetup.com/AWS-IL/events/268789740/
23.4.2020.,18:00., Azure DevOps for absolute Beginners - Live Meetup., ['lectures']., https://www.meetup.com/msc-il/events/269893765/
23.4.2020.,18:00., Azure DevOps for absolute Beginners - Live Meetup., ['lectures']., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269905349/
23.4.2020.,18:30., DoiT International Presents: AWS and ECS Networking., ['lectures']., https://www.meetup.com/multicloud/events/269767727/
23.4.2020.,19:00., Online Workshop - Building and deploying a Django app., ['lectures']., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/269877020/
23.4.2020.,19:00., Online Event - Microsoft Commercial Marketplace Roadmap: April Updates., ['lectures']., https://www.meetup.com/Microsoft-Reactor-Tel-Aviv/events/270022077/
23.4.2020.,19:00., Pawan Kumar - Flutter with VelocityX, minimalist UI Framework., []., https://www.meetup.com/GDG-Haifa/events/270029382/
23.4.2020.,19:30., Model and Data Driven Approach for Object Tracking., ['lectures']., https://www.meetup.com/Computer-Vision-Israel-Meetup/events/270009928/
23.4.2020.,20:00., Unsupervised Learning and Deep Learning Based Time-Series Forecasting., ['lectures']., https://www.meetup.com/Tel-Aviv-AI-Tech-Talks/events/269946524/
                ";
                List<string> lines = value.Split("\r\n").ToList();
                List<Item> items = new List<Item>();
                lines.ForEach(line =>
                {
                    if (line.IndexOf("Date") != 0)
                    {
                        string[] column = line.Split(".,");
                        if (column.Length == 5)
                        {
                            items.Add(new Item
                            {
                                ItemStartDateObj = convertDateAndTimeToDateTime(column[0], column[1]),
                                ItemTitle = column[2],
                                ItemTags = column[3],
                                ItemURL = column[4],
                                ItemDuration = 60 * 60,
                                PlatformID = 1


                            }); ;
                        }
                    }
                });
                //List<Item> itemsToInsert = new List<Item>();
                DateTime minDate = new DateTime(items.Min(x => x.ItemStartDateObj.Ticks));
                DateTime maxDate = new DateTime(items.Max(x => x.ItemStartDateObj.Ticks));
                List<Item> itemsLookup = _context.Items.Where(x => x.ItemStartDateObj.Ticks >= minDate.Ticks && x.ItemStartDateObj.Ticks <= maxDate.Ticks).ToList();
                items.ForEach(x =>
                {
                    if (!itemsLookup.Exists(y => x.ItemTags == y.ItemTags
                    && x.ItemTitle == y.ItemTitle && x.ItemURL == y.ItemURL
                    && x.ItemStartDateObj == y.ItemStartDateObj))
                        _context.Add(x);
                });
                //_context.Add(itemsToInsert);
                _context.SaveChanges();
            }
            catch (Exception ee)
            {

            }
        }
        private DateTime convertDateAndTimeToDateTime(string dateStr, string timeStr)
        {
            try
            {
                var splitDate = dateStr.Split(".").Select(x => Int32.Parse(x)).ToList();
                var splitTime = timeStr.Split(":").Select(x => Int32.Parse(x)).ToList();
                if (splitTime[0] == 24) splitTime[0] = 0;
                DateTime dateTime = new DateTime(splitDate[2], splitDate[1], splitDate[0], splitTime[0], splitTime[1], 0);
                return dateTime;
            }
            catch (Exception ee)
            {
                return new DateTime();
            }
        }
        // PUT: api/CsvProcessing/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
