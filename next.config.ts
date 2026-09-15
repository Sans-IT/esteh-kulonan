import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    allowedDevOrigins: [
      "*.vercel.app",
      "*:3000"
    ],
}

export default nextConfig
