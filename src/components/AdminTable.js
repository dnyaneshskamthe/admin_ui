import react, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function AdminTable(props) {
  const data = props.mData;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((member) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchValue) ||
      member.email.toLowerCase().includes(searchValue) ||
      member.role.toLowerCase().includes(searchValue)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Initialize counter to 1 for the Sr column
  let srCounter = 1;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <input
            className="mb-2"
            type="text"
            placeholder="Search by name, email, or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((member, index) => (
              <tr key={member.id}>
                {" "}
                {/* Use a unique identifier for the key */}
                <th scope="row">{startIndex + index + 1}</th>{" "}
                {/* Increment the counter */}
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <span className="material-icons-outlined">edit_note</span>
                  <span
                    style={{ color: "red" }}
                    className="material-icons-outlined"
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          />
          {[
            ...Array(Math.ceil(filteredData.length / entriesPerPage)).keys(),
          ].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => handlePageClick(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === Math.ceil(filteredData.length / entriesPerPage)}
            onClick={() => handlePageClick(currentPage + 1)}
          />
          <Pagination.Last
            onClick={() =>
              setCurrentPage(Math.ceil(filteredData.length / entriesPerPage))
            }
            disabled={
              currentPage === Math.ceil(filteredData.length / entriesPerPage)
            }
          />
        </Pagination>
      </div>
    </>
  );
}

export default AdminTable;
