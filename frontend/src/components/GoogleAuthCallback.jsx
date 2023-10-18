import React, { useEffect } from 'react';

const GoogleAuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('error')) {
      // Handle the error case
      const error = params.get('error');
      alert(`Authentication failed: ${error}`);
    } else if (params.has('code')) {
      // Handle the successful authentication case
      const code = params.get('code');

      // Send the code to your server for verification and user authentication
      fetch('/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Successful authentication on the server
            // Redirect the user to a different route, e.g., the user profile page
            window.location.href = '/profile';
          } else {
            alert('Authentication failed on the server');
            // Handle the error and potentially redirect to an error page
          }
        })
        .catch((error) => {
          console.error('Error authenticating on the server:', error);
          // Handle the error and potentially redirect to an error page
        });
    } else {
      alert('Invalid response from Google');
      // Handle the error and potentially redirect to an error page
    }
  }, []);

  return (
    <div>
      <h2>Google Authentication Callback</h2>
      {/* You can display loading spinners or messages here */}
    </div>
  );
};

export default GoogleAuthCallback;
