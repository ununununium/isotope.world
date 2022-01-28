module.exports = {
	reactStrictMode: true,
	env: {
		REACT_APP_MORALIS_APPLICATION_ID:
			process.env.REACT_APP_MORALIS_APPLICATION_ID,
		REACT_APP_MORALIS_SERVER_URL: process.env.REACT_APP_MORALIS_SERVER_URL,
	},
	react: {
		useSuspense: true,
		wait: true,
	},
	images: {
		domains: ["ipfs.moralis.io"],
	},
};
