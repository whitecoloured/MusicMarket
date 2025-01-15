using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserRole
{
    public class GetUserRoleQueryHandler : IRequestHandler<GetUserRoleQuery, string>
    {
        public Task<string> Handle(GetUserRoleQuery request, CancellationToken cancellationToken)
        {
            string role = JwtDataProviderService.GetUserRoleFromToken(request.HeaderData);
            return Task.FromResult(role);
        }
    }
}
