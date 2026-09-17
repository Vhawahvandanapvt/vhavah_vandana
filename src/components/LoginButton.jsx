"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10 pl-2 pr-1 py-1 rounded-full shadow-sm">
        <div className="hidden sm:flex items-center gap-2">
          {session.user?.image ? (
            <Image 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              width={28} 
              height={28} 
              className="rounded-full ring-2 ring-primary/20 object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
              {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
          )}
          <span className="text-sm font-semibold text-foreground/90 hidden md:block max-w-[100px] truncate">
            {session.user?.name?.split(" ")[0] || "User"}
          </span>
        </div>
        <div className="w-px h-4 bg-primary/20 mx-1 hidden sm:block"></div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => signOut()}
          className="w-7 h-7 rounded-full text-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline"
      onClick={() => router.push("/login")}
      className="hidden sm:flex rounded-full px-5 shadow-sm hover:shadow-md transition-all border-primary/20 hover:bg-primary/5 text-primary"
    >
      Sign In
    </Button>
  );
}
