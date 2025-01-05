using System;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Serialization;

namespace WebX.Data
{
    public class XmlUtility
    {
        public static string CleanXmlString(string inputString)
        {
            const string specialChr = "☺☻♥♦♣♠•◘○'‘’¢©÷·¶±€£®§™¥°÷×¾¢¡¿☼♀♂♪♫◄√↑↓→←∟↕↔ \n”";
            inputString = specialChr.ToCharArray().Aggregate(inputString, (current, c) => current.Replace(c, ' '));
            inputString = inputString.Replace("–", "-");
            inputString = Regex.Replace(inputString, "<\\?xml.*=\"utf-8\"\\?>", "", RegexOptions.IgnoreCase);
            return inputString.Replace("&", "&amp;");
        }

        public static string FormatXml(string xml)
        {
            string result = "";
            var ms = new MemoryStream();
            var w = new XmlTextWriter(ms, Encoding.Unicode);
            var d = new XmlDocument();
            try
            {
                d.LoadXml(xml);
                w.Formatting = Formatting.Indented;

                d.WriteContentTo(w);
                w.Flush();
                ms.Flush();
                ms.Position = 0;
                var sr = new StreamReader(ms);
                string formattedXml = sr.ReadToEnd();
                result = formattedXml;
            }
            catch (XmlException)
            {
            }
            ms.Close();
            w.Close();
            return result;
        }

        public static string XmlSerializeToString(object objectInstance)
        {
            var serializer = new XmlSerializer(objectInstance.GetType());
            var sb = new StringBuilder();

            using (TextWriter writer = new StringWriter(sb))
            {
                serializer.Serialize(writer, objectInstance);
            }

            return sb.ToString();
        }

        public static T XmlDeserializeFromString<T>(string objectData)
        {
            return (T)XmlDeserializeFromString(objectData, typeof(T));
        }

        private static object XmlDeserializeFromString(string objectData, Type type)
        {
            var serializer = new XmlSerializer(type);
            object result;

            using (TextReader reader = new StringReader(objectData))
            {
                result = serializer.Deserialize(reader);
            }

            return result;
        }

        public static XmlElement CreateElement(XmlDocument xDoc, string name, string value)
        {
            XmlElement xa = xDoc.CreateElement(name);
            xa.InnerText = value;
            return xa;
        }
    }

    public class XmlSerializerHelper
    {
        /// <summary>
        ///     Deserializes an xml document back into an object
        /// </summary>
        /// <param name="xml">The xml data to deserialize</param>
        /// <param name="type">The type of the object being deserialized</param>
        /// <returns>A deserialized object</returns>
        public static object Deserialize(XmlDocument xml, Type type)
        {
            var s = new XmlSerializer(type);
            string xmlString = xml.OuterXml;
            byte[] buffer = Encoding.UTF8.GetBytes(xmlString);
            var ms = new MemoryStream(buffer);
            XmlReader reader = new XmlTextReader(ms);
            Exception caught = null;

            try
            {
                object o = s.Deserialize(reader);
                return o;
            }

            catch (Exception e)
            {
                caught = e;
            }
            finally
            {
                reader.Close();
                if (caught != null)
                    throw caught;
            }
            return null;
        }

        /// <summary>
        ///     Serializes an object into an Xml Document
        /// </summary>
        /// <param name="o">The object to serialize</param>
        /// <returns>An Xml Document consisting of said object's data</returns>
        public static XmlDocument Serialize(object o)
        {
            var s = new XmlSerializer(o.GetType());

            var ms = new MemoryStream();
            var writer = new XmlTextWriter(ms, new UTF8Encoding());
            writer.Formatting = Formatting.Indented;
            writer.IndentChar = ' ';
            writer.Indentation = 5;
            Exception caught = null;

            try
            {
                s.Serialize(writer, o);
                var xml = new XmlDocument();
                string xmlString = Encoding.UTF8.GetString(ms.ToArray());
                xml.LoadXml(xmlString);
                return xml;
            }
            catch (Exception e)
            {
                caught = e;
            }
            finally
            {
                writer.Close();
                ms.Close();

                if (caught != null)
                    throw caught;
            }
            return null;
        }
    }


}
