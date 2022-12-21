
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import useThunk  from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem ({ user }) {

  const [ doRemoveUser, isLoading, error ] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  }

  // When a Fragment is used, It does not render an additional HTML component like a div, Rather
  // It just renders whatever is present inside of it.
  const header = <>
      <Button loading= {isLoading} onClick = {handleClick} className= 'mr-3'>
        <GoTrashcan />
      </Button>
      { error && <div>Error deleting user.</div>}
      {user.name}  
  </>

  return (
    <ExpandablePanel header= {header}>
      <AlbumsList user= {user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;