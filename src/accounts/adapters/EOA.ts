import { Account } from "../Account";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "../../config";
import { createWalletClient, encodeFunctionData, http } from "viem";
import { sepolia } from "viem/chains";
import { getTransactionCount, waitForTransactionReceipt } from "viem/actions";

export class EOA extends Account {
	public name: string = "EOA";
	private account = privateKeyToAccount(PRIVATE_KEY as any);
	public client = createWalletClient({
		account: this.account,
		chain: sepolia,
		transport: http("https://rpc.sepolia.org"),
	});

	async sendERC20() {
		const txHash = await this.client.sendTransaction({
			to: this.erc20Address,
			data: this.getERC20Data()
		});
		return txHash;
	}
}
