import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/elegant-glasses-background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="flex flex-col">
          <div className="w-32 h-8 bg-emerald-500 rounded flex items-center justify-center mb-1">
            <span className="text-white text-sm font-bold">FRAME FINDER</span>
          </div>
          <span className="text-gray-700 text-xs">An Eyewear Hub</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  )
}