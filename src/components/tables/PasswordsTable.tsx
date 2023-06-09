import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSecrets } from "api/getSecrets";
import { TypeTemplate } from "components/columns/TypeTemplate";
import { NameTemplate } from "components/columns/NameTemplate";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { setGlobalToastObject } from "helpers/toast";
import PasswordSidebar from "../sidebars/PasswordSidebar";
import {PasswordItem} from "../../types/tableType";
import {copyToClipboard} from "../../helpers/clipboard";

export default function PasswordsTable() {
  const [secrets, setSecrets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordSidebar, setIsPasswordSidebar] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    getSecrets(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data: any) => {
      if (data?.items.length) {
        setSecrets(data.items);
      }

      setIsLoading(false);
    });

    setGlobalToastObject(toast);
  }, []);

  const openPasswordSidebar = () => {
    setIsPasswordSidebar(true);
  }

  const Actions = (item: PasswordItem) => {
    return (
        <div>
          <i
              className="pi pi-copy"
              style={{marginLeft: "10px", cursor: "pointer"}}
              onClick={() => copyToClipboard(item.value)}
          />
          <i
              className="pi pi-pencil"
              style={{marginLeft: "10px", cursor: "pointer"}}
              onClick={() => openPasswordSidebar()}
          />
        </div>
    );
  };

  return (
    <div className="app">
      <DataTable value={secrets} filterDisplay="row">
        <Column field="type" header="Type" body={TypeTemplate} filter />
        <Column field="name" header="Name" body={NameTemplate} filter />
        <Column field="secret" header="Pass" body={Actions} />
      </DataTable>
      {isLoading && (
        <div className="app__spinner-container">
          <ProgressSpinner />
        </div>
      )}
      <Toast ref={toast} />
      <PasswordSidebar visible={isPasswordSidebar} onClose={() => setIsPasswordSidebar(false)}/>
    </div>
  );
}
