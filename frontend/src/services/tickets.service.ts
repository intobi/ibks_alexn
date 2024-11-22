// ticketService.ts

import { PageableOptions } from "../models/common/pageable-options.model";
import { TicketReply } from "../models/ticket-reply.model";
import { Ticket } from "../models/ticket.model";

const apiUrl = "https://localhost:7277/api/Tickets";

export const fetchTickets = async (loadOptions: PageableOptions): Promise<Ticket[]> => {
    const { skip, take } = loadOptions;
    let url = `${apiUrl}?include=status,priority,ticketType,installedEnvironment&offset=${skip}&limit=${take}`;


    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};

export const getTicket = async (id: number): Promise<Ticket> => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
};

export const createTicket = async (ticketData: Ticket): Promise<Ticket> => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

export const updateTicket = async (ticketId: number, ticketData: Ticket): Promise<Ticket> => {
    try {
        const response = await fetch(`${apiUrl}/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
};

export const deleteTicket = async (ticketId: number): Promise<void> => {
    await fetch(`${apiUrl}/${ticketId}`, {
        method: "DELETE",
    });
};

export const getTicketReplies = async (ticketId: number): Promise<TicketReply[]> => {
    const response = await fetch(`${apiUrl}/${ticketId}/replies`, {
        method: "GET",
    });

    return await response.json();
};
