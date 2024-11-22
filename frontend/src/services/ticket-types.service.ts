import { TicketType } from "../models/ticket-type.model";

const apiUrl = "https://localhost:7277/api/TicketTypes";

export const getTicketTypes = async (): Promise<{data: TicketType[]}> => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Ticket Types:", error);
        throw error;
    }
};
