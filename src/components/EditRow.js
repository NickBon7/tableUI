import { Button } from "react-bootstrap";

const EditRow = ({
  editFormData,
  editFormChangeHandler,
  cancelClickHandler,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={editFormChangeHandler}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter a username..."
          name="username"
          value={editFormData.username}
          onChange={editFormChangeHandler}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter a Email..."
          name="email"
          value={editFormData.email}
          onChange={editFormChangeHandler}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter a Phone..."
          name="phone"
          value={editFormData.phone}
          onChange={editFormChangeHandler}
        ></input>
      </td>
      <td>
        <Button variant="success" type="submit">
          Save
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={cancelClickHandler}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditRow;

// https://www.youtube.com/watch?v=dYjdzpZv5yc 24:00
