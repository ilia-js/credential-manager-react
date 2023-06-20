import React, { useEffect, useState } from "react";
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
import {remove} from "lodash";
import {aesEncrypt} from "../../helpers/encryption";
import {PostDataApi} from "../../types/apiType";
import {CredentialsTableColumns, credentialsTableSortMeta} from "../../settings/credentialsTable";

export default function CredentialsTable() {
  const [credentials, setCredentials] = useState([] as CredentialItem[]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialSidebar, setShowCredentialSidebar] = useState(false);
  const [editItem, setEditItem] = useState(initialCredentialItem);

  useEffect(() => {
    setIsLoading(true);

    getApiCredentials(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data) => {
      console.log("decrypted data is:", data);
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

  const onSaveItem = (item: CredentialItem) => {
      remove(credentials, (el) => el.id === item.id);
      credentials.push(item);
      const payload: PostDataApi = { items: credentials, updated: (new Date()).toISOString() }

      // TODO: Send request with updated encrypted data to API on every save;
      const encryptedData = aesEncrypt(JSON.stringify(payload), process.env.REACT_APP_DECRYPT_KEY ?? "");
      console.log("payload is:", payload);
      console.log("encrypted data is:", encryptedData[0]);
      setEditItem(initialCredentialItem);
      setShowCredentialSidebar(false);
  }

  const onCloseSidebar = () => {
    setShowCredentialSidebar(false)
  }

  return (
    <div className="app">
      <DataTable value={credentials} filterDisplay="row" multiSortMeta={credentialsTableSortMeta} sortMode="multiple">
        <Column field={CredentialsTableColumns.Type} header={lang.table.type} body={TypeTemplate} filter sortable />
        <Column field={CredentialsTableColumns.Username} header={lang.table.username} body={NameTemplate} filter sortable />
        <Column field={CredentialsTableColumns.Password} header={lang.table.password} body={Actions} />
      </DataTable>
      {isLoading && (
        <div className="app__spinner-container">
          <ProgressSpinner />
        </div>
      )}

      <CredentialSidebar item={editItem} visible={showCredentialSidebar} onClose={onCloseSidebar}
        onSave={onSaveItem}/>
    </div>
  );
}