import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSecrets } from "./api/getSecrets";
import { TypeTemplate } from "./components/columns/TypeTemplate";
import { NameTemplate } from "./components/columns/NameTemplate";
import { PassTemplate } from "./components/columns/PassTemplate";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { ExtendedDocument } from "./types/documentType";

function App() {
  const [secrets, setSecrets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    getSecrets(process.env.REACT_APP_DECRYPT_KEY ?? "").then((data: any) => {
      if (data?.items.length) {
        setSecrets(data.items);
      }

      setIsLoading(false);
    });

    (document as ExtendedDocument).$toast = toast;
  }, []);

  return (
    <div className="app">
      <DataTable value={secrets} filterDisplay="row">
        <Column field="type" header="Type" body={TypeTemplate} filter />
        <Column field="name" header="Name" body={NameTemplate} filter />
        <Column field="secret" header="Pass" body={PassTemplate} />
      </DataTable>
      {isLoading && (
        <div className="app__spinner-container">
          <ProgressSpinner />
        </div>
      )}
      <Toast ref={toast} />
    </div>
  );
}

export default App;
