import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { pimlicoTransport } from "./bundlers";

export const pimlicoPaymasterClient = createPimlicoPaymasterClient({
  entryPoint: ENTRYPOINT_ADDRESS_V07,
  transport: pimlicoTransport,
})