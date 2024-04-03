import type { Hash } from "viem";

export type TxResult = {
	hash: Hash;
	gasUsed: string; // have to parse to string as JSON.stringify can't handle bigint
};

export type BenchmarkResult = Record<
	string,
	{ erc20: TxResult }
>;
