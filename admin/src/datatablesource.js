import { width } from "@mui/system";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avater.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250},
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70},
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const verifyColums = [
  { field: "_id", headerName: "ID", width: 70},
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "photo",
    headerName: "ID photo",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo || "https://i.ibb.co/MBtjqXQ/no-avater.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "ID Type",
    width: 100,
  },
  {
    field: "user_id",
    headerName: "USer ID",
    width: 100,
  },
  {
    field: "verified",
    headerName: "Status",
    width: 100,
  },
];
