﻿using MusicMarket.Core.Models;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo
{
    public class GetUserInfoResponse
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
    }
}
