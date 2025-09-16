# React Frontend Template Documentation

This template creates a production-ready React frontend application based on your DevOps Red Line project architecture.

## Template Features

### ⚛️ **Core Technologies**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **ESLint** for code linting
- **Vitest** for testing

### 🎨 **UI Framework Options**
- **Tailwind CSS** with DaisyUI (default)
- **Material-UI** with theming
- **Ant Design** components
- **None** (custom CSS)

### 🔧 **Configuration Options**
- **Authentication** - Optional JWT-based auth system
- **Routing** - Optional React Router setup
- **API Integration** - Axios-based API client
- **Docker** - Multi-stage production build
- **Kubernetes** - Ready-to-deploy K8s manifests

### 📁 **Generated Structure**
```
your-app/
├── src/
│   ├── components/         # Reusable components
│   ├── pages/             # Page components (Home, Login, Profile)
│   ├── contexts/          # React contexts (API, Auth)
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Styles (Tailwind or custom)
├── k8s/                   # Kubernetes manifests
│   ├── deployment.yaml    # Application deployment
│   ├── service.yaml       # Service definition
│   └── ingress.yaml       # Ingress configuration
├── public/                # Static assets
├── Dockerfile             # Multi-stage Docker build
├── nginx.conf             # Production Nginx config
├── docker-entrypoint.sh   # Runtime environment injection
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── catalog-info.yaml      # Backstage catalog registration
└── README.md              # Complete documentation
```

## Template Parameters

### Basic Information
- **Name**: Application name (lowercase, hyphens)
- **Description**: Application description
- **Owner**: Component owner (group picker)

### Application Configuration
- **System**: System this frontend belongs to
- **API URL**: Backend API endpoint
- **Enable Authentication**: Include auth system
- **Enable Routing**: Include React Router
- **UI Library**: Choose UI framework

### Deployment Configuration
- **Deploy to Kubernetes**: Generate K8s manifests
- **Namespace**: Kubernetes namespace
- **Port**: Application port (default: 3000)
- **Replicas**: Number of replicas

### Repository Information
- **Repository URL**: GitHub repository location

## Usage Instructions

### 1. **Access the Template**
Navigate to Backstage → Create → Software Templates → React Frontend Application

### 2. **Fill Parameters**
Configure your application according to your needs:
- Choose UI library (Tailwind recommended)
- Enable authentication if needed
- Set your backend API URL
- Configure Kubernetes deployment options

### 3. **Generate Application**
The template will:
- Create a new GitHub repository
- Generate complete React application
- Set up Docker and Kubernetes configs
- Register component in Backstage catalog

### 4. **Development Workflow**
```bash
# Clone the repository
git clone <your-repo-url>
cd <your-app>

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### 5. **Deployment Options**

#### **Local Development**
```bash
npm run dev
# Access: http://localhost:3000
```

#### **Docker**
```bash
docker build -t your-app .
docker run -p 80:80 your-app
```

#### **Kubernetes**
```bash
kubectl apply -f k8s/
# Access: http://your-app.local
```

## Generated Components

### **Home Page** (`src/pages/Home.tsx`)
- Welcome message with app description
- API connectivity test
- Responsive design with chosen UI library

### **API Context** (`src/contexts/ApiContext.tsx`)
- Axios-based HTTP client
- Automatic token handling
- Request/response interceptors
- Environment-based API URL

### **Authentication** (Optional)
- Login/logout functionality
- Token storage and management
- Protected route handling
- User context management

### **Docker Configuration**
- **Multi-stage build** for optimized production
- **Nginx** for serving static files
- **Environment injection** at runtime
- **Health checks** and security headers

### **Kubernetes Manifests**
- **Deployment** with resource limits
- **Service** for internal communication
- **Ingress** for external access
- **ConfigMaps** for configuration

## Environment Variables

The template supports runtime environment configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | Template parameter |
| `VITE_APP_NAME` | Application name | Template parameter |
| `VITE_ENV` | Environment | `development` |
| `VITE_DEBUG` | Debug mode | `false` |

## Best Practices Included

### **Development**
- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Responsive design patterns

### **Production**
- Optimized Docker builds
- Nginx configuration with caching
- Security headers
- Health check endpoints

### **Deployment**
- Kubernetes resource limits
- Readiness and liveness probes
- ConfigMap-based configuration
- Ingress with proper routing

## Customization

After generating, you can customize:

1. **UI Components** - Modify or add components in `src/components/`
2. **Styling** - Update `src/index.css` or Tailwind config
3. **API Integration** - Extend `ApiContext` for specific endpoints
4. **Authentication** - Customize auth flow in `AuthContext`
5. **Deployment** - Adjust Kubernetes manifests in `k8s/`

## Integration with Your Stack

This template is designed to work seamlessly with:
- **Django backends** (like your DevOps Red Line backend)
- **Kubernetes clusters** (including Minikube)
- **ArgoCD** for GitOps deployment
- **Backstage catalog** for service discovery

The generated applications follow the same patterns as your DevOps Red Line project, ensuring consistency across your development team.

---

**Template created for the Sonatel Backstage platform** 🚀
