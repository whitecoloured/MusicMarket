using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Core.Models
{
    public class Review
    {
        public Guid Id { get; set; }
        public int Mark { get; set; }
        public string ReviewDesc { get; set; }
        public DateTime ReviewDate { get; set; }
        public User User { get; set; }
        public Guid? UserID { get; set; }
        public Product Product { get; set; }
        public Guid? ProductID { get; set; }

        public Review()
        {
            ReviewDate = DateTime.Now;
        }
    }
}
