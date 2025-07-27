import React, { useContext } from 'react';
import { EllipsisVertical, User } from 'lucide-react';
import axios from 'axios';
import UserContext from '../../Context/UserContext';

const Users = () => {
    const {users, allUsers, setUsers, fetchUsers} = useContext(UserContext)

    const handleStatusChange = (id, newStatus) => {
        const obj = { status: newStatus };
        axios.patch(`http://localhost:3000/change-role/${id}`, obj)
        .then((res) => {
            console.log(res.data);
            fetchUsers(); 
        });
    };

    const handleRoleChange = (id, newRole) => {
        const obj = { role: newRole };
        axios.patch(`http://localhost:3000/change-role/${id}`, obj)
        .then((res) => {
            console.log(res.data);
            fetchUsers();
        });
    };
    
    const handleFilter=(keyword)=>{
        if(keyword === 'all'){
            setUsers(allUsers)
            return;
        }
        const filtered = allUsers.filter((user) => user.status === keyword);
        setUsers(filtered);
    }

    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='font-bold text-2xl lg:text-4xl mb-10'>All Users</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <div className='flex justify-between p-5 font-bold'>
                <p>All Users Table</p>
                <div>
                    Filter:
                    <select name="filter" defaultValue='All' onChange={(e)=>handleFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Donor Info</th>
                    <th>Current Role</th>
                    <th>Status</th>
                    <th className='text-right'>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    users?.map(user => <>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3 w-auto">
                                    <div className="avatar">
                                    <div className="mask mask-circle border rounded-full border-gray-200 h-12 w-12">
                                    <img
                                        src={user.image}
                                        alt="Avatar"
                                        />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-sm opacity-50">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <select defaultValue={user.role} onChange={(e)=>{
                                    const newRole = e.target.value
                                    handleRoleChange(user._id, newRole);
                                }} name="role">
                                    <option value="donor">Donor</option>
                                    <option value="volunteer">Volunteer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                            <span className={`badge ${user.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-800'}`}>
                            {user.status}
                            </span>
                            </td>
                            <td className='text-right'>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button">
                                    <EllipsisVertical />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-28">
                                    <li>
                                        <button
                                        className="text-sm"
                                        onClick={() => {
                                            const newStatus = user.status === 'active' ? 'blocked' : 'active';
                                            handleStatusChange(user._id, newStatus);
                                        }}
                                        >
                                        {user.status === 'active' ? 'Block' : 'Unblock'}
                                        </button>
                                    </li>
                                    </ul>
                                </div>
                             </td>
                        </tr>
                    </>)
                }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Users;