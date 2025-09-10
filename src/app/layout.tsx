import "./globals.css";
import BiomatterApp from "./marketplace-business/marketplace";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BiomatterApp />
      </body>
    </html>
  );
}
