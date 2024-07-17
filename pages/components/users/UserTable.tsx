import { useGetAllUserQuery } from '@/shared/redux/services/auth';
import React, { useState, useEffect } from 'react';
import { User } from '../../../Interface/types'; // Adjust the import path as necessary
import { ClassAttributes, Fragment, HTMLAttributes, JSX } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";

//1Basic datatables

export const COLUMNS: any = [
    {
        Header: "#",
        accessor: "_id",
    },

    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Phone",
        accessor: "phone",
    },
    {
        Header: "Role",
        accessor: "roles",
    },
    {
        Header: "Active Status",
        accessor: "is_verified",
        Cell: ({ value }: { value: boolean }) => (value ? "Yes" : "No"), // Custom cell renderer
    },
    {
        Header: "Blocked Status",
        accessor: "status",
    },
    {
        Header: "Created_at",
        accessor: "created_at",
    },
    {
        Header: "Updated_at",
        accessor: "updated_at",
    },
    {
        Header: 'Delete',
        Cell: ({ row }) => (
            <div>
                <button onClick={() => handleDelete(row)}>Delete</button>
            </div>
        ),
    },
    {
        Header: 'Edit',
        Cell: ({ row }) => (
            <div>
                <button onClick={() => handleEdit(row)}>Edit</button>
            </div>
        ),
    },
];
export const data = [
    {
        _id: "1",
        name: "Tiger Nixons",
        email: "System Architect",
        delete: "Delete",
        edit: "Edit",
        phone: "09745683",
        roles: "user",
        is_verified: "false",
        status: "blocked",
        created_at: "03:02:34",
        updated_at: "02:02:34"
    },
    {
        _id: "2",
        name: "Moomal Nadeem",
        email: "moomalnadeem@gmail.com",
        phone: "33745683",
        roles: "admin",
        is_verified: "true",
        status: "active",
        created_at: "05:02:34",
        updated_at: "06:02:34"
    },


];
export const GlobalFilter = ({ filter, setFilter }: any) => {
    return (
        <span className="ms-auto">
            <input
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control !w-auto"
                placeholder="Search..."
            />
        </span>
    );
};
const handleEdit = (row: any) => {
    console.log('Edit clicked for row:', row.original);
    // Implement your edit logic here
};

const handleDelete = (row: any) => {
    console.log('Delete clicked for row:', row.original);
    // Implement your delete logic here
};
export const UserTable = () => {
    // Example handler functions
    const [users, setUsers] = useState<User[]>([]); // Initialize with empty array

    const { data: allUsersData, isSuccess: isAllUsersSuccess } = useGetAllUserQuery(undefined);

    useEffect(() => {
        if (isAllUsersSuccess) {
            setUsers(allUsersData?.users || []);
        }
    }, [allUsersData, isAllUsersSuccess]);
    console.log(users)

    const tableInstance: any = useTable(
        {
            columns: COLUMNS,
            data: users || [], // Use empty array as fallback
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps, // table props from react-table
        headerGroups, // headerGroups, if your table has groupings
        getTableBodyProps, // table body props from react-table
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        state,
        setGlobalFilter,
        page, // use, page or rows
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <div className=" mb-4 flex">
                <select
                    className="selectpage border me-1"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option key={Math.random()} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <table
                {...getTableProps()}
                className="table table-hover mb-0 table-bordered"
            >
                <thead>
                    {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={column.className}
                                    key={Math.random()}
                                >
                                    <span className="tabletitle">{column.render("Header")}</span>
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <i className="fa fa-angle-down"></i>
                                            ) : (
                                                <i className="fa fa-angle-up"></i>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell: any) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="borderrigth"
                                        key={cell.getCellProps().key}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                                {/* <td>
                                    <div>
                                        <button onClick={() => handleEdit(row)}>Edit</button>
                                        <button onClick={() => handleDelete(row)}>Delete</button>
                                    </div>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="block sm:flex items-center mt-4">
                <div className="">
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </div>
                <div className="sm:ms-auto float-right my-1 sm:my-0  ">
                    <button

                        className="btn-outline-light tablebutton me-2 sm:inline block"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {" Previous "}
                    </button>
                    <button

                        className="btn-outline-light tablebutton me-2"
                        onClick={() => {
                            previousPage();
                        }}
                        disabled={!canPreviousPage}
                    >
                        {" << "}
                    </button>
                    <button

                        className="btn-outline-light tablebutton me-2"
                        onClick={() => {
                            previousPage();
                        }}
                        disabled={!canPreviousPage}
                    >
                        {" < "}
                    </button>
                    <button

                        className="btn-outline-light tablebutton me-2"
                        onClick={() => {
                            nextPage();
                        }}
                        disabled={!canNextPage}
                    >
                        {" > "}
                    </button>
                    <button

                        className="btn-outline-light tablebutton me-2"
                        onClick={() => {
                            nextPage();
                        }}
                        disabled={!canNextPage}
                    >
                        {" >> "}
                    </button>
                    <button
                        className="btn-outline-light tablebutton sm:inline block"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {" Next "}
                    </button>
                </div>
            </div>
        </>
    );
};

