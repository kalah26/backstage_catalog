import React, { useState, useEffect } from 'react'
{% if values.uiLibrary == 'material-ui' %}
import { Container, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material'
{% elif values.uiLibrary == 'antd' %}
import { Card, Button, Spin, Typography } from 'antd'
const { Title, Paragraph } = Typography
{% endif %}
{% if values.enableAuth %}
import { useAuth } from '../contexts/AuthContext'
{% endif %}
import { useApi } from '../contexts/ApiContext'

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  {% if values.enableAuth %}
  const { user } = useAuth()
  {% endif %}
  const { get } = useApi()

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await get('/health')
      setData(response)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="{% if values.uiLibrary == 'tailwind' %}min-h-screen bg-gray-50 py-8{% else %}home-page{% endif %}">
      {% if values.uiLibrary == 'material-ui' %}
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to ${{ values.name }}
            </Typography>
            <Typography variant="body1" paragraph>
              ${{ values.description }}
            </Typography>
            {% if values.enableAuth %}
            {user && (
              <Typography variant="h6" color="primary">
                Hello, {user.name}!
              </Typography>
            )}
            {% endif %}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Refresh Data'}
            </Button>
            {data && (
              <Typography variant="body2" style={{ marginTop: '1rem' }}>
                API Status: {JSON.stringify(data)}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
      {% elif values.uiLibrary == 'antd' %}
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <Title level={1}>Welcome to ${{ values.name }}</Title>
          <Paragraph>
            ${{ values.description }}
          </Paragraph>
          {% if values.enableAuth %}
          {user && (
            <Title level={4} type="success">
              Hello, {user.name}!
            </Title>
          )}
          {% endif %}
          <Button 
            type="primary" 
            onClick={fetchData}
            loading={loading}
          >
            Refresh Data
          </Button>
          {loading && <Spin style={{ marginLeft: '1rem' }} />}
          {data && (
            <Paragraph style={{ marginTop: '1rem' }}>
              API Status: {JSON.stringify(data)}
            </Paragraph>
          )}
        </Card>
      </div>
      {% else %}
      <div className="{% if values.uiLibrary == 'tailwind' %}max-w-4xl mx-auto px-4{% else %}container{% endif %}">
        <div className="{% if values.uiLibrary == 'tailwind' %}bg-white rounded-lg shadow-lg p-8{% else %}card{% endif %}">
          <h1 className="{% if values.uiLibrary == 'tailwind' %}text-4xl font-bold text-gray-800 mb-4{% else %}title{% endif %}">
            Welcome to ${{ values.name }}
          </h1>
          <p className="{% if values.uiLibrary == 'tailwind' %}text-lg text-gray-600 mb-6{% else %}description{% endif %}">
            ${{ values.description }}
          </p>
          
          {% if values.enableAuth %}
          {user && (
            <h3 className="{% if values.uiLibrary == 'tailwind' %}text-xl font-semibold text-green-600 mb-4{% else %}welcome-message{% endif %}">
              Hello, {user.name}!
            </h3>
          )}
          {% endif %}

          <button
            onClick={fetchData}
            disabled={loading}
            className="{% if values.uiLibrary == 'tailwind' %}bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors{% else %}btn btn-primary{% endif %}"
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>

          {data && (
            <div className="{% if values.uiLibrary == 'tailwind' %}mt-6 p-4 bg-gray-100 rounded-lg{% else %}api-status{% endif %}">
              <strong>API Status:</strong> {JSON.stringify(data)}
            </div>
          )}
        </div>
      </div>
      {% endif %}
    </div>
  )
}

export default Home
