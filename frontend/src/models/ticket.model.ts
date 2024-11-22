import { InstalledEnvironment } from "./installed-environment.model";
import { Priority } from "./priority.model";
import { Status } from "./status.model";
import { TicketType } from "./ticket-type.model";
import { User } from "./user.model";

export interface Ticket {
    id: number;
    title: string;
    applicationId: number;
    applicationName: string;
    description: string;
    url: string;
    stackTrace: string;
    device: string;
    browser: string;
    resolution: string;
    priorityId: number;
    statusId: number;
    userId?: number;
    userOid: string;
    installedEnvironmentId: number;
    ticketTypeId: number;
    date: Date;
    deleted?: boolean;
    lastModified: Date;
    createdByOid: string;
    installedEnvironment: InstalledEnvironment;
    priority: Priority;
    status: Status;
    ticketType: TicketType;
    userO: User;
}