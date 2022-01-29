import "../styles/globals.css";
import "antd/dist/antd.css";
import Layout from "../components/layouts/main";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";

function MyApp({ Component, pageProps, router }) {
	const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
	const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

	return (
		<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
			<style>
				@import
				url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Oxanium:wght@200;300;400;500;600;700;800&display=swap');
			</style>
			<MoralisDappProvider>
				<Layout router={router}>
					<Component {...pageProps} key={router.route} />
				</Layout>
			</MoralisDappProvider>
		</MoralisProvider>
	);
}

export default MyApp;
