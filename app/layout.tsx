import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "山姆代购 - 优质商品，便捷代购",
  description: "专业的山姆会员店代购服务，为您提供优质商品和便捷配送",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>

        {/* Live Helper Chat */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
var LHC_API = LHC_API||{};
LHC_API.args = {
    mode:'popup',
    lhc_base_url:'//mistcurrnet.com/index.php/',
    wheight:550,
    wwidth:360,
    pheight:650,
    pwidth:500,
    leaveamessage:true,
    check_messages:true,
    identifier:'api.samdaigou.com'
};
(function() {
var po = document.createElement('script');
po.type = 'text/javascript';
po.setAttribute('crossorigin','anonymous');
po.async = true;
var date = new Date();
po.src = '//mistcurrnet.com/design/defaulttheme/js/widgetv2/index.js?'+(""+ date.getFullYear() + date.getMonth() + date.getDate());
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(po, s);
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
