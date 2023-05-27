import "./Header.scss";
import {Avatar} from "primereact/avatar";
import {MouseEvent, useRef, useState} from "react";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {lang} from "../../lang";
import {resetAuthToken} from "../../helpers/auth";
import {localRoutes} from "../../settings/localRoutes";
import {useNavigate} from "react-router-dom";

export default function Header() {
    // TODO Change 'ID' to real user name later;
    const [username] = useState("ID");
    const menuUser = useRef<Menu>(null);
    const navigate = useNavigate();

    const menuItems: MenuItem[] = [
        {
            label: lang.label.logout,
            icon: 'pi pi-fw pi-user',
            command: () => {
                resetAuthToken();
                navigate(localRoutes.login)
            },
        }
    ];

    const openMenuUser = (event: MouseEvent<HTMLElement>): void => {
        if (menuUser.current) {
            menuUser.current.toggle(event)
        }
    }

    return (
        <div className="header-panel">
            <div className="header-panel__user-place">
                <Avatar onClick={(event) => openMenuUser(event)} label={username} shape="circle" aria-controls="popup_menu_user" aria-haspopup />
                <Menu popup ref={menuUser} model={menuItems} id="popup_menu_user"/>
            </div>
        </div>
    )
}
