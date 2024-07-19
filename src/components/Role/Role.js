import "./Role.scss";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = (props) => {
  const childDefault = { child1: { url: "", description: "", isValid: true } };

  const childRef = useRef();
  const [listChilds, setListChilds] = useState({
    child1: childDefault,
  });

  const handleOnChangInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);

    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValid"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    //uuid tạo định danh giúp tạo được nhiều ô mới, trùng sẽ không tạo được
    _listChilds[`child-${uuidv4()}`] = childDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const handleOnClick = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);

      if (res && +res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetchListRolesAgain();
      }
    } else {
      toast.error("Input URL must not be empty!");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValid"] = false;
      setListChilds(_listChilds);
    }
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).find(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className="adding-roles mt-3">
            <div className="title-role">
              <h4>Add a new role</h4>
            </div>
            <div className="row role-parent">
              {Object.entries(listChilds).map(([key, child], index) => {
                return (
                  <div className="role-child row" key={`child-${key}`}>
                    
                    <div className={`col-5 form-group child-${key}`}>
                      <label>URL:</label>
                      <input
                        type="text"
                        className={
                          child.url
                            ? "form-control"
                            : "is-invalid form-control "
                        }
                        value={child.url}
                        onChange={(event) =>
                          handleOnChangInput("url", event.target.value, key)
                        }
                      />
                    </div>
                    <div className="col-5 form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(event) =>
                          handleOnChangInput(
                            "description",
                            event.target.value,
                            key
                          )
                        }
                      />
                    </div>
                    <div className="col-2 mt-4 action">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash-o delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}

              <div>
                <button
                  className="btn btn-warning mt-3"
                  onClick={() => handleOnClick()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h4>List role</h4>
            <TableRole ref={childRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
