import { Ticket } from "./ticket.model";

export interface User {
    id: string;
    displayName: string;
    email: string;
    fullName: string;
    lastScannedUtc?: Date;
    tickets: Ticket[];
}