import {Sidebar} from "primereact/sidebar";
import "./PasswordSidebar.scss";
import {lang} from "../../lang";

export default function PasswordSidebar(props: any) {
    const onClose = () => {
        props.onClose();
    }

    return (
        <Sidebar className="password-sidebar" visible={props.visible} onHide={() => onClose()} position="right">
            <div className="password-sidebar__title">
                {lang.title.editPassword}
            </div>
            <div className="password-sidebar__body">
                some content
            </div>
        </Sidebar>
    );
}