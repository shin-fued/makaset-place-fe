import "./globals.css";
import DeliveryTracker from "./tracking-farmers/tracking";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>
          <DeliveryTracker/>
          </h1>
      </body>
    </html>
  );
}
