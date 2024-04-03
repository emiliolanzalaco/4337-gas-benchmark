import type { Account } from "./accounts/Account";
import type { BenchmarkResult } from "./types";
import { waitForTransactionReceipt } from "viem/actions";
import fs from "fs";
import { GelatoERC2771EOA } from "./accounts/adapters/Gelato2771EOA";
import { EOA } from "./accounts/adapters/EOA";
import { publicClient } from "./clients/rpc";
import { EcdsaKernelGelato } from "./accounts/adapters/EcdsaKernelGelato";

const accounts: Account[] = [
	// new EOA(),
	// new GelatoERC2771EOA(),
	new EcdsaKernelGelato(),
];

async function main() {
	const benchmarkResult: BenchmarkResult = {};

	await Promise.all(
		accounts.map(async (account) => {
			console.log("Account: ", account.name);
			if (account.setup) await account.setup();
			const txHash = await account.sendERC20();
			const receipt = await waitForTransactionReceipt(publicClient, {
				hash: txHash,
			});
			const gasUsed = receipt.gasUsed;

			benchmarkResult[account.name] = {
				erc20: { hash: txHash, gasUsed: gasUsed.toString() },
			};
		})
	);

	fs.writeFileSync("benchmarkResult.json", JSON.stringify(benchmarkResult));
}

console.log("Starting benchmark...");
main().then(() => console.log("Benchmark completed!"));
