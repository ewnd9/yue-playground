'use strict';

const gui = require('gui');

const win = gui.Window.create({});
win.setContentSize({ width: 400, height: 400 });
win.onClose = () => gui.MessageLoop.quit();

const contentView = gui.Container.create();
contentView.setStyle({ flexDirection: 'row' });
win.setContentView(contentView);

const browser = gui.Browser.create({ devtools: true, contextMenu: true });
browser.setStyle({ flex: 1 });
contentView.addChildView(browser);

browser.setBindingName('ipc');
browser.addBinding('ready', (...args) => {
  console.log('ready', args);
  browser.executeJavaScript(
    `
      window.ipcRenderer.hello(${JSON.stringify(args)});
    `,
    (...args) => {
      console.log('callback', args);
    }
  )
});

// browser.loadURL('https://github.com/yue/yue')
browser.loadHTML(
  `
  <body>
    <script src="${__dirname}/page.js"></script>
    <div>hello world</div>
  </body>
  `,
  `file://${__dirname}`
);

win.center();
win.activate();

if (!process.versions.yode) {
  gui.MessageLoop.run();
  process.exit(0);
}
