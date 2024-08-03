document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareButton');
    shareButton.addEventListener('click', shareContent);
  
    async function shareContent() {
      const shareData = {
        title: 'Theatrix',
        text: 'Share the LOVE for Theater',
        url: 'https://theatrix.com'
      };
  
      try {
        if (navigator.share) {
          // Web Share API is supported
          await navigator.share(shareData);
          console.log('Content shared successfully');
        } else {
          // Prompt the user to share manually
          const shareMessage = `Share this content: ${shareData.text} ${shareData.url}`;
          if (confirm(shareMessage)) {
  
            alert('To share this content, copy the URL and share it manually.');
          }
        }
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    }
  });