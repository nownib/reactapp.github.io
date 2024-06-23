import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
  // muốn truyền gì vào component thì props sẽ chứa hết
  //Phan trang
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [currentLimit, setCurrentLimit] = useState([4]);
  const [totalPages, setTotalPages] = useState([0]);
  //modal delete
  const [dataModal, setDataModal] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  //User
  const [dataModalUser, setDataModalUser] = useState({});
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    console.log("check response", response)
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await fetchUsers();
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };
  const comfirmDeleteUser = async (user) => {
    let response = await deleteUser(dataModal);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };
  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({}); //set lai data
    await fetchUsers(); //co the set truc tiep tai button
  };

  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title my-3">
              <h3>Manage User</h3>
            </div>
            <div className="action my-3">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh" aria-hidden="true"></i> Refesh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i> Add new user
              </button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.phone}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-3"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i> Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        dataModal={dataModal}
        handleClose={handleClose}
        comfirmDeleteUser={comfirmDeleteUser}
      />
      <ModalUser
        show={isShowModalUser}
        onHide={onHideModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
