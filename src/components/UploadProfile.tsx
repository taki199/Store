import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { uploadProfilePhoto } from '../features/authSlice';
import { Order } from '../types/index';


const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state:any) => state.auth.user);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadProfilePhoto(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <img
                src={user.profilePhoto.url}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </>
          )}
        </div>
        <div>
          <input
            type="file"
            className="hidden"
            id="profilePhoto"
            onChange={handleFileChange}
          />
          <label
            htmlFor="profilePhoto"
            className="cursor-pointer inline-block py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Change Photo
          </label>
          {file && (
            <button
              onClick={handleUpload}
              className="ml-4 py-2 px-4 bg-green-500 text-white rounded-lg"
            >
              Upload
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {user && user.orders.length > 0 ? (
                user.orders.map((order: Order) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.createdAt}</td>
                    <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                    <td className="py-2 px-4 border-b">{order.orderStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
