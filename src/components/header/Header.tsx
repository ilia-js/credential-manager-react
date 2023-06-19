import "./Header.scss";
import {Avatar} from "primereact/avatar";
import {MouseEvent, useRef, useState} from "react";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {lang} from "../../lang";
import {getAuthUser, resetAuthToken, resetAuthUser} from "../../helpers/auth";
import {localRoutes} from "../../settings/localRoutes";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const [user] = useState(getAuthUser());
    const menuUser = useRef<Menu>(null);
    const navigate = useNavigate();
    console.log(user)

    const menuItems: MenuItem[] = [
        {
            label: user?.name,
            icon: 'pi pi-fw pi-user',
        },
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
                <Avatar onClick={(event) => openMenuUser(event)} label={user?.name} shape="circle" aria-controls="popup_menu_user" aria-haspopup />
                <Menu popup ref={menuUser} model={menuItems} id="popup_menu_user"/>
            </div>
        </div>
    )
}
