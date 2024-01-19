//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, BigInt, Event } from "@hyperoracle/zkgraph-lib";

let addr = Bytes.fromHexString('0x3D945FD9Af112b5427BbEC64cF4b2C3811C57D83');
let esig_sync = Bytes.fromHexString("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef");

const kycedAddress = "0x36d630c4775c58c9634406e824dfb73a20f5b9a5"

export function handleBlocks(blocks: Block[]): Bytes {
  let state: Bytes;

  let events: Event[] = blocks[0].events;

 
  let eventsByAcct: Event[] = blocks[0].account(addr).events;

  let eventsByAcctEsig: Event[] = blocks[0].account(addr).eventsByEsig(esig_sync)


  require(eventsByAcctEsig.length > 0)


  let onChainKYCedAddress: BigInt = BigInt.fromBytes(events[0].topic2);

// check if the onchain kyced address is equal to the Kyched address we want 
  require(Bytes.fromHexString(onChainKYCedAddress.toHexString()) == Bytes.fromHexString(kycedAddress)) ;
  return Bytes.fromHexString(onChainKYCedAddress.toHexString())
}
