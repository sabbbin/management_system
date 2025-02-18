import { useQuery } from "@tanstack/react-query";
import Table from "../component/ui/table";
import { Dispatch, useState } from "react";
import { axiosInstance } from "../hooks/base-api";
import { UserSchemaType } from "../schema/userSchema";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { createPortal } from "react-dom";
import { Model } from "../component/ui/dialog-box";
import { RegisterPage } from "./register/admin-register-page";

function ColumnComponent({
  setOpenDialog,
  setOpenDeleteDialog,
}: {
  setOpenDialog: Dispatch<null | UserSchemaType>;
  setOpenDeleteDialog: Dispatch<string | null>;
}): ColumnDef<UserSchemaType & { id: string }>[] {
  return [
    {
      accessorKey: "id",
      header: "S.No",
      cell: (props) => (
        <p className="text-center">{Number(props.row.id) + 1}</p>
      ),
    },
    {
      accessorKey: "first_name",
      header: "FirstName",
      cell: (props) => (
        <p className="text-center">{props.getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "last_name",
      header: "LastName",
      cell: (props) => (
        <p className="text-center">{props.getValue<string>()}</p>
      ),
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: (props) => (
        <p className="text-center capitalize">
          {props.getValue<string>().toLowerCase()}
        </p>
      ),
    },
    {
      accessorKey: "dob",
      header: "D.O.B",
      cell: (props) => (
        <p className="text-center">
          {dayjs(props.getValue<string>()).format("YYYY-MM-DD")}
        </p>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (props) => (
        <p className="text-center">{props.getValue<string>()}</p>
      ),
    },
    {
      header: "Actions",
      cell: (props) => (
        <div className="flex justify-center gap-3 p-4 ">
          <button
            type="button"
            className="bg-green-500 p-2 rounded-md"
            onClick={() => {
              setOpenDialog(props.row.original);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1.5 8.73003V10.25C1.5 10.39 1.61 10.5 1.75 10.5H3.27C3.335 10.5 3.4 10.475 3.445 10.425L8.905 4.97003L7.03 3.09503L1.575 8.55003C1.525 8.60003 1.5 8.66003 1.5 8.73003ZM10.355 3.52003C10.55 3.32503 10.55 3.01003 10.355 2.81503L9.185 1.64503C8.99 1.45003 8.675 1.45003 8.48 1.64503L7.565 2.56003L9.44 4.43503L10.355 3.52003Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            type="button"
            className="bg-red-500 p-2 rounded-md"
            onClick={() => {
              setOpenDeleteDialog(props.row.original.phone);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 9.5C3 10.05 3.45 10.5 4 10.5H8C8.55 10.5 9 10.05 9 9.5V4.5C9 3.95 8.55 3.5 8 3.5H4C3.45 3.5 3 3.95 3 4.5V9.5ZM9 2H7.75L7.395 1.645C7.305 1.555 7.175 1.5 7.045 1.5H4.955C4.825 1.5 4.695 1.555 4.605 1.645L4.25 2H3C2.725 2 2.5 2.225 2.5 2.5C2.5 2.775 2.725 3 3 3H9C9.275 3 9.5 2.775 9.5 2.5C9.5 2.225 9.275 2 9 2Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
}

export const UserList = () => {
  const [editUserDialog, setEditUserDialog] = useState<UserSchemaType | null>();
  const [deleteUserDialog, setDeleteUserDialog] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);

  const { data } = useQuery({
    queryKey: ["userlist in userlist", offset, limit],
    queryFn: () =>
      axiosInstance()
        .get(`/user?limit=${limit}&offset=${offset}`)
        .then((res) => res.data),
  });

  const column = ColumnComponent({
    setOpenDialog: setEditUserDialog,
    setOpenDeleteDialog: setDeleteUserDialog,
  });

  console.log("daelte", deleteUserDialog);

  return (
    <div>
      <Table<UserSchemaType & { id: string }>
        columns={column}
        data={data?.data?.userList ?? []}
        offset={offset}
        setOffset={setOffset}
        limit={limit}
        setLimit={setLimit}
        totalCount={Number(data?.data?.totalCount || 0)}
      />
      {deleteUserDialog &&
        createPortal(
          <Model onClose={() => setDeleteUserDialog(null)}>
            <RegisterPage />
          </Model>,
          document.body,
        )}
      {editUserDialog &&
        createPortal(
          <Model onClose={() => setEditUserDialog(null)}>
            <RegisterPage />
          </Model>,
          document.body,
        )}
    </div>
  );
};
