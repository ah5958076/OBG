import Loader from '@/Components/Loader/Loader'
import store from '@/Redux/store'
import '@/styles/globals.css'
import "react-toastify/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Dialogs from "@/Components/Dialogs";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Loader/>
        <Dialogs />
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    )
}
