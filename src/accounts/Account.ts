import { type Address, type Hash } from "viem";
import { ERC20_ADDRESS, RECIPIENT_ADDRESS } from "../config";

export enum AccountType { 
	EOA = "EOA",
	SmartAccount = "SmartAccount"
}
export abstract class Account {
	public erc20Address: Address = ERC20_ADDRESS;
	public recipient: Address = RECIPIENT_ADDRESS;
	public abstract name: string;
	public abstract type: AccountType;

	public abstract sendERC20(): Promise<Hash>;
	public setup?(): Promise<void>;
}

export abstract class EOA extends Account {
	public type = AccountType.EOA;
}

export abstract class SmartAccount extends Account {
	public type = AccountType.SmartAccount;
}