import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/role/create", [...roles]);//truyền mảng gồm các role
};
const fetchAllRoles = () => {
  return axios.get("/api/role/read");
};

const deleteRole = (role) => {
  return axios.delete("/api/role/delete", { data: { id: role.id } }); //truyền 1 đối tượng là id
};

const fetchRoleByGroup =(groupId)=>{
  return axios.get(`/api/role/by-group/${groupId}`);
}

const assignRoleToGroup = (data) => {
  return axios.post("/api/role/assign-to-group", {data}); //truyền đối tượng gồm id group+ mảng các role
};

export { createRoles, fetchAllRoles, deleteRole, fetchRoleByGroup, assignRoleToGroup };
