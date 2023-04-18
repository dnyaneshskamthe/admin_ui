import { useState } from 'react';
import { Pagination } from 'react-bootstrap';


function AdminTable(props) {
    const data = props.mData;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((member) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchValue) ||
      member.email.toLowerCase().includes(searchValue) ||
      member.role.toLowerCase().includes(searchValue)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <input
          className='mb-2'
          type="text"
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <table className="table" style={{ width: '100%' }}>
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
          {filteredData.map((member, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                <span className="material-icons-outlined">edit_note</span>
                <span style={{ color: 'red' }} className="material-icons-outlined">delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex justify-content-center'>
        <Pagination className='mt-3'>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
        </div>
    </div>
    </>
  );
}

export default AdminTable;