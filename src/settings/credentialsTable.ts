import {DataTableSortMeta} from "primereact/datatable";

export enum CredentialsTableColumns {
    Type = "type",
    Username = "name",
    Password = "secret",
}

export const credentialsTableSortMeta: DataTableSortMeta[] = [
    { field: CredentialsTableColumns.Type, order: 1 },
    { field: CredentialsTableColumns.Username, order: 1 }
];