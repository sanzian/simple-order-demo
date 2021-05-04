namespace SimpleOrder.Models
{
    public class ItemOption
    {
        public string ItemNumber { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public int SortOrder { get; set; }

        public bool Active { get; set; }
    }
}
