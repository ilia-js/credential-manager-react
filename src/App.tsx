import React, { useEffect, useState } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSecrets } from "./api/getSecrets";

interface Secret {
  id: number;
  type: string;
  name: string;
  value: string;
}

const typeTemplate = (item: Secret) => {
  return <div>{item.type}</div>;
};

const nameTemplate = (item: Secret) => {
  return <div>{item.name}</div>;
};

const secretTemplate = () => {
  return <div>*******</div>;
};

let isDataLoaded = false;

function App() {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    if (isDataLoaded) {
      return;
    }

    getSecrets(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data: any) => {
      if (data?.items.length) {
        setSecrets(data.items);
      }
    });

    isDataLoaded = true;
  });

  return (
    <div className="App">
      <DataTable value={secrets} filterDisplay="row">
        <Column field="type" header="Type" body={typeTemplate} filter />
        <Column field="name" header="Name" body={nameTemplate} filter />
        <Column field="secret" header="Secret" body={secretTemplate} />
      </DataTable>
    </div>
  );
}

export default App;
