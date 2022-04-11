import "../styles/global.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BooksProvider } from "../contexts/BooksContext";
import { UserProvider } from "../contexts/UsersContext";
import { PublisherProvider } from "../contexts/PublishersContext";
import { appWithTranslation } from "next-i18next";
import { RentalProvider } from "../contexts/RentalsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <RentalProvider>
        <BooksProvider>
          <UserProvider>
            <PublisherProvider>
              <Component {...pageProps} />
            </PublisherProvider>
          </UserProvider>
        </BooksProvider>
      </RentalProvider>

      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
