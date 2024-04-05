import { privateKeyToAccount } from "viem/accounts";
import { SmartAccount } from "../Account";
import { PRIVATE_KEY } from "../../config";
import { signerToEcdsaKernelSmartAccount, signerToSafeSmartAccount } from "permissionless/accounts";
import { publicClient } from "../../clients/rpc";
import {
	ENTRYPOINT_ADDRESS_V06,
	ENTRYPOINT_ADDRESS_V07,
	createBundlerClient,
	createSmartAccountClient,
} from "permissionless";
import { sepolia } from "viem/chains";
import { zeroDevGelatoProxyBundlerTransport } from "../../clients/bundlers";
import { getTransferData } from "../../utils/transfer";
import type { ENTRYPOINT_ADDRESS_V06_TYPE, ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
export const bundlerClient = createBundlerClient({
	transport: zeroDevGelatoProxyBundlerTransport,
	entryPoint: ENTRYPOINT_ADDRESS_V06,
});
export class EcdsaSafeGelato extends SmartAccount {
	public name = "ECDSASafeGelato";
	private signer = privateKeyToAccount(PRIVATE_KEY as any);
	private account:
		| Awaited<ReturnType<typeof signerToSafeSmartAccount<ENTRYPOINT_ADDRESS_V06_TYPE>>>
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
		this.account = await signerToSafeSmartAccount(publicClient, {
			signer: this.signer,
			entryPoint: ENTRYPOINT_ADDRESS_V06,
			saltNonce: BigInt(Math.floor(Math.random() * 1e18)), // randomise account address
			safeVersion: "1.4.1",
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
