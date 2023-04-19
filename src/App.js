import React , { useState, useEffect }from 'react'
import AdminTable from './components/AdminTable'

const App = () => {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
        { method : "GET" });
        const data = await response.json();
        setMembersData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <>
    <div className='container container-fluide'>
      <div className='d-flex flex-column justify-content-center align-items-center text-center'>
        <p style={{fontSize:"2rem"}}>Admin UI</p>
        {loading  ? <p className='text-muted'>Loading...</p> : 
        <div className='table table-responsive' style={{ width: '100%', height: '90%' }}>
          { membersData && <AdminTable mData = { membersData}/> }
        </div>}
      </div>
    </div>
    </>
  )
}

export default App