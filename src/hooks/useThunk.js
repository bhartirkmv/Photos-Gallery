import { useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';


function useThunk (thunk) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const dispatch = useDispatch();
  // This is the actual function that is going to run our Thunk
  // and dispatch it and update our Loading and error states along the way.
  const runThunk = useCallback((arg) => {
    setIsLoading(true);
    dispatch(thunk(arg))
      .unwrap()
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));

  }, [dispatch, thunk]);

  // We are putting in the arguments of dispatch and thunk inside the 
  // useCallback array , because we want to create 
  // a new runThunk, when any of dispatch and thunk changes in value.
  // When any of them does not change, we want to run the original 
  // function itself.

  return [ runThunk, isLoading , error];

}

export default useThunk;