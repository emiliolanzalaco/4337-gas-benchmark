import { encodeFunctionData, type Address, type WalletClient } from "viem";
import { getTransactionCount, waitForTransactionReceipt } from "viem/actions";
import { ERC20_ADDRESS } from "../config";
import { abi } from "../abi/HowMuchGas";

export async function mintERC20(
	client: WalletClient,
	recipients: Address[],
	values: bigint[]
) {
	if (recipients.length !== values.length) {
		throw new Error("recipients and values must have the same length");
	}
	let nonce = await getTransactionCount(client, {
		address: client.account?.address!,
	});
  // recipients.map(async (recipient, index) => {
  //   await client.sendTransaction({
  //     to: ERC20_ADDRESS,
  //     data: encodeFunctionData({
  //       functionName: "mint",
  //       abi: abi,
  //       args: [recipient, values[index]],
  //     }),
  //     account: client.account!,
  //     chain: client.chain
  //   })
  // })

	await Promise.all(
		recipients.map(async (recipient, index) => {
			const hash = await client.sendTransaction({
				to: ERC20_ADDRESS,
				data: encodeFunctionData({
					functionName: "mint",
					abi: abi,
					args: [recipient, values[index]],
				}),
				account: client.account!,
				chain: client.chain,
				nonce: nonce++,
			})
      await waitForTransactionReceipt(client, {hash: hash})
    }
		)
	);
    }
