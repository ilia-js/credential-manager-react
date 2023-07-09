import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getApiCredentials } from "api/getApiCredentials";
import { TypeTemplate } from "components/columns/TypeTemplate";
import { NameTemplate } from "components/columns/NameTemplate";
import { ProgressSpinner } from "primereact/progressspinner";
import CredentialSidebar from "../sidebars/CredentialSidebar";
import { CredentialPostItem} from "../../types/tableType";
import {copyToClipboard} from "../../helpers/clipboard";
import {initialCredentialItem} from "../../settings/props";
import {lang} from "../../lang";
import {maxBy, remove} from "lodash";
import {aesEncrypt} from "../../helpers/encryption";
import {PostDataApi} from "../../types/apiType";
import {CredentialsTableColumns, credentialsTableSortMeta} from "../../settings/credentialsTable";
import {saveApiCredentials} from "../../api/saveApiCredentials";
import {Button} from "primereact/button";
import "./CredentialsTable.scss";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";

export default function CredentialsTable() {
  const [credentials, setCredentials] = useState([] as CredentialPostItem[]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialSidebar, setShowCredentialSidebar] = useState(false);
  const [editItem, setEditItem] = useState(initialCredentialItem);

  useEffect(() => {
    setIsLoading(true);

    getApiCredentials(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data) => {
      if (data?.items.length) {
        setCredentials(data.items);
      }

      setIsLoading(false);
    });
  }, []);

  const editCredential = (item: CredentialPostItem) => {
    setEditItem(item);
    setShowCredentialSidebar(true);
  }

  const addCredential = () => {
    setEditItem(initialCredentialItem);
    setShowCredentialSidebar(true);
  }

  const Actions = (item: CredentialPostItem) => {
    return (
        <div>
          <i
              className="pi pi-copy"
              style={{marginLeft: "10px", cursor: "pointer"}}
              onClick={() => copyToClipboard(item[CredentialsTableColumns.Password])}
          />
          <i
              className="pi pi-pencil"
              style={{marginLeft: "10px", cursor: "pointer"}}
              onClick={() => editCredential(item)}
          />
            <i
                className="pi pi-trash"
                style={{marginLeft: "10px", cursor: "pointer"}}
                onClick={() => confirmDeleteCredentialDialog(item)}
            />
        </div>
    );
  };

  const onSaveItem = async (item: CredentialPostItem) => {
      setIsLoading(true);
      if (!item.id) {
          const maxId = maxBy(credentials, (el) => el.id)?.id ?? 0;
          item.id = maxId + 1;
      }

      remove(credentials, (el) => el.id === item.id);
      // TODO: Should refactor after type changing of item is ready;
      credentials.push(item);
      await saveDataToApi();
      setEditItem(initialCredentialItem);
      setShowCredentialSidebar(false);
      setIsLoading(false);
  }

  const saveDataToApi = async (): Promise<void> => {
      const payload: PostDataApi = { items: credentials, updated: (new Date()).toISOString() }

      // TODO: Send request with updated encrypted data to API on every save;
      const encryptedData = aesEncrypt(JSON.stringify(payload), process.env.REACT_APP_DECRYPT_KEY ?? "");
      await saveApiCredentials(encryptedData);
  }

  const onCloseSidebar = () => {
    setShowCredentialSidebar(false);
    setEditItem(initialCredentialItem);
  }

  const confirmDeleteCredentialDialog = (item: CredentialPostItem) => {
    confirmDialog({
        message: lang.message.areYouSureDeleteCredential,
        header: lang.title.deleteCredential,
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: 'p-button-danger',
        accept: () => onConfirmDeleteCredential(item),
    });
  };

  const onConfirmDeleteCredential = async (deleteItem: CredentialPostItem) => {
      if (!deleteItem) {
          return;
      }

      remove(credentials, (item) => item.id === deleteItem.id);
      setCredentials(credentials.filter((item) => item.id !== deleteItem.id))
      await saveDataToApi()
  }

  return (
    <div className="app credentials-table">
        <div className="credentials-table__action-buttons">
            <Button onClick={addCredential} label="Add credential" icon="pi pi-plus" size="small" severity="success" />
        </div>
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
      <ConfirmDialog />
    </div>
  );
}
