namespace SimpleOrder.Models
{
    public class Setting : EntityBase
    {
        public string Name { get; set; }

        public string ValueType { get; set; }

        public string LastValue { get; set; }
    }
}
