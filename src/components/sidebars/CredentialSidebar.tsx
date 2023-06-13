import {Sidebar} from "primereact/sidebar";
import "./CredentialSidebar.scss";
import {lang} from "../../lang";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {credentialTypes} from "../../settings/credentialTypes";

export default function CredentialSidebar(props: any) {
    const [type, setType] = useState(null);
    const [username, setUsername] = useState("");

    const onClose = () => {
        props.onClose();
    }

    return (
        <Sidebar className="password-sidebar" visible={props.visible} onHide={() => onClose()} position="right" dismissable>
            <div className="password-sidebar__title">
                {lang.title.editCredential}
            </div>
            <div className="password-sidebar__body">
                <Dropdown value={type} onChange={(e) => setType(e.value)} options={credentialTypes} optionLabel="label"
                             optionValue="name" placeholder={lang.label.selectType} filter />
                <InputText value={username} onChange={(event) => setUsername(event.target.value)} placeholder={lang.label.username}/>
            </div>
        </Sidebar>
    );
}