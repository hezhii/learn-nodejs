'use strict';

const EventEmitter = require('events');
const child_process = require('child_process');
const path = require('path');

const AGENT_WORKER_FILE = path.join(__dirname, 'worker.js');

class Master extends EventEmitter {

  /**
   * @constructor
   * @param {Object} options
   *  - {Number} [workers] - 应用进程数目，默认为 CPU 核数
   *  - {Number} [port] - 应用监听的端口号，默认为 8080
   */
  constructor(options) {
    super();

    this.options = options;
    this.isProduction = isProduction();
    this.agentWorkerIndex = 0;
    this.agentWorker = null;
    this.closed = false;

    this.isStarted = false;
    console.log('[master] Process start');
    console.log('[master] start with env: isProduction: %s,  NODE_ENV: %s',
      this.isProduction, process.env.NODE_ENV);

    this.on('agent-exit', this.onAgentExit.bind(this));
    this.on('agent-start', this.onAgentStart.bind(this));

    this.forkAgentWorker();
    this.isStarted = true;
  }

  onAgentStart() {
    console.info('[master] agent_worker#%s:%s started (%sms)',
      this.agentWorker.id, this.agentWorker.pid, Date.now() - this.agentStartTime);
  }

  /**
   * Agent Worker exit handler
   * Will exit during startup, and refork during running.
   * @param {Object} data
   *  - {Number} code - exit code
   *  - {String} signal - received signal
   */
  onAgentExit(data) {
    if (this.closed) return;

    const agentWorker = this.agentWorker;
    this.agentWoekr = null;

    const err = new Error(`[master] agent_worker#${agentWorker.id}:${agentWorker.pid} died code: ${data.code}, signal: ${data.signal}`);
    err.name = 'AgentWorkerDiedError';
    console.error(err);

    if (this.isStarted) {
      console.log('[master] try to start a new agent_worker after 1s ...');
      setTimeout(() => {
        console.info('[master] new agent_worker starting...');
        this.forkAgentWorker();
      }, 1000);
    } else {
      console.error('[master] agent_worker#%s:%s start fail, exiting with code:1',
        agentWorker.id, agentWorker.pid);
      process.exit(1);
    }
  }

  forkAgentWorker() {
    this.agentStartTime = Date.now();

    const agentWorker = this.agentWorker = child_process.fork(AGENT_WORKER_FILE);
    agentWorker.id = ++this.agentWorkerIndex;
    console.log('[master] Agent worker#%s:%s start with clusterPort:%s',
      agentWorker.id, agentWorker.pid, this.options.port);

    // 所有的消息都交给 Master 进程处理
    agentWorker.on('message', msg => {
      if (typeof msg === 'string') msg = {
        action: msg,
        data: msg
      };
      this.emit(msg.action, msg.data);
    });

    agentWorker.on('error', err => {
      err.name = 'AgentWorkerError';
      err.id = agentWorker.id;
      err.pid = agentWorker.pid;
      console.error(error);
    });

    agentWorker.once('exit', (code, signal) => {
      this.emit('agent-exit', {
        code,
        signal
      });
    });
  }
}

module.exports = Master;

function isProduction() {
  return process.env.NODE_ENV === 'production';
}
