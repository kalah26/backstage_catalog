import React, { createContext, useContext, ReactNode } from 'react'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// Get API URL from environment or window configuration
const getApiUrl = (): string => {
  // Check if running in browser and window._env_ exists (from docker-entrypoint.sh)
  if (typeof window !== 'undefined' && (window as any)._env_) {
    return (window as any)._env_.VITE_API_URL || '${{ values.apiUrl }}'
  }
  // Fallback to import.meta.env for development
  return import.meta.env.VITE_API_URL || '${{ values.apiUrl }}'
}

interface ApiContextType {
  get: (url: string) => Promise<any>
  post: (url: string, data?: any) => Promise<any>
  put: (url: string, data?: any) => Promise<any>
  delete: (url: string) => Promise<any>
  apiUrl: string
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

interface ApiProviderProps {
  children: ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const apiUrl = getApiUrl()
  
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor for auth token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('authToken')
        // You might want to redirect to login page here
      }
      return Promise.reject(error)
    }
  )

  const api: ApiContextType = {
    get: (url: string) => axiosInstance.get(url),
    post: (url: string, data?: any) => axiosInstance.post(url, data),
    put: (url: string, data?: any) => axiosInstance.put(url, data),
    delete: (url: string) => axiosInstance.delete(url),
    apiUrl,
  }

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
