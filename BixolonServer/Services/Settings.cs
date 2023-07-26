using System.Collections.ObjectModel;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace BixolonServer.Services;
class Settings
{
    public Settings()
    {
        try
        {
            string contents = File.ReadAllText(@".\settings.yaml");
            var input = new StringReader(contents);
            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();
            var doc = deserializer.Deserialize<List<object>>(input);
            Console.WriteLine("## Document");
            foreach (Dictionary<object, object> item in doc.Cast<Dictionary<object, object>>())
            {
                Console.WriteLine("### Item");
                foreach (var kvp in item)
                {
                    Console.WriteLine("{0}: {1}", kvp.Key, kvp.Value);
                }
            }
        }
        catch (Exception)
        {
            Console.Write("unable to load settings");
            throw;
        }
    }
    public string Port { get; } = "COM1";
    public string TaxMode { get; } = "INCLUIDO";
    public string PayRest { get; } = "102";
    public List<double> Taxes { get; } = new List<double> { 0, 16, 12, 10 };
}

