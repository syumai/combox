import { comlinkCode } from "./lib/comlink@4.4.1.min";
import { Remote, releaseProxy, wrap } from "comlink";

const workerCode = `
${comlinkCode};
Comlink.expose({
  evaluate(code) {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    return (new AsyncFunction('"use strict"; return (' + code + ');'))();
  },
});
delete globalThis.Comlink;
`;
const workerBlob = new Blob([workerCode], { type: "text/javascript" });
const workerUrl = URL.createObjectURL(workerBlob);

type ComboxWorker = {
  evaluate: (code: string) => Promise<any>;
};

export class Combox {
  #worker: Worker;
  #comboxWorker: Remote<ComboxWorker>;
  constructor() {
    this.#worker = new Worker(workerUrl);
    this.#comboxWorker = wrap<ComboxWorker>(this.#worker);
  }
  async evaluate(code: string): Promise<any> {
    return this.#comboxWorker.evaluate(code);
  }
  release() {
    this.#comboxWorker[releaseProxy]();
    this.#worker.terminate();
  }
}
