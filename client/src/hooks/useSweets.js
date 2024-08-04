import Swal from 'sweetalert2';

export const showDialog = async (title, icon, confirmButtonText) => {
  return await Swal.fire({
    title,
    icon,
    showCancelButton: true,
    confirmButtonText,
  });
};

export const showToast = (message, icon = 'success') => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon,
    title: message,
  });
};
