import "./globals.css";
import KPlusBankingApp from "./landing-business/landing";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <KPlusBankingApp>
          {children}
        </KPlusBankingApp>
      </body>
    </html>
  );
}
