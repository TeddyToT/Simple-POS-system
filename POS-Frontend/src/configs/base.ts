const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN as string || 'https://localhost:7089' //Development

if (!backendDomain) {
  throw new Error('VITE_BACKEND_DOMAIN is not defined')
}
//HTTP
// const backendDomain = 'http://localhost:5055'

const socketDomain = backendDomain

const baseConfig = {
  backendDomain,
  socketDomain,
  apiEndpoint: backendDomain
}

export default baseConfig
