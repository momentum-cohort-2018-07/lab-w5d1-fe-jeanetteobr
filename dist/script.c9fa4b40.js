// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"script.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// grabs canvas element from DOM
var canvas = getID('game');
// gets the drawing context
var screen = canvas.getContext('2d');
// notes the dimension of the game screen
var gameSize = { x: canvas.width, y: canvas.height
  // notes the colors for all elements in the game
};var colors = {
  player: '#EAF2E3',
  obstacles: '#857E7B',
  screen: '#DB7F67',
  coin: '#D6BA73',
  wall: '#59344F'

  // creates and instance of the game
};
var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.player = new Player();
    this.coin = new Coin();
    this.tick();
  }

  _createClass(Game, [{
    key: 'tick',
    value: function tick() {
      var _this = this;

      this.update();
      this.draw();
      window.requestAnimationFrame(function () {
        return _this.tick();
      });
    }
    // draws the game

  }, {
    key: 'draw',
    value: function draw() {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      this.Wall();
      this.player.draw();
      this.coin.draw();
    }
    // updates the game state

  }, {
    key: 'update',
    value: function update() {
      this.coin.update();
      this.player.update();
    }
  }, {
    key: 'Wall',
    value: function Wall() {
      screen.fillStyle = colors.screen;
      screen.fillRect(0, 0, gameSize.x, gameSize.y);
      screen.strokeRect(150, 150, 200, 200);
    }
  }]);

  return Game;
}();

// creates the player sprite and dictates how it acts


var Player = function () {
  function Player(game) {
    _classCallCheck(this, Player);

    this.size = {
      x: 30,
      y: 30
    };
    this.center = {
      x: gameSize.x / 2 - 15,
      y: gameSize.y / 2 - 15
    };
    this.keyboarder = new Keyboarder();
    this.game = game;
  }

  _createClass(Player, [{
    key: 'draw',
    value: function draw() {
      screen.fillStyle = colors.player;
      screen.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
        this.center.x -= 2;
        if (this.center.x <= 152) this.center.x = 152;
      }
      if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
        this.center.x += 2;
        if (this.center.x >= 318) this.center.x = 318;
      }
      if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN)) {
        this.center.y += 2;
        if (this.center.y >= 318) this.center.y = 318;
      }
      if (this.keyboarder.isDown(Keyboarder.KEYS.UP)) {
        this.center.y -= 2;
        if (this.center.y <= 152) this.center.y = 152;
      }
    }
  }]);

  return Player;
}();

var Coin = function () {
  function Coin(game) {
    _classCallCheck(this, Coin);

    this.game = game;
    this.size = {
      x: 25,
      y: 25
    };
  }

  _createClass(Coin, [{
    key: 'draw',
    value: function draw() {
      screen.fillStyle = colors.coin;
      screen.fillRect(200, 200, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return Coin;
}();

// function to grab element from DOM


function getID(id) {
  return document.getElementById(id);
}

var Keyboarder = function () {
  function Keyboarder() {
    _classCallCheck(this, Keyboarder);

    this.keyState = {};

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true;
    }.bind(this));

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false;
    }.bind(this));
  }

  _createClass(Keyboarder, [{
    key: 'isDown',
    value: function isDown(keyCode) {
      return this.keyState[keyCode] === true;
    }
  }, {
    key: 'on',
    value: function on(keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback();
        }
      });
    }
  }]);

  return Keyboarder;
}();

Keyboarder.KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  S: 83

  // instatiates the Game class
};new Game();
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55135' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.c9fa4b40.map