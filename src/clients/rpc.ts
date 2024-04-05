import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { RPC_URL } from "../config";

export const publicClient = createPublicClient({
	chain: sepolia,
	transport: http(RPC_URL),
});
