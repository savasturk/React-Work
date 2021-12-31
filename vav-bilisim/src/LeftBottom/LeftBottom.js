import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
//import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import fs from 'fs';
import { useGlobalState} from 'state-pool';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, returnValue, change } from './counterSlice'


import store from './store'

let dataValues = [
  {
    "id": 1,
    "Id": "1",
    "Kontrat": "2019",
    "Teklif": "78,352",
    "Data": "Satış"
  },
  {
    "id": 2,
    "Id": "2",
    "Kontrat": "2019",
    "Teklif": "12475",
    "Data": "Satış"
  },
  {
    "id": 3,
    "Id": "3",
    "Kontrat": "2018",
    "Teklif": "365,24",
    "Data": "Alış"
  },
  {
    "id": 4,
    "Id": "4",
    "Kontrat": "2019",
    "Teklif": "25182",
    "Data": "Satış"
  },
  {
    "id": 5,
    "Id": "5",
    "Kontrat": "2018",
    "Teklif": "1234,5",
    "Data": "Alış"
  },
  {
    "id": 5,
    "Id": "5",
    "Kontrat": "2018",
    "Teklif": "1234,5",
    "Data": "Alış"
  }
];



const LeftBottom = (props) => {

  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  dispatch(change(dataValues));
  const [contacts, setContacts] = useState(dataValues);
  const [addFormData, setAddFormData] = useState({
    Id: "",
    Kontrat: "",
    Teklif: "",
    Data: "",
  });

  const [editFormData, setEditFormData] = useState({
    Id: "",
    Kontrat: "",
    Teklif: "",
    Data: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

 

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      Id: addFormData.Id,
      Kontrat: addFormData.Kontrat,
      Teklif: addFormData.Teklif,
      Data: addFormData.Data,
    };
    let a = JSON.stringify(newContact);


    console.log(newContact);

    const newContacts = [...contacts, newContact];
    dataValues = newContacts;

    var product = [];
    dispatch(change(newContacts));
    console.log("yenisiii");
    console.log(store.getState().counter.val);
    returnDataValues();
    store.subscribe(returnDataValues);
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      Id: editFormData.Id,
      Kontrat: editFormData.Kontrat,
      Teklif: editFormData.Teklif,
      Data: editFormData.Data,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      Id: contact.Id,
      Kontrat: contact.Kontrat,
      Teklif: contact.Teklif,
      Data: contact.Data,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Kontrat</th>
              <th>Teklif</th>
              <th>Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Item Ekle</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="Id"
          required="required"
          placeholder="Id giriniz..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Kontrat"
          required="required"
          placeholder="Kontrat giriniz..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Teklif"
          required="required"
          placeholder="Teklif giriniz..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Data"
          required="required"
          placeholder="Data giriniz..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    
  );

  
};

export {dataValues};


export function returnDataValues() {

  return (
    dataValues
  );
}
export default LeftBottom;