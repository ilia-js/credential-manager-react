import {CredentialItem} from "./tableType";

export interface CredentialSidebarProps {
    visible: boolean;
    item: CredentialItem;
    onClose: () => void;
    onSave: (item: CredentialItem) => void;
}