import {Sidebar} from "primereact/sidebar";
import "./CredentialSidebar.scss";
import {lang} from "../../lang";
import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {credentialTypes} from "../../settings/credentialTypes";
import {orderBy} from "lodash";
import {CredentialSidebarProps} from "../../types/propType";

export default function CredentialSidebar(props: CredentialSidebarProps) {
    const [type, setType] = useState("");
    const [username, setUsername] = useState("");
    const credentialTypeOptions = orderBy(credentialTypes, "label");

    useEffect(() => {
        setType(props.item.type);
    }, [props.item]);

    const onClose = () => {
        props.onClose();
    }

    const onChangeType = (type: any) => {
        setType(type);
    }

    return (
        <Sidebar className="password-sidebar" visible={props.visible} onHide={() => onClose()} position="right" dismissable>
            <div className="password-sidebar__title">
                {lang.title.editCredential}
            </div>
            <div className="password-sidebar__body">
                <Dropdown value={type} onChange={(e) => onChangeType(e.value)} options={credentialTypeOptions} optionLabel="label"
                             optionValue="name" placeholder={lang.label.selectType} filter />
                <InputText value={username} onChange={(event) => setUsername(event.target.value)} placeholder={lang.label.username}/>
            </div>
        </Sidebar>
    );
}