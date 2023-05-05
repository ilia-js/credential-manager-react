import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

interface Secret {
    type: string;
    name: string;
    secret: string;
}

const secrets: Secret[] = [
    {
        type: "google",
        name: "iadomyshev@gmail.com",
        secret: "TestPass"
    }

];

const typeTemplate = (item: Secret) => {
    return <div>{item.type}</div>
}

const nameTemplate = (item: Secret) => {
    return <div>{item.name}</div>
}

const secretTemplate = () => {
    return <div>*******</div>
}

function App() {
  return (
    <div className="App">
     <DataTable value={secrets}>
         <Column field="type" header="Type" body={typeTemplate}/>
         <Column field="name" header="Name" body={nameTemplate}/>
         <Column field="secret" header="Secret" body={secretTemplate}/>
     </DataTable>
    </div>
  );
}

export default App;
