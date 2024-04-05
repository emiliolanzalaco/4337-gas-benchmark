import type { Account } from "./accounts/Account";
import type { BenchmarkResult } from "./types";
import fs from "fs";
import { RegularEOA } from "./accounts/adapters/RegularEOA";
import { getGasUsed } from "./utils/gas";
import { EcdsaSafePimlico } from "./accounts/adapters/EcdsaSafePimlico";
import { mintERC20 } from "./utils/mint";
import { GelatoERC2771EOA } from "./accounts/adapters/Gelato2771EOA";
import { EcdsaKernelGelato } from "./accounts/adapters/EcdsaKernelGelato";
import { EcdsaSafeGelato } from "./accounts/adapters/EcdsaSafeGelato";

const eoa = new RegularEOA();

const accounts: Account[] = [
	eoa,
	new GelatoERC2771EOA(),
	new EcdsaKernelGelato(),
	new EcdsaSafePimlico(),
	new EcdsaSafeGelato()
];

async function setup() {
	console.log("Setting up accounts...");
	await Promise.all(
		accounts.map(async (account) => {
			if (account.setup) await account.setup();
		})
	);
	const recipients = accounts.map((account) => {
		if (account.address) {
			return account.address;
		} else {
			throw new Error("Account not setup");
		}
	});
	const values = recipients.map(() => BigInt(2e18));

	console.log("Minting ERC20...");
	await mintERC20(eoa.client, recipients, values);
}

async function main() {
	const benchmarkResult: BenchmarkResult = JSON.parse(fs.readFileSync("benchmarkResult.json", "utf-8"));
	await setup();
	await Promise.all(
		accounts.map(async (account) => {
			try {
				console.log("Account: ", account.name);
				if (account.type === "SmartAccount") {
					const firstHash = await account.sendERC20();
					const firstGasUsed = await getGasUsed(firstHash);

					const secondHash = await account.sendERC20();
					const secondGasUsed = await getGasUsed(secondHash);

					benchmarkResult[account.name] = {
						erc20TransferWithCreate: {
							hash: firstHash,
							gasUsed: firstGasUsed.toString(),
						},
						erc20Transfer: {
							hash: secondHash,
							gasUsed: secondGasUsed.toString(),
						},
					};
				} else if (account.type === "EOA") {
					const txHash = await account.sendERC20();
					const gasUsed = await getGasUsed(txHash);

					benchmarkResult[account.name] = {
						erc20Transfer: { hash: txHash, gasUsed: gasUsed.toString() },
					};
				}
			} catch (error) {
				console.log("Error in account: ", account.name);
				console.error(error);
			}
		})
	);

	fs.writeFileSync("benchmarkResult.json", JSON.stringify(benchmarkResult));
}

console.log("Starting benchmark...");
main().then(() => console.log("Benchmark completed!"));
