window.ipcRenderer = {
  hello: (...args) => console.log('ipcRenderer', args)
};

window.ipc.ready({ dataFromRenderer: true });
