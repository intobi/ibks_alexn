using AutoMapper;
using IBKS.Contracts;
using IBKS.RestAPI.Base;
using IBKS.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IBKS.RestAPI.Controllers;

public class TicketsController : ApiControllerBase<Contracts.Ticket, Domains.Ticket, ITicketService, long>
{
	public TicketsController(ITicketService service,
		IMapper mapper,
		ILogger<TicketsController> logger)
		: base(service, mapper, logger)
	{
	}

	[HttpGet]
	[Route("{id}/replies")]
	public async Task<ActionResult<IList<TicketReply>>> GetTicketReplies(long id, CancellationToken cancellationToken = default)
	{ 
		IList<Domains.TicketReply> replies = await Service.GetTicketReplies(id, cancellationToken);

		return Ok(Mapper.Map<IList<TicketReply>>(replies));
	}
}
