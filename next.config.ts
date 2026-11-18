import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/gosource',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
