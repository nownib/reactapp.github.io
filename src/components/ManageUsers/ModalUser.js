import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import "./User.scss";
import {
  fetchGroup,
  createNewUser,
  updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const { action, dataModalUser } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    sex: "",
    address: "",
    password: "",
    group: "",
  };
  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    sex: true,
    address: true,
    password: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [userGroups, setUserGroups] = useState([]);
  const [validInput, setValidInput] = useState(validInputDefault);
  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };
  const handleOnChangInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    //create user
    if (action === "UPDATE") return true;
    setValidInput(validInputDefault);
    let arr = ["email", "phone", "password", "address", "group"];
    let check = true;
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(userData.email)) {
      setValidInput({ ...validInput, email: false });
      toast.error("Please enter a valid email address");
      check = false;
      return check;
    }
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleComfirmUser = async () => {
    //create user
    let check = checkValidateInput();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"], //trả lại id do sai key nên phải lấy id
            })
          : await updateUser({
              ...userData,
              groupId: userData["group"],
            });
      if (res && res.EC === 0) {
        props.onHide();
        setUserData({
          ...defaultUserData,
          group: userGroups && userGroups.length > 0 ? userGroups[0].id : ""
        });
      }
      if (res && res.EC !== 0) {
        //check exsist data on database
        toast.error(res.EM);
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[res.DT] = false;
        setValidInput(_validInput);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInput(validInputDefault);
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={() => handleCloseModalUser()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "email")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "phone")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Username </label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "username")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>)
                  </label>
                  <input
                    className={
                      validInput.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handleOnChangInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12 form-group">
              <label>
                Address (<span className="red">*</span>)
              </label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Gender (<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                <option value="Mail">Mail</option>
                <option defaultValue="Femail">Femail</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInput.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnChangInput(event.target.value, "group")
                }
                value={userData.group}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                ;
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleComfirmUser}>
            {action === "CREATE" ? "CREATE" : "UPDATE"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
