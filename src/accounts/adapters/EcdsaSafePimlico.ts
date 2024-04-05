import { privateKeyToAccount } from "viem/accounts";
import { SmartAccount } from "../Account";
import { PRIVATE_KEY } from "../../config";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { publicClient } from "../../clients/rpc";
import {
	ENTRYPOINT_ADDRESS_V07,
	createSmartAccountClient,
} from "permissionless";
import { pimlicoBundlerClient, pimlicoTransport } from "../../clients/bundlers";
import { getTransferData } from "../../utils/transfer";
import type { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { pimlicoPaymasterClient } from "../../clients/paymasters";

export class EcdsaSafePimlico extends SmartAccount {
	public name = "ECDSASafePimlico";
	private signer = privateKeyToAccount(PRIVATE_KEY as any);
	private account:
		| Awaited<
				ReturnType<typeof signerToSafeSmartAccount<ENTRYPOINT_ADDRESS_V07_TYPE>>
		  >
		| undefined;
	private client: ReturnType<typeof this.getClient> | undefined;

	public async sendERC20() {
		if (!this.account) throw new Error("Account not setup");
		if (!this.client) throw new Error("Client not setup");

		const txHash = await this.client.sendTransaction({
			to: this.erc20Address,
			data: getTransferData(this.recipient, BigInt(1e18)),
		});

		return txHash;
	}

	public async setup(): Promise<void> {
		this.account = await signerToSafeSmartAccount(publicClient, {
			signer: this.signer,
			entryPoint: ENTRYPOINT_ADDRESS_V07,
			safeVersion: "1.4.1",
			saltNonce: BigInt(Math.floor(Math.random() * 1e18)), // randomise account address
		});
		this.client = this.getClient();
		this.address = this.account.address;
	}

	private getClient() {
		if (!this.account) throw new Error("Account not setup");
		return createSmartAccountClient({
			account: this.account,
			entryPoint: ENTRYPOINT_ADDRESS_V07,
			chain: publicClient.chain,
			bundlerTransport: pimlicoTransport,
			middleware: {
				gasPrice: async () => {
					return (await pimlicoBundlerClient.getUserOperationGasPrice()).fast // if using pimlico bundlers
				},
				sponsorUserOperation: pimlicoPaymasterClient.sponsorUserOperation, // optional
			}
		});
	}
}
