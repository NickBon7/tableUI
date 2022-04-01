import { nanoid } from "nanoid";
import { Fragment, useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import EditRow from "./EditRow";

const TableMain = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  //
  const [editFormData, setEditFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  //
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  //
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setDeleteUserId(event.target.dataset.id);

    setShow(true);
  };
  //

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const addFormHandler = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const editFormChangeHandler = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      id: nanoid(),
      name: addFormData.name,
      username: addFormData.username,
      email: addFormData.email,
      phone: addFormData.phone,
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    const newUsers = [...users, newUser];
    setUsers(newUsers);
  };

  const editFormSubmitHandler = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editUserId,
      name: editFormData.name,
      username: editFormData.username,
      email: editFormData.email,
      phone: editFormData.phone,
    };

    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedUser;

    setUsers(newUsers);
    setEditUserId(null);

    fetch(`http://localhost:3000/users/${editUserId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const editClickHandler = (event, user) => {
    // event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    setEditFormData(formValues);
  };

  const cancelClickHandler = () => {
    setEditUserId(null);
  };

  const deleteHandler = () => {
    const newUsers = [...users];
    const tempUsers = [...users];

    const index = users.findIndex((user) => user.id == deleteUserId);
    newUsers.splice(index, 1);
    setUsers(newUsers);

    fetch(`http://localhost:3000/users/${deleteUserId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status >= 400 && response.status <= 599) {
          setTimeout(() => {
            setUsers(tempUsers);
          }, 2000);
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <form onSubmit={editFormSubmitHandler}>
        <Table striped bordered className="mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment key={user.id}>
                {editUserId === user.id ? (
                  <EditRow
                    editFormData={editFormData}
                    editFormChangeHandler={editFormChangeHandler}
                    cancelClickHandler={cancelClickHandler}
                  />
                ) : (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.username} </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={(event) => editClickHandler(event, user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={(event) => {
                          handleShow(event);
                        }}
                        data-id={user.id}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </form>

      <h2>Add a user</h2>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Enter a name..."
          onChange={addFormHandler}
        ></input>
        <input
          type="text"
          name="username"
          placeholder="Enter a username..."
          onChange={addFormHandler}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Enter a email..."
          onChange={addFormHandler}
        ></input>
        <input
          type="text"
          name="phone"
          placeholder="Enter a phone..."
          onChange={addFormHandler}
        ></input>
        <Button type="submit" variant="outline-success">
          Add
        </Button>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure to delete it?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              handleClose();
              deleteHandler();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableMain;
