import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
{% if values.uiLibrary == 'tailwind' %}
import './index.css'
{% elif values.uiLibrary == 'material-ui' %}
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})
{% endif %}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {% if values.uiLibrary == 'material-ui' %}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {% else %}
    <App />
    {% endif %}
  </React.StrictMode>,
)
