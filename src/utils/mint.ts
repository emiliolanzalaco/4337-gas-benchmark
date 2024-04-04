import { encodeFunctionData, type Address } from "viem";
import { RegularEOA } from "../accounts/adapters/RegularEOA";
import { abi } from "../abi/HowMuchGas";

const eoa = new RegularEOA()

export async function mintERC20 (recipient: Address, value: bigint) {
  await eoa.client.sendTransaction({
    to: eoa.erc20Address,
    data: encodeFunctionData({functionName: "mint", abi: abi, args: [recipient, value]})
  });
}