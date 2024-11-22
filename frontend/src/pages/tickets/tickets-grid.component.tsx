
import DataGrid, { Column, Paging, Pager, DataGridTypes, Button, Editing, Sorting } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { deleteTicket, fetchTickets } from "../../services/tickets.service";
import { useCallback, useRef } from "react";
import { confirm } from "devextreme/ui/dialog";
import { useNavigate } from "react-router-dom";

import "./tickets-grid.component.css";
import SingleButton from "devextreme-react/cjs/button";

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 20];

function Tickets() {
  const navigate = useNavigate();
  const dataGridRef = useRef<any>();
  const store = new CustomStore({
    key: "id",
    async load(loadOptions: any) {
      return fetchTickets(loadOptions);
    },
  });

    const onDeleteIconClick = useCallback(async (e: any) => {
      e.event.preventDefault();  
      
      const result = await confirm("Are you sure you want to remove this ticket?", "Confirm Deletion");

      if (result) {
        try {
          await deleteTicket(e.row.data.id);
          e.component.refresh(); 
        } catch (error) {
          console.error("Error deleting ticket:", error);
        }
      }
      e.component.refresh();
     
    }, []);

    const onEditIconClick = useCallback((e: any) => {
      e.event.preventDefault();
      navigate("/tickets/"+e.row.data.id);
    }, []);

  return (
    <div className="main dx-swatch-dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="mt-5">Tickets</h2>
          </div>
          <div className="col align-items-end d-flex justify-content-end">
              <SingleButton type="success" className="mb-3" width={200} text="Add Ticket" onClick={() => navigate("/tickets")} />
          </div>
        </div>
        <div className="row">
          <DataGrid
            ref={dataGridRef}
            dataSource={store}
            showBorders={true}
            remoteOperations={true}
            wordWrapEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            showColumnLines={true}
          >
            <Sorting mode="none" />
            <Editing allowAdding={false} allowDeleting={true} allowUpdating={true} />
            <Paging defaultPageSize={10} />{" "}
            <Pager
              visible={true}
              allowedPageSizes={allowedPageSizes}
              displayMode="full"
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />
            <Column dataField="id" dataType="number" />
            <Column dataField="title" dataType="string" />
            <Column dataField="installedEnvironment.title" caption="Module" dataType="string" />
            <Column dataField="ticketType.title" caption="Type" dataType="string" />
            <Column dataField="status.title" caption="State" dataType="string" />
            <Column type="buttons" width={110}>
              <Button hint="Edit" icon="edit" onClick={onEditIconClick} />
              <Button hint="Delete" icon="trash" onClick={onDeleteIconClick} />
            </Column>
          </DataGrid>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
