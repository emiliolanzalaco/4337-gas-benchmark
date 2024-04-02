import { Account } from "../Account";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "../../config";
import { createWalletClient, encodeFunctionData, http } from "viem";
import { sepolia } from "viem/chains";
import { ERC20_ABI } from "../../abi/ERC20_ABI";
import { getTransactionCount, waitForTransactionReceipt } from "viem/actions";

export class EOA extends Account {
	public name: string = "EOA";
	private account = privateKeyToAccount(PRIVATE_KEY as any);
	public client = createWalletClient({
		account: this.account,
		chain: sepolia,
		transport: http("https://rpc.sepolia.org"),
	});
	private nonce: number = 0;

	async sendERC20() {
		const txHash = await this.client.sendTransaction({
			to: this.erc20Address,
			data: encodeFunctionData({
				functionName: "transfer",
				abi: ERC20_ABI,
				args: [this.recipient, BigInt(1)],
			}),
			nonce: this.nonce++,
		});
		return txHash;
	}

	async sendETH() {
		const txHash = await this.client.sendTransaction({
			to: this.recipient,
			value: BigInt(1),
			nonce: this.nonce++,
		});
		return txHash;
	}

	public async setup() {
		this.nonce = await getTransactionCount(this.client, {
			address: this.account.address,
		});
	}
}
