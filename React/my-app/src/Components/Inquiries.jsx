import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import { Button } from "react-bootstrap";

const Inquiries = () => {
  // Inquiry data state
  const [data, setData] = useState([
    { InquiryID: "I001", Name: "Ali Khan", Phone: "9876543210", Email: "ali@example.com", Message: "Need details about packages.", Status: "Pending" },
    { InquiryID: "I002", Name: "Sara Lee", Phone: "7890123456", Email: "sara@example.com", Message: "Looking for a wedding planner.", Status: "Pending" },
    { InquiryID: "I003", Name: "John Doe", Phone: "1234567890", Email: "john@example.com", Message: "Want to book a hall.", Status: "Pending" },
    { InquiryID: "I004", Name: "Emily Davis", Phone: "5556667777", Email: "emily@example.com", Message: "Need a photographer.", Status: "Pending" },
    { InquiryID: "I005", Name: "David Wilson", Phone: "9998887776", Email: "david@example.com", Message: "Requesting catering service.", Status: "Pending" },
    { InquiryID: "I006", Name: "Sophia Brown", Phone: "7778889996", Email: "sophia@example.com", Message: "Looking for a DJ.", Status: "Pending" },
    { InquiryID: "I007", Name: "Michael Scott", Phone: "6665554443", Email: "michael@example.com", Message: "Want floral decorations.", Status: "Pending" },
    { InquiryID: "I008", Name: "Jessica Taylor", Phone: "4443332221", Email: "jessica@example.com", Message: "Need event planning assistance.", Status: "Pending" },
    { InquiryID: "I009", Name: "Tom Anderson", Phone: "1112223334", Email: "tom@example.com", Message: "Interested in photography service.", Status: "Pending" },
    { InquiryID: "I010", Name: "Nancy White", Phone: "3334445556", Email: "nancy@example.com", Message: "Looking for budget-friendly packages.", Status: "Pending" },
  ]);

  // Handle Approve
  const handleApprove = (id) => {
    setData(data.map(item => (item.InquiryID === id ? { ...item, Status: "Approved" } : item)));
  };

  // Handle Reject
  const handleReject = (id) => {
    setData(data.map(item => (item.InquiryID === id ? { ...item, Status: "Rejected" } : item)));
  };

  // Table Columns
  const columns = React.useMemo(
    () => [
      { Header: "Inquiry ID", accessor: "InquiryID" },
      { Header: "Name", accessor: "Name" },
      { Header: "Phone", accessor: "Phone" },
      { Header: "Email", accessor: "Email" },
      { Header: "Message", accessor: "Message" },
      { Header: "Status", accessor: "Status" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="button-group">
            <Button size="sm" onClick={() => handleApprove(row.original.InquiryID)}>Approve</Button>
            <Button size="sm" onClick={() => handleReject(row.original.InquiryID)} className="ms-2">Reject</Button>
          </div>
        ),
      },
    ],
    [data]
  );

  // Table Instance with Pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 8 } },
    usePagination
  );

  return (
    <div className="container mt-4">
      <h2>Inquiries</h2>
      <table {...getTableProps()} className="table table-bordered">
        <thead className="thead-dark">
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} key={hg.id}>
              {hg.headers.map((header) => (
                <th {...header.getHeaderProps()}>{header.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.InquiryID}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <Button onClick={previousPage} disabled={!canPreviousPage}>Previous</Button>
        <span>Page {pageIndex + 1} of {pageOptions.length}</span>
        <Button onClick={nextPage} disabled={!canNextPage}>Next</Button>
      </div>
    </div>
  );
};

export default Inquiries;
