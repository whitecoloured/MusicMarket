using System;

namespace MusicMarket.Core.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string Message) : base(Message)
        {

        }
        public BadRequestException()
        {

        }
    }
}
