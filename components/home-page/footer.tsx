import Link from "next/link"
import { footerData } from "@/lib/data"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const socialIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    facebook : Facebook,
  }

  return (
    <footer className=" h-[800px] md:h-screen bg-emerald-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className= " flex justify-center items-center mb-8 w-full">
          <h2 className="text-4xl md:text-[150px]  font-normal mb-8 font-(family-name:--font-poppins)">FRAME FINDER</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-xl font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerData.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-emerald-200 transition-colors font-normal">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-xl font-medium mb-4">About Us</h3>
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
            <h3 className="text-xl font-medium mb-4">Information</h3>
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
            <h3 className="text-xl font-medium mb-4">Chat with us</h3>
            <p className="mb-4">{footerData.contact.phone}</p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <Link key={social.name} href={social.href} className="hover:text-emerald-200 transition-colors">
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
