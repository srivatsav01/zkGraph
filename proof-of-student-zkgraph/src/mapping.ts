//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event, BigInt } from "@hyperoracle/zkgraph-lib";
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; 


const AttesterAddress = '0x761a6997F55D31069B0E47a88bBEfb1505Bb7E0f'
const ReipientAddress = "0x761a6997F55D31069B0E47a88bBEfb1505Bb7E0f"
let addr = Bytes.fromHexString('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
let esig_sync = Bytes.fromHexString("0x8bf46bf4cfd674fa735a3d63ec1c9ad4153f033c290341f3a588b75685141b35");

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;

 
  let eventsByAcct: Event[] = blocks[0].account(addr).events;

  
  let eventsByAcctEsig: Event[] = blocks[0].account(addr).eventsByEsig(esig_sync)

  require(eventsByAcctEsig.length > 0)

  let onchainAttester: BigInt = BigInt.fromBytes(events[0].topic1);
  let onChainRecipient: BigInt = BigInt.fromBytes(events[0].topic2);


  //check if the onChainAttester is same as the actual attester 

  require(Bytes.fromHexString(onchainAttester.toHexString()) == Bytes.fromHexString(AttesterAddress)) ;



  // check if the recipeient we need is there. 

  require(Bytes.fromHexString(onChainRecipient.toHexString()) == Bytes.fromHexString(ReipientAddress)) ;
  return Bytes.fromHexString(onChainRecipient.toHexString())
}
