import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js"
import { useLocation, useNavigate } from "react-router"
import axios from "axios";

// the columns is coming from the app.js, which the columns as a prop of the item (e.g hotels, user, rooms etc)
const Datatable = ({columns}) => {
  // calling user data from the database 
  //useLocation  this function is to pick routh path 
  const location = useLocation();
  //selecting the second array item in the location path
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const {data, loading, error} = useFetch(`/${path}`)
    console.log(location)
      useEffect(()=>{
        setList(data)
      }, [data])

  // deleting user data from the database
  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`);
      setList(data.filter((item) => item._id !== id));
    }catch(err){}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
