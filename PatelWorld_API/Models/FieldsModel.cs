namespace PatelWorld_API.Models
{
    public class FieldsModel
    {
    }

    public partial class TblFields
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Datatype { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string? Description { get; set; }
    
    }


    public partial class TblFieldsOptions
    {
        public int Id { get; set; }
        public int? FieldId { get; set; }
        public string? Value { get; set; }
        public int? DisplayOrder { get; set; }

    }


    public class Fieldfilter
    {
        public int? page { get; set; }
        public string? name { get; set; }

    }

    public class FieldsList
    {
        public int TOTAL_COUNT { get; set; }
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Datatype { get; set; }
        public string? Description { get; set; }
    }

}
