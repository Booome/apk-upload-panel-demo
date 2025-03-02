import logo from "@/app/favicon.ico";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center py-8">
      <Image
        src={logo}
        className="h-8 w-8"
        alt="logo"
        width={100}
        height={100}
      />
      <span className="ml-2 text-xl font-medium">APK Upload Panel Demo</span>

      <div className="divider divider-horizontal mr-2 ml-auto" />
      <button className="mr-0 ml-0 font-semibold">SIGN IN</button>
    </header>
  );
}
