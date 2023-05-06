import React, { useEffect, useState } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSecrets } from "./api/getSecrets";
import { TypeTemplate } from "./components/columns/TypeTemplate";
import { NameTemplate } from "./components/columns/NameTemplate";
import { PassTemplate } from "./components/columns/PassTemplate";

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
        <Column field="type" header="Type" body={TypeTemplate} filter />
        <Column field="name" header="Name" body={NameTemplate} filter />
        <Column field="secret" header="Secret" body={PassTemplate} />
      </DataTable>
    </div>
  );
}

export default App;
