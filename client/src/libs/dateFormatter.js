export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  };

  export const formatDateAdmin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };

  