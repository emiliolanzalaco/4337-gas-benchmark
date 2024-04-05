import { http } from "viem";
import { PIMLICO_API_KEY } from "../config";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPimlicoBundlerClient } from "permissionless/clients/pimlico";

export const zeroDevGelatoProxyBundlerTransport = http(
	process.env.ZERODEV_BUNDLER_RPC_URL + "?provider=GELATO",
);

export const zeroDevPimlicoProxyBundlerTransport = http(
	process.env.ZERODEV_BUNDLER_RPC_URL + "?provider=PIMLICO"
)

export const pimlicoTransport = http("https://api.pimlico.io/v2/sepolia/rpc?apikey=" + PIMLICO_API_KEY)

export const pimlicoBundlerClient = createPimlicoBundlerClient({
	entryPoint: ENTRYPOINT_ADDRESS_V07,
	transport: pimlicoTransport,
})