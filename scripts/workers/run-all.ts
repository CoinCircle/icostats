import * as winston from 'winston';
import * as mongoose from 'mongoose';
import { refreshLatestPrices, refreshRecentPrices } from './cache-worker';
import runPriceWorker from './price-worker';
import runGraphWorker from './graph-worker';


(mongoose as any).Promise = Promise;
/* =============================================================================
=    Init
============================================================================= */
export default function initAllWokers(): Promise<any> {
  return workerRecurser(1);
}

function workerRecurser(id): Promise<any> {
  switch (id) {
    case 1: return refreshLatestPrices().then(() => workerRecurser(2));
    case 2: return refreshRecentPrices().then(() => workerRecurser(3));
    case 3: return runPriceWorker().then(() => workerRecurser(4));
    case 4: return runGraphWorker().then(() => workerRecurser(5));
    default: return workerRecurser(1);
  }
}
