import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTicket, getTicket, getTicketReplies, updateTicket } from "../../../services/tickets.service";
import { Ticket } from "../../../models/ticket.model";
import { TicketReply } from "../../../models/ticket-reply.model";
import Button from "devextreme-react/cjs/button";
import { TextArea } from "devextreme-react/text-area";
import Form, { FormRef, GroupItem, Item } from "devextreme-react/cjs/form";
import { getInstalledEnvironements } from "../../../services/installed-environments.service";
import { InstalledEnvironment } from "../../../models/installed-environment.model";
import { Priority } from "../../../models/priority.model";
import { Status } from "../../../models/status.model";
import { TicketType } from "../../../models/ticket-type.model";
import { getPriorities } from "../../../services/priorities.service";
import { getStatuses } from "../../../services/statuses.service";
import { getTicketTypes } from "../../../services/ticket-types.service";
import { createTicketReply, deleteTicketReply } from "../../../services/ticket-replies.service";
import List from "devextreme-react/cjs/list";
import { confirm } from "devextreme/ui/dialog";

function TicketDetails() {
  const formRef = useRef<FormRef>(null);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ? Number(params.id) : 0;

  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [ticketReplies, setTicketReplies] = useState<TicketReply[]>([]);

  const [installedEnvironments, setInstalledEnvironments] = useState<InstalledEnvironment[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);

  let [message, setMessage] = useState<string>();

  useEffect(() => {
    const loadPage = async () => {
      try {
        if (id) {
          await loadTicket(id);
          await loadTicketReplies(id);
        }
      } catch (error) {
        console.error("Error loading ticket details:", error);
      }
    };

    const loadDropdowns = async () => {
      setInstalledEnvironments((await getInstalledEnvironements()).data);
      setPriorities((await getPriorities()).data);
      setStatuses((await getStatuses()).data);
      setTicketTypes((await getTicketTypes()).data);
    };

    loadDropdowns();
    loadPage();
  }, [id]);

  const loadTicket = async (id: number) => {
    const ticket = await getTicket(id);
    if (ticket) {
      setTicket(ticket);
    }
  };

  const loadTicketReplies = async (id: number) => {
    const replies = await getTicketReplies(id);
    if (replies) {
      setTicketReplies(replies);
    }
  };

  const goBack = useCallback(() => {
    navigate("/");
  }, []);

  const onSaveClick = useCallback(async () => {
    if (!formRef?.current?.instance().validate().isValid){
        return;
    }
    try {
      if (id && ticket) {
        const updatedTicket = await updateTicket(id, ticket);
        setTicket(updatedTicket);
      } else if (id === 0) {
        const newTicket = await createTicket(ticket);
        navigate(`/tickets/${newTicket.id}`);
      }
    } catch (error) {
      console.error("Error ticket request:", error);
    }
  }, [ticket, createTicket, setTicket, formRef]);

  const onAddReplyClick = useCallback(async () => {
    if (message && ticket) {
      try {
        const newTicketReply = await createTicketReply({ tid: ticket.id, reply: message } as TicketReply);
        setTicketReplies([...ticketReplies, newTicketReply]);
        setMessage("");
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  }, [message, ticket, ticketReplies, setTicketReplies, setMessage]);

  const onReplyDeletedClick = useCallback(
    async (e: any) => {
      e.cancel = true;
      const result = await confirm("Are you sure you want to remove this reply?", "Confirm Deletion");

      if (result) {
        try {
          await deleteTicketReply(e.itemData.id);
          setTicketReplies(ticketReplies.filter((x) => x.id != e.itemData.id));
        } catch (error) {}
      }
    },
    [deleteTicketReply, setTicketReplies]
  );

  const onMessageChanged = (e: any) => {
    console.log(e);
    setMessage(e);
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-md-6 ticket-name">
          {id > 0 ? (
            <label>
              Ticket #{ticket?.id} - {ticket?.title}
            </label>
          ) : (
            <label>Add Ticket</label>
          )}
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <Button type="normal" width={100} text="Close" onClick={goBack} />
          <Button type="success" width={100} className="ms-3" text="Save" onClick={onSaveClick} />
        </div>
      </div>
      {id > 0 && (
        <div className="mt-3">
          <label>New Reply</label>
          <TextArea height={70} value={message} valueChangeEvent="keyup" onValueChange={onMessageChanged} />

          <div className="d-flex justify-content-end mt-2">
            <Button type="success" width={200} text="Add Reply" onClick={onAddReplyClick} />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-7">
          <Form ref={formRef} formData={ticket} className="mt-3">
            <GroupItem caption="Ticket Details">
              <Item dataField="title" isRequired={true} editorType="dxTextBox" visible={id === 0} />
              <Item
                dataField="installedEnvironmentId"
                isRequired={true}
                editorType="dxSelectBox"
                editorOptions={{ items: installedEnvironments, valueExpr: "id", displayExpr: "title" }}
              />
              <Item
                dataField="priorityId"
                isRequired={true}
                editorType="dxSelectBox"
                editorOptions={{ items: priorities, valueExpr: "id", displayExpr: "title" }}
              />
              <Item
                dataField="ticketTypeId"
                isRequired={true}
                editorType="dxSelectBox"
                editorOptions={{ items: ticketTypes, valueExpr: "id", displayExpr: "title" }}
              />
              <Item
                dataField="statusId"
                isRequired={true}
                editorType="dxSelectBox"
                editorOptions={{ items: statuses, valueExpr: "id", displayExpr: "title" }}
              />
              <Item dataField="description" isRequired={true} editorType="dxTextArea" editorOptions={{ height: 200 }} />
            </GroupItem>
          </Form>
        </div>
        {id > 0 && (
          <div className="col-md-5">
            <span className="dx-form-group-caption">
              <div className="dx-form-group-content mt-3">Replies</div>
            </span>
            <List
              onItemDeleting={onReplyDeletedClick}
              dataSource={ticketReplies}
              keyExpr="reply"
              height={800}
              allowItemDeleting={true}
              itemDeleteMode="static"
              itemRender={(item) => <span>{item.reply}</span>}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetails;
