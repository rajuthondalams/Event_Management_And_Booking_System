import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
} from "react-table/dist/react-table.development";
const AdminReusableTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((header) => (
                <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                  {header.render("Header")}
                  {header.isSorted && (
                    <span>
                      {header.isSortedDesc ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()} key={row.original.SRNo}>
                {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
            </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
          <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
          <span> Page {pageIndex + 1} of {pageCount} </span>
          <button onClick={nextPage} disabled={!canNextPage}>Next</button>
      </div>
    </div>
  );
};

export default AdminReusableTable;
