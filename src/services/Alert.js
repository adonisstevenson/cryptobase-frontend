// import React, { useContext } from 'react';
// import { AlertContext } from '../context/AlertContext';

// const Alert = () => {
//   const { alert, hideAlert } = useContext(AlertContext);

//   if (!alert.show) {
//     return null;
//   }

//   return (
//     <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
//       {alert.message}
//       <button
//         type="button"
//         className="btn-close"
//         data-bs-dismiss="alert"
//         aria-label="Close"
//         onClick={hideAlert}
//       ></button>
//     </div>
//   );
// };

// export default Alert;