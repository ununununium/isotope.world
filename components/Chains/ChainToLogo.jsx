import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";

const LOGO_DICT = {
	"0x1": {
		key: "0x1",
		value: "Ethereum",
		icon: <ETHLogo />,
	},
	"0x539": {
		key: "0x539",
		value: "Local Chain",
		icon: <ETHLogo />,
	},
	"0x3": {
		key: "0x3",
		value: "Ropsten Testnet",
		icon: <ETHLogo />,
	},
	"0x4": {
		key: "0x4",
		value: "Rinkeby Testnet",
		icon: <ETHLogo />,
	},
	"0x2a": {
		key: "0x2a",
		value: "Kovan Testnet",
		icon: <ETHLogo />,
	},
	"0x5": {
		key: "0x5",
		value: "Goerli Testnet",
		icon: <ETHLogo />,
	},
	"0x38": {
		key: "0x38",
		value: "Binance",
		icon: <BSCLogo />,
	},
	"0x61": {
		key: "0x61",
		value: "Smart Chain Testnet",
		icon: <BSCLogo />,
	},
	"0x13881": {
		key: "0x89",
		value: "Polygon",
		icon: <PolygonLogo />,
	},
	"0x13881": {
		key: "0x13881",
		value: "Mumbai",
		icon: <PolygonLogo />,
	},
	"0xa86a": {
		key: "0xa86a",
		value: "Avalanche",
		icon: <AvaxLogo />,
	},
};

export const Logos = ({ chainId, style }) => {
	return <div style={style}>{LOGO_DICT[chainId]?.icon}</div>;
};
