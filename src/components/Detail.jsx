import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ChevronUp, ChevronDown, Search, List, Grid, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DetailPage = () => {
  const { isAuth ,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'id', 
    direction: 'ascending' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); 
  const itemsPerPage = 10;

   useEffect(() => {
          const checkAuth = () => {
              if (!sessionStorage.getItem("isAuth")) {
                  logout();
                  navigate("/login");
              }
          };
  
          checkAuth();
  
          window.addEventListener("storage", checkAuth);
  
          return () => {
              window.removeEventListener("storage", checkAuth);
          };
      }, [isAuth, navigate, logout]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedUsers = useMemo(() => {
    if (!users.length) return [];

    return [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig]);


  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user => 
      Object.values(user).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedUsers, searchTerm]);

  
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  
  const handleMobileSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };


  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

 
  const MobileUserCard = ({ user }) => (
    <div className="bg-zinc-800 text-white rounded-lg p-4 mb-4 shadow-md">
      <div className="flex justify-between mb-2 items-center">
        <div className="flex-grow overflow-hidden">
          <span className="font-bold text-lg text-white block truncate">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <span className="text-zinc-300 ml-2 flex-shrink-0">ID: {user.id}</span>
      </div>
      <div className="space-y-2">
        <p className="text-white overflow-hidden">
          <span className="font-semibold text-zinc-300 mr-1">Email:</span> 
          <span className="truncate block">{user.email}</span>
        </p>
        <p className="text-white">
          <span className="font-semibold text-zinc-300 mr-1">Age:</span> {user.age}
        </p>
      </div>
    </div>
  );

 
const MobileSortHeader = () => (
    <div className="sm:hidden bg-zinc-700 p-4">
      <div className="flex justify-between items-center">
        
        <div className="relative w-full flex items-center">
          <select 
            value={sortConfig.key}
            onChange={(e) => handleMobileSort(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white rounded pr-10"
          >
            <option value="id">ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="age">Age</option>
          </select>
          <div 
            className="absolute right-6 cursor-pointer ml-2"
            onClick={() => setSortConfig(prev => ({
              ...prev,
              direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
            }))}
          >
            {sortConfig.direction === 'ascending' ? (
              <ChevronUp className="text-white " />
            ) : (
              <ChevronDown className="text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  
  const renderTableHeader = (key, label) => (
    <th 
      key={key}
      onClick={() => handleMobileSort(key)}
      className="px-4 py-2 cursor-pointer hover:bg-zinc-700 text-left"
    >
      <div className="flex items-center text-white">
        {label}
        {sortConfig.key === key && (
          sortConfig.direction === 'ascending' 
            ? <ChevronUp className="ml-2 w-4 h-4" /> 
            : <ChevronDown className="ml-2 w-4 h-4" />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-zinc-800 min-h-screen p-4 sm:p-8 text-white">
     
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-zinc-700 text-white rounded"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        </div>

       
        <div className="sm:hidden flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-zinc-600' : 'bg-zinc-700'}`}
          >
            <Grid className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-zinc-600' : 'bg-zinc-700'}`}
          >
            <List className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      
      <MobileSortHeader />

      
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg text-white">
      
        <div className="hidden sm:block">
          <table className="w-full text-white">
            <thead className="bg-zinc-700">
              <tr className="grid grid-cols-5 gap-4 w-full">
                {renderTableHeader('id', 'ID')}
                {renderTableHeader('firstName', 'First Name')}
                {renderTableHeader('lastName', 'Last Name')}
                {renderTableHeader('email', 'Email')}
                {renderTableHeader('age', 'Age')}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr 
                  key={user.id} 
                  className="grid grid-cols-5 gap-4 border-b border-zinc-700 hover:bg-zinc-700 transition text-white"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="sm:hidden p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {paginatedUsers.map(user => (
                <MobileUserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div>
              {paginatedUsers.map(user => (
                <MobileUserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-zinc-800 space-y-2 sm:space-y-0 text-white">
        <div className="text-center sm:text-left">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
          {filteredUsers.length} entries
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-700 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;