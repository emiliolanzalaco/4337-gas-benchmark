import { EOA } from "../Account";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "../../config";
import {
	createWalletClient,
	http,
} from "viem";
import { getTransferData } from "../../utils/transfer";
import { publicClient } from "../../clients/rpc";

export class RegularEOA extends EOA {
	public name: string = "RegularEOA";
	private account = privateKeyToAccount(PRIVATE_KEY as any);
	public address = this.account.address;
	public client = createWalletClient({
		account: this.account,
		chain: publicClient.chain,
		transport: http(publicClient.transport.url),
	});

	async sendERC20() {
		const txHash = await this.client.sendTransaction({
			to: this.erc20Address,
			data: getTransferData(this.recipient, BigInt(1e18)),
		});
		return txHash;
	}
}
