import type {
  API,
  FinalizedEvent,
  IncomingEvent,
  NewBlockEvent,
  NewTransactionEvent,
  OutputAPI,
  Settled,
} from "../types"

export default function yourGhHandle(api: API, outputApi: OutputAPI) {
  return (event: IncomingEvent) => {

    // Requirements:
    //
    // 1) When a transaction becomes "settled"-which always occurs upon receiving a "newBlock" event-
    //    you must call `outputApi.onTxSettled`.
    //
    //    - Multiple transactions may settle in the same block, so `onTxSettled` could be called
    //      multiple times per "newBlock" event.
    //    - Ensure callbacks are invoked in the same order as the transactions originally arrived.
    //
    // 2) When a transaction becomes "done"-meaning the block it was settled in gets finalized-
    //    you must call `outputApi.onTxDone`.
    //
    //    - Multiple transactions may complete upon a single "finalized" event.
    //    - As above, maintain the original arrival order when invoking `onTxDone`.
    //    - Keep in mind that the "finalized" event is not emitted for all finalized blocks.
    //
    // Notes:
    // - It is **not** ok to make redundant calls to either `onTxSettled` or `onTxDone`.
    // - It is ok to make redundant calls to `getBody`, `isTxValid` and `isTxSuccessful`
    //
    // Bonus 1:
    // - Avoid making redundant calls to `getBody`, `isTxValid` and `isTxSuccessful`.
    //
    // Bonus 2:
    // - Upon receiving a "finalized" event, call `api.unpin` to unpin blocks that are either:
    //     a) pruned, or
    //     b) older than the currently finalized block.
  
    const onNewBlock = (outputApi: OutputAPI) => ({ blockHash, parent }: NewBlockEvent) => {
   
      type NewBlockEvent = {
        blockHash: string;
        parent: string;
      };
      
      type Settled = "success" | "failure";
      
      type OutputAPI = {
        onTxSettled: (transaction: string, state: Settled) => void;
      };

    return (outputApi: OutputAPI) => 
        //console.log(`New block detected: ${blockHash}, Parent: ${parent}`);
        
        outputApi.onTxSettled;

 
    ////trial 4/////
      // blockHash: string;
      // parent: string;
      // transaction: string;
      // state: Settled;
    


    ///////////////////////////

    const onNewTx = ({ value: transaction }: NewTransactionEvent) => {
      // TODO:: implement it
    }

    const onFinalized = ({ blockHash }: FinalizedEvent) => {
      // TODO:: implement it
    }

    return (event: IncomingEvent) => {
      switch (event.type) {
        case "newBlock": {
          onNewBlock(event)
          break
        }
        case "newTransaction": {
          onNewTx(event)
          break
        }
        case "finalized":
          onFinalized(event)
      }
   }
  }
}