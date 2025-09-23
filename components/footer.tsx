import Link from "next/link"
import { footerData } from "@/lib/data"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const socialIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    pinterest: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.179.339.715.339c3.775 0 6.437-3.169 6.437-7.401 0-3.209-2.708-5.821-6.039-5.821-4.528 0-6.808 3.211-6.808 5.889 0 1.615.613 3.054 1.928 3.595.216.089.411.003.475-.24.044-.174.149-.596.195-.775.063-.241.039-.325-.133-.535-.375-.459-.613-1.048-.613-1.884 0-2.427 1.813-4.604 4.72-4.604 2.573 0 3.98 1.571 3.98 3.67 0 2.758-1.22 5.09-3.036 5.09-.998 0-1.747-.829-1.505-1.846.289-1.218.848-2.532.848-3.409 0-.787-.422-1.443-1.295-1.443-1.026 0-1.851.061-1.851 2.115 0 .771.104 1.292.104 1.292s-.688 2.909-.809 3.42c-.138.585-.021 1.339-.011 1.413z" />
      </svg>
    ),
  }

  return (
    <footer className="bg-emerald-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">FRAME FINDER</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerData.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-emerald-200 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {footerData.aboutUs.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-emerald-200 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {footerData.information.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-emerald-200 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Chat with us</h3>
            <p className="mb-4">{footerData.contact.phone}</p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <Link key={social.name} href={social.href} className="hover:text-emerald-200 transition-colors">
                    <IconComponent />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}