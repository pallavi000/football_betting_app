import React from "react";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";

function Desktop({ handleSubmit, user, isLoading, handleChange }) {
  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="add-card-section">
        <div className="add-card-title">Edit Profile</div>
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => handleChange(e)}
                defaultValue={user.name}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
                defaultValue={user.email}
                readOnly
              ></input>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={(e) => handleChange(e)}
                defaultValue={user.phone}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => handleChange(e)}
                defaultValue={user.address}
                required
              ></input>
            </div>

            {isLoading ? (
              <button className="btn btn-primary" disabled>
                Updating
              </button>
            ) : (
              <button className="btn btn-primary">Update</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Desktop;
