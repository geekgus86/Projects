import Swal from 'sweetalert2';

export class AlertHelper {
    
    showInfoMessage(title: string, message: string){
        Swal.fire({
          title: title, 
          text: message, 
          type: "info"
        });
      }
    
      showSuccessMessage(title: string, message: string) {
        Swal.fire({
          title: title, 
          text: message, 
          type: "success"
        });
      }
    
      showErrorMessage(title: string, message: string) {
        Swal.fire({
          title: title, 
          text: message, 
          type: "error"
        });
      }
}