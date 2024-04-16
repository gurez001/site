
import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {
    constructor() {
      super();
      this.setMaxListeners(0); // Set your desired maximum limit
    }
  
    cleanup() {
      // Remove all listeners when no longer needed
      this.removeAllListeners();
    }
  }
  
  export default new MyEmitter();