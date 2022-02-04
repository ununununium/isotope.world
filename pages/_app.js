import "../styles/globals.css";
import Layout from "../components/layouts/main";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";

function MyApp({ Component, pageProps, router }) {
	const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
	const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

	return (
		<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
			<MoralisDappProvider>
				<Layout router={router}>
					<Component {...pageProps} key={router.route} />
				</Layout>
			</MoralisDappProvider>
		</MoralisProvider>
	);
}

export default MyApp;
