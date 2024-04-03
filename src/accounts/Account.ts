import { encodeFunctionData, type Address, type Hash, erc20Abi } from "viem";
import { ERC20_ADDRESS, RECIPIENT_ADDRESS } from "../config";

export abstract class Account {
	public erc20Address: Address = ERC20_ADDRESS;
	public recipient: Address = RECIPIENT_ADDRESS;
	public abstract name: string;

	protected getERC20Data(): Hash {
		return encodeFunctionData({functionName: "transfer", abi: erc20Abi, args: [this.recipient, BigInt(1e18)]});
	}

	public abstract sendERC20(): Promise<Hash>;
	public setup?(): Promise<void>;
}
