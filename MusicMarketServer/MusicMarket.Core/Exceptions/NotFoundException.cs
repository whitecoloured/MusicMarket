using System;

namespace MusicMarket.Core.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string Message) : base(Message)
        {

        }
        public NotFoundException()
        {

        }
    }
}
