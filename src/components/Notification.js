import useAPIError from '../hooks/ApiError';

export default function APIErrorNotification() {
  const { error, removeError } = useAPIError();

  const handleSubmit = () => {
    removeError();
  };

//   return (
//     <Modal
//       open={!!error}
//       data-testid="notification-modal"
//     >
//       <div>
//         {error && error.message && <p>({error.message})</p>}
//         <button data-testid="notification-submit-button" onClick={handleSubmit}>
//           Ok
//         </button>
//       </div>
//     </Modal>
//   )

return (
      <div>
        {error && error.message && <p style={{color:'white'}}>({error.message})</p>}
        <button data-testid="notification-submit-button" onClick={handleSubmit}>
          Ok
        </button>
      </div>
  )
}