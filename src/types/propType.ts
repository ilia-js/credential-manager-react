import { CredentialPostItem } from "./tableType";

export interface CredentialSidebarProps {
    visible: boolean;
    item: CredentialPostItem;
    onClose: () => void;
    onSave: (item: CredentialPostItem) => void;
}