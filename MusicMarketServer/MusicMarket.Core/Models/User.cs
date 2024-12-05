using MusicMarket.Core.Enums;
using System;
using System.Collections.Generic;

namespace MusicMarket.Core.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        //This one will be a complex type variable
        public Address Address { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }

        public User()
        {
            Role = Role.User;
        }
    }
}
