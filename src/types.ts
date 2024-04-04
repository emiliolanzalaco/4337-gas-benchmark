import type { Hash } from "viem";

export type TxResult = {
	hash: Hash;
	gasUsed: string; // have to parse to string as JSON.stringify can't handle bigint
};

export type EOAResult = {
	erc20Transfer: TxResult;
}

export type SmartAccountResult = {
	erc20TransferWithCreate: TxResult;
	erc20Transfer: TxResult;
}

export type AccountResult = EOAResult | SmartAccountResult;

export type BenchmarkResult = Record<
	string,
	AccountResult
>;
