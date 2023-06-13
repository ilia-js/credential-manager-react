import {Sidebar} from "primereact/sidebar";
import "./CredentialSidebar.scss";
import {lang} from "../../lang";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Dropdown} from "primereact/dropdown";

export default function CredentialSidebar(props: any) {
    const [type, setType] = useState(null);
    const [username, setUsername] = useState("");
    const types = [{name: "google", label: "Google"}, {name: "facebook", label: "Facebook"}];
    const onClose = () => {
        props.onClose();
    }

    return (
        <Sidebar className="password-sidebar" visible={props.visible} onHide={() => onClose()} position="right">
            <div className="password-sidebar__title">
                {lang.title.editCredential}
            </div>
            <div className="password-sidebar__body">
                {type}
                <Dropdown value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="label"
                             optionValue="name" placeholder={lang.label.selectType} />
                <InputText value={username} onChange={(event) => setUsername(event.target.value)} placeholder={lang.label.username}/>
            </div>
        </Sidebar>
    );
}