import "./styles/globals.css";
import "./index.css";
import { Providers } from "./providers";
import { Bounce, ToastContainer } from "react-toastify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixwi",
  description: "Descripción de tu aplicación",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
