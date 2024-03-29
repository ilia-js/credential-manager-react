import "./Header.scss";
import {MouseEvent, useRef, useState} from "react";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {lang} from "../../lang";
import {getAuthUser, resetAuthToken, resetAuthUser} from "../../helpers/auth";
import {localRoutes} from "../../settings/localRoutes";
import {useNavigate} from "react-router-dom";
import {Badge} from "primereact/badge";

export default function Header() {
    const [user] = useState(getAuthUser());
    const menuUser = useRef<Menu>(null);
    const navigate = useNavigate();

    const menuItems: MenuItem[] = [
        {
            label: lang.label.logout,
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                resetAuthToken();
                resetAuthUser();
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
                <Badge onClick={(event) => openMenuUser(event)} value={`Username: ${user?.username}`} size="normal" aria-controls="popup_menu_user" aria-haspopup />
                <Menu popup ref={menuUser} model={menuItems} id="popup_menu_user" />
            </div>
        </div>
    )
}
