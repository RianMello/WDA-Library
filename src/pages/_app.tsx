import "../styles/global.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BooksProvider } from "../contexts/BooksContext";
import { UserProvider } from "../contexts/UsersContext";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <BooksProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </BooksProvider>
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
