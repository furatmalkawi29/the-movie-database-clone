
import {useToasts } from 'react-toast-notifications';

let ToastGenerator;

export const ToastNotifications = () =>{
     ToastGenerator = useToasts();
     return null;
}

export const showSuccessMessage = (message)=>{
    const configuration = {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        }

     ToastGenerator.addToast(message, configuration);
}
export const showErrorMessage = (message)=>{
    const configuration = {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        }

     ToastGenerator.addToast(message, configuration);
}

