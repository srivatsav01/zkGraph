//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event, BigInt } from "@hyperoracle/zkgraph-lib";
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; 



let addr = Bytes.fromHexString('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
let esig_sync = Bytes.fromHexString("0x8bf46bf4cfd674fa735a3d63ec1c9ad4153f033c290341f3a588b75685141b35");

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;

 
  let eventsByAcct: Event[] = blocks[0].account(addr).events;

  
  let eventsByAcctEsig: Event[] = blocks[0].account(addr).eventsByEsig(esig_sync)

  require(eventsByAcctEsig.length > 0)

  let UID: BigInt = BigInt.fromBytes(events[0].data);


  return Bytes.fromHexString(UID.toHexString())
}
