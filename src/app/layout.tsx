import "./globals.css";
import KPlusBankingApp from "./landing-farmers/landing";
import MobileTable from "./marketplace-business/marketplace";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MobileTable />
      </body>
    </html>
  );
}
