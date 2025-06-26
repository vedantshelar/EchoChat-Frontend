import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  let [formData, setFormData] = useState({ groupName: "" });
  let navigate = useNavigate();

  function handleInput(event) {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    setFormData((currFormData) => {
      return { ...currFormData, [fieldName]: fieldValue };
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/group/create`, { groupName: formData.groupName }, { withCredentials: true });
    if (response.data.success) {
      navigate(`/groups`);
      setFormData({ groupName: "" });
    } else {
      alert("Error Occured While creating a group!");
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ boxShadow: "0px 10px 5px rgba(235, 235, 235, 0.62)", padding: "20px", borderRadius: "5px", display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "15px" }}>Create Group</h2>
      <div className="mb-3">
        <label htmlFor="groupName" className="form-label">Enter Group Name</label>
        <input type="text" className="form-control" id="groupName" name="groupName" value={formData.groupName} onChange={handleInput} />
      </div>
      <button type="submit" className="btn btn-dark" style={{ width: "150px", alignSelf: "flex-end" }}>Create</button>
    </form>
  );
}

export default CreateGroup;