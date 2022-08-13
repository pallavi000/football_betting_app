import React from "react";
import FileSubmitLoader from "../../../Loader/FileSubmitLoader";

function Desktop({
  handleSubmit,
  handleChange,
  handleSubmitPassword,
  user,
  isLoading,
  setConfirmPassword,
  setNewPassword,
  newPassword,
  confirmPassword,
}) {
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
                required
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
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                name="role"
                onChange={(e) => handleChange(e)}
                defaultValue={user.role}
              >
                <option value={"user"}>User</option>
                <option value={"admin"}>Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Balance</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  $
                </span>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Balance"
                  name="balance"
                  onChange={(e) => handleChange(e)}
                  defaultValue={user.balance}
                  required
                />
              </div>
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

        <div className="add-card-title mt-5">Edit Password</div>
        <div className="">
          <form onSubmit={(e) => handleSubmitPassword(e)}>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                defaultValue={newPassword}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                defaultValue={confirmPassword}
                required
              />
              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <div className="invalid-feedback d-block">
                    Password doesn't match.
                  </div>
                )}
            </div>
            {isLoading ? (
              <button className="btn btn-primary" disabled>
                Updating
              </button>
            ) : newPassword &&
              confirmPassword &&
              newPassword === confirmPassword ? (
              <button className="btn btn-primary">Update Password</button>
            ) : (
              <button className="btn btn-primary" disabled>
                Invalid Entry
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Desktop;
