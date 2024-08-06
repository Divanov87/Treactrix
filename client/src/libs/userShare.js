export const shareContent = async () => {
    const shareData = {
      title: 'Theatrix',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Content shared successfully');
      } else {
        const shareMessage = `Share this content: ${shareData.url}`;
        if (window.confirm(shareMessage)) {
          alert('To share this content, copy the URL and share it manually.');
        }
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };