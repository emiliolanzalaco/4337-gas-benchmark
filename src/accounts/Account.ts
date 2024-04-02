import { type Address, type Hash } from "viem";

export abstract class Account {
	public erc20Address: Address = "0xc55d63454161a31a675886bdA490C956a27becAA";
	public recipient: Address = "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a";
	public abstract name: string;
	public client: any;

	public abstract sendERC20(): Promise<Hash>;
	public abstract sendETH(): Promise<Hash>;
	public abstract setup(): Promise<void>;
}
