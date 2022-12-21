import { useEffect} from 'react';
import {  useSelector} from 'react-redux';
import { fetchUsers, addUser } from '../store';
import  Skeleton  from './Skeleton';
import Button from './Button';
import useThunk from '../hooks/useThunk';
import  UsersListItem  from './UsersListItem';



function UsersList () {

  // We we go to start fetching the list of users, we change the isLoading state to true
  // And then after the data has been loaded ---
  // Whenever, we have fetched the list of users, we need to change the isLoading Users 
  // to false
  const [ doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);

  const [ doCreateUser , isCreatingUser, creatingUserError] = useThunk(addUser);

  const {data} = useSelector((state) => {
    return state.users;
  })

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]); 

  const handleUserAdd = (event) => {
    // Right before dispatch , we set IscreatingUser to true.
    doCreateUser();

  };

  // We are only checking for the loading of Users case here.

  let content;

  if(isLoadingUsers) {
    content =  <Skeleton  className='h-10 w-full' times = {6} />;
  }
  else if(loadingUsersError) {
    
    content=   <div>Error fetching data ...</div>;
    
  }

  else {
    content = data.map((user)=> {
      return <UsersListItem  key = {user.id} user= {user}/>    
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between m-3 items-center'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading = {isCreatingUser} onClick= {handleUserAdd}>
          + Add User
          </Button>
        
        {
          creatingUserError && 'Error creating user..'
        }
        
      </div>
      {content}
    </div>
  );
}

export default UsersList;