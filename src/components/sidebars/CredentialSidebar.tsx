import { Sidebar } from "primereact/sidebar";
import "./CredentialSidebar.scss";
import { lang } from "../../lang";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { credentialTypes } from "../../settings/credentialTypes";
import { orderBy } from "lodash";
import { CredentialSidebarProps } from "../../types/propType";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { CredentialPostItem } from "../../types/tableType";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { InputTextarea } from "primereact/inputtextarea";

export default function CredentialSidebar(props: CredentialSidebarProps) {
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [savedData, setSavedData] = useState({
    type: "",
    username: "",
    password: "",
    comment: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const credentialTypeOptions = orderBy(credentialTypes, "label");

  useEffect(() => {
    setType(props.item.type);
    setUsername(props.item.username);
    setPassword(props.item.password);
    setComment(props.item.comment);
    setSavedData({
      type: props.item.type,
      username: props.item.username,
      password: props.item.password,
      comment: props.item.comment,
    });
  }, [props.item]);

  useEffect(() => {}, [type, username, password]);

  useEffect(() => {
    setIsChanged(
      type !== savedData.type ||
        username !== savedData.username ||
        password !== savedData.password ||
        comment !== savedData.comment
    );
  }, [
    type,
    username,
    password,
    comment,
    savedData.type,
    savedData.username,
    savedData.password,
    savedData.comment,
  ]);

  const onClose = () => {
    if (isChanged) {
      openConfirmCancelDialog();
      return;
    }

    props.onClose();
  };

  const onChangeType = (type: any) => {
    setType(type);
  };

  const onSave = () => {
    const item: CredentialPostItem = {
      id: props.item.id,
      type,
      username,
      password,
      comment,
    };
    props.onSave(item);
  };

  const openConfirmCancelDialog = () => {
    confirmDialog({
      message: lang.message.areYouSureDiscardChanges,
      header: lang.title.discardChanges,
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: onConfirmDiscardChanges,
    });
  };

  const onConfirmDiscardChanges = () => {
    props.onClose();
  };

  return (
    <Sidebar
      className="password-sidebar"
      visible={props.visible}
      onHide={() => onClose()}
      position="right"
      dismissable={false}
      closeOnEscape={false}
    >
      <div className="password-sidebar__container">
        <div>
          <div className="password-sidebar__title">
            {lang.title.editCredential}
          </div>
          <div className="password-sidebar__body">
            <Dropdown
              value={type}
              onChange={(e) => onChangeType(e.value)}
              options={credentialTypeOptions}
              optionLabel="label"
              optionValue="name"
              placeholder={lang.label.selectType}
              filter
            />
            <InputText
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder={lang.label.username}
              autoComplete="off"
            />
            <Password
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={lang.label.password}
              autoComplete="new-password"
              toggleMask
            />
            <InputTextarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder={lang.placeholder.description}
            />
          </div>
        </div>
        <div className="password-sidebar__buttons">
          <Button
            label={lang.button.cancel}
            onClick={onClose}
            severity="secondary"
            text
            size="small"
          />
          <Button
            label={lang.button.save}
            disabled={!isChanged}
            severity="help"
            onClick={onSave}
            size="small"
            outlined={true}
          />
        </div>
        <ConfirmDialog />
      </div>
    </Sidebar>
  );
}
