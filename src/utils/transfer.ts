import { encodeFunctionData, type Address, type Hash } from "viem";
import { abi } from "../abi/HowMuchGas";

export function getTransferData(recipient: Address, value: bigint): Hash {
  return encodeFunctionData({functionName: "transfer", abi: abi, args: [recipient, value]});
}