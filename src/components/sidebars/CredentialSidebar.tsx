import {Sidebar} from "primereact/sidebar";
import "./CredentialSidebar.scss";
import {lang} from "../../lang";
import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {credentialTypes} from "../../settings/credentialTypes";
import {orderBy} from "lodash";
import {CredentialSidebarProps} from "../../types/propType";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {CredentialItem} from "../../types/tableType";

export default function CredentialSidebar(props: CredentialSidebarProps) {
    const [type, setType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const credentialTypeOptions = orderBy(credentialTypes, "label");

    useEffect(() => {
        setType(props.item.type);
        setUsername(props.item.name);
        setPassword(props.item.value);
    }, [props.item]);

    const onClose = () => {
        props.onClose();
    }

    const onChangeType = (type: any) => {
        setType(type);
    }

    const onSave = () => {
        const item: CredentialItem = { id: props.item.id, name: username, value: password, type };
        props.onSave(item);
    }

    return (
        <Sidebar className="password-sidebar" visible={props.visible} onHide={() => onClose()} position="right" dismissable={false}>
            <div className="password-sidebar__title">
                {lang.title.editCredential}
            </div>
            <div className="password-sidebar__body">
                <Dropdown value={type} onChange={(e) => onChangeType(e.value)} options={credentialTypeOptions} optionLabel="label"
                             optionValue="name" placeholder={lang.label.selectType} filter />
                <InputText value={username} onChange={(event) => setUsername(event.target.value)} placeholder={lang.label.username} autoComplete="off"/>
                <Password value={password} onChange={(event) => setPassword(event.target.value)} placeholder={lang.label.password} autoComplete="new-password" toggleMask/>
            </div>
            <div className="password-sidebar__buttons">
                <Button label={lang.button.close} onClick={onClose}/>
                <Button label={lang.button.save} onClick={onSave}/>
            </div>
        </Sidebar>
    );
}