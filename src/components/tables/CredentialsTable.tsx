import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getApiCredentials } from "api/getApiCredentials";
import { TypeTemplate } from "components/columns/TypeTemplate";
import { NameTemplate } from "components/columns/NameTemplate";
import { ProgressSpinner } from "primereact/progressspinner";
import CredentialSidebar from "../sidebars/CredentialSidebar";
import {CredentialItem} from "../../types/tableType";
import {copyToClipboard} from "../../helpers/clipboard";
import {initialCredentialItem} from "../../settings/props";
import {lang} from "../../lang";
import {credentialTypes} from "../../settings/credentialTypes";

export default function CredentialsTable() {
  const [credentials, setCredentials] = useState([] as CredentialItem[]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialSidebar, setShowCredentialSidebar] = useState(false);
  const [editItem, setEditItem] = useState(initialCredentialItem);

  useEffect(() => {
    setIsLoading(true);

    getApiCredentials(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data) => {
      if (data?.items.length) {
        const items = data.items.map((item: CredentialItem) => {
            const foundType = credentialTypes.find((el) => el.name === item.name);
            return { ...item, name: foundType?.name ?? item.name }
        });

        setCredentials(items);
      }

      setIsLoading(false);
    });
  }, []);

  const openCredentialSidebar = (item: CredentialItem) => {
    setEditItem(item);
    setShowCredentialSidebar(true);
    
  }

  const Actions = (item: CredentialItem) => {
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
              onClick={() => openCredentialSidebar(item)}
          />
        </div>
    );
  };

  return (
    <div className="app">
      <DataTable value={credentials} filterDisplay="row">
        <Column field="type" header={lang.table.type} body={TypeTemplate} filter />
        <Column field="name" header={lang.table.username} body={NameTemplate} filter />
        <Column field="secret" header={lang.table.password} body={Actions} />
      </DataTable>
      {isLoading && (
        <div className="app__spinner-container">
          <ProgressSpinner />
        </div>
      )}

      <CredentialSidebar item={editItem} visible={showCredentialSidebar} onClose={() => setShowCredentialSidebar(false)}/>
    </div>
  );
}
