import { useContext } from 'react';
import { APIErrorContext } from '../providers/Notifications';

function useAPIError() {
  const { error, addError, removeError } = useContext(APIErrorContext);
  return { error, addError, removeError };
}

export default useAPIError;