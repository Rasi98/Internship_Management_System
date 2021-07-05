import MaterialTable from "material-table";
import React from "react";
import Navbar from "./Navbar";


export default function Editable() {
    const { useState } = React;

    const [data, setColumns] = useState()
        const columns=[
        { title: 'IM No', field: 'imno', type: 'numeric' },
        { title: 'Name', field: 'name' },
        { title: 'Specializtion Area', field: 'specializationArea'},
            { title: 'Company 1', field: 'company1'},
            { title: 'Company 2', field: 'company2'},
            { title: 'Company 3', field: 'company3'},
    ];


    return (
        <React.Fragment>
            <Navbar/>
            <div className="container mt-4">
            <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
        />
            </div>
        </React.Fragment>
    )
}
