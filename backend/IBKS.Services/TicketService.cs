using IBKS.Domains;
using IBKS.Repositories.Base.Interfaces;
using IBKS.Repositories.Interface;
using IBKS.Services.Base;
using IBKS.Services.Interface;

namespace IBKS.Services;

public class TicketService : ServiceBase<Ticket, long>, ITicketService
{
    private readonly ITicketReplyService _ticketReplyService;
    public TicketService(ITicketRepository repository,
        ITicketReplyService ticketReplyService,
        IUnitOfWork unitOfWork) : base(repository, unitOfWork)
    {
        _ticketReplyService = ticketReplyService;
    }

    public async Task<IList<TicketReply>> GetTicketReplies(long id, CancellationToken cancellationToken = default)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Id must be positive.");
        }

        return await _ticketReplyService.GetListAsync(x => x.Tid == id, cancellationToken);
    }
}
