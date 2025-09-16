#!/bin/bash

# Generate runtime environment configuration for React app

# Create the env-config.js file with environment variables
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  VITE_API_URL: "\${VITE_API_URL:-${{ values.apiUrl }}}",
  VITE_APP_NAME: "\${VITE_APP_NAME:-${{ values.name }}}",
  VITE_DEBUG: "\${VITE_DEBUG:-false}",
  VITE_ENV: "\${VITE_ENV:-production}"
};
EOF

echo "Environment configuration generated:"
cat /usr/share/nginx/html/env-config.js

# Start nginx
exec nginx -g 'daemon off;'
