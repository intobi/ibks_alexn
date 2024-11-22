using IBKS.Domains;
using IBKS.Repositories.Base.Exceptions;
using IBKS.Repositories;
using IBKS.Repositories.Base.Interfaces;
using IBKS.Repositories.Interface;
using IBKS.Services.Base;
using IBKS.Services.Interface;
using System.Windows.Markup;

namespace IBKS.Services;

public class TicketReplyService : ServiceBase<TicketReply, int>, ITicketReplyService
{
    public TicketReplyService(ITicketReplyRepository repository,
        IUnitOfWork unitOfWork) : base(repository, unitOfWork)
    {
    }

    public override async Task<TicketReply> CreateOneAsync(TicketReply entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(nameof(entity));

        entity.ReplyDate = DateTime.UtcNow;

        return await base.CreateOneAsync(entity, cancellationToken);
    }
}
