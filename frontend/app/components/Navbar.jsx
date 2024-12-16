"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Home, Upload, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pages/upload", label: "Upload Data", icon: Upload },
  ];

  // Scroll effect

  return (
    <>
      <header
        className={`
          w-full bg-transparent absolute top-0 left-0 flex items-center z-50 sticky-top
        `}
      >
        <nav className="container mx-auto flex items-center justify-between p-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logofix.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-dark text-white font-medium">
              {NavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 hover:text-primary transition"
                  >
                    <link.icon className="w-4 h-4 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-dark text-white border-primary hover:bg-primary hover:text-white"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-white bg-dark text-dark text-white"
              >
                <SheetHeader>
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-8">
                  {NavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-lg hover:text-primary transition"
                    >
                      <link.icon className="w-5 h-5 text-primary" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
