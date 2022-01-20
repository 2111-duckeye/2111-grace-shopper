import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div>
      <div>
        <Link to="/addproduct">Create a product</Link>
      </div>
      <div>
        <Link to="/admin/user">Users</Link>
      </div>
    </div>
  );
};

export default AdminHome;
