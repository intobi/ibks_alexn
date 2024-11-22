using IBKS.Domains;
using IBKS.Services.Base.Interfaces;

namespace IBKS.Services.Interface;

public interface ITicketService : IServiceBase<Ticket, long>
{
    Task<IList<TicketReply>> GetTicketReplies(long id, CancellationToken cancellationToken = default);
}
