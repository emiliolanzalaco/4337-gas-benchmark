import { privateKeyToAccount } from "viem/accounts";
import { SmartAccount } from "../Account";
import { PRIVATE_KEY } from "../../config";
import { signerToEcdsaKernelSmartAccount } from "permissionless/accounts";
import { publicClient } from "../../clients/rpc";
import {
	ENTRYPOINT_ADDRESS_V06,
	createBundlerClient,
	createSmartAccountClient,
} from "permissionless";
import { sepolia } from "viem/chains";
import { zeroDevGelatoProxyBundlerTransport } from "../../clients/bundlers";
import { getTransferData } from "../../utils/transfer";
export const bundlerClient = createBundlerClient({
	transport: zeroDevGelatoProxyBundlerTransport,
	entryPoint: ENTRYPOINT_ADDRESS_V06,
});
export class EcdsaKernelGelato extends SmartAccount {
	public name = "ECDSAKernelGelato";
	private signer = privateKeyToAccount(PRIVATE_KEY as any);
	private account:
		| Awaited<ReturnType<typeof signerToEcdsaKernelSmartAccount>>
		| undefined;
	private client: ReturnType<typeof this.getClient> | undefined;

	public async sendERC20() {
		if (!this.account) throw new Error("Account not setup");
		if (!this.client) throw new Error("Client not setup");

		const txHash = await this.client.sendTransaction({
      to: this.erc20Address,
			data: getTransferData(this.recipient, BigInt(1e18)),
      // @ts-ignore
			maxFeePerGas: "0x0",   
      // @ts-ignore
			maxPriorityFeePerGas: "0x0",
		});

		return txHash;
	}

	public async setup(): Promise<void> {
		this.account = await signerToEcdsaKernelSmartAccount(publicClient, {
			signer: this.signer,
			entryPoint: ENTRYPOINT_ADDRESS_V06,
			index: BigInt(Math.floor(Math.random() * 1e18)), // randomise account address
		});
		this.client = this.getClient();
		this.address = this.account.address;
	}

	private getClient() {
		if (!this.account) throw new Error("Account not setup");
		return createSmartAccountClient({
			account: this.account,
			entryPoint: ENTRYPOINT_ADDRESS_V06,
			chain: sepolia,
			bundlerTransport: zeroDevGelatoProxyBundlerTransport,
		});
	}
}
