import { http } from "viem";

export const zeroDevGelatoProxyBundlerTransport = http(
	process.env.ZERODEV_BUNDLER_RPC_URL + "?provider=GELATO",
);
