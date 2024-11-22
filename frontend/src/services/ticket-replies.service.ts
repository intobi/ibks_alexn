// ticketService.ts

import { TicketReply } from "../models/ticket-reply.model";

const apiUrl = "https://localhost:7277/api/TicketReplies";

export const fetchTickets = async (): Promise<TicketReply[]> => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching ticket replies:", error);
        throw error;
    }
};

export const getTicketReply = async (id: number): Promise<TicketReply> => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
};

export const createTicketReply = async (ticketData: TicketReply): Promise<TicketReply> => {
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
        console.error("Error creating ticket reply:", error);
        throw error;
    }
};

export const updateTicketReply = async (ticketId: number, ticketData: Partial<TicketReply>): Promise<TicketReply> => {
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
        console.error("Error updating ticket reply:", error);
        throw error;
    }
};

export const deleteTicketReply = async (ticketId: number): Promise<void> => {
    await fetch(`${apiUrl}/${ticketId}`, {
        method: "DELETE",
    });
};
