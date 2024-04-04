import { ethers } from "ethers";
import { EOA } from "../Account";
import { GELATO_API_KEY, RPC_URL } from "../../config";
import type { Hash } from "viem";
import {
	GelatoRelay,
	type CallWithERC2771Request,
} from "@gelatonetwork/relay-sdk";
import { sepolia } from "viem/chains";
import { getTransferData } from "../../utils/transfer";

export class GelatoERC2771EOA extends EOA {
	public name = "GelatoERC2771EOA";
	public provider = new ethers.JsonRpcProvider(RPC_URL);
	public signer = new ethers.Wallet(
		process.env.PRIVATE_KEY as any,
		this.provider
	);
	private gelatoRelay = new GelatoRelay();

	public async sendERC20() {
		const request: CallWithERC2771Request = {
			chainId: BigInt(sepolia.id),
			target: this.erc20Address,
			data: getTransferData(this.recipient, BigInt(1e18)),
			user: this.signer.address,
		};
		const relayResponse = await this.gelatoRelay.sponsoredCallERC2771(
			request,
			this.signer as any,
			GELATO_API_KEY as string
		);
		const txHash = await this.pollForTxHash(relayResponse.taskId);
		return txHash;
	}

	public async sendETH() {
		return "N/A" as any;
	}

	private async pollForTxHash(taskId: string): Promise<Hash> {
		return new Promise((resolve, reject) => {
			const interval = setInterval(async () => {
				try {
					const task = await this.gelatoRelay.getTaskStatus(taskId);
					console.log(task?.transactionHash);
					if (task?.transactionHash) {
						clearInterval(interval);
						resolve(task.transactionHash as Hash);
					}
				} catch (error) {
					reject(error);
				}
			}, 1000);
		});
	}
}
