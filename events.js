class Events {
  events = new Map();

  on = (eventName, callback, scope) => {
    const { events } = this;

    if (events.has(eventName)) {
      const callbacks = events.get(eventName);
      callbacks.set(callback.toString(), [callback, scope ? scope : null]);
      events.set(eventName, callbacks);
    } else {
      const callbacks = new Map();
      callbacks.set(callback.toString(), [callback, scope ? scope : null]);
      events.set(eventName, callbacks);
    }
  };

  trigger = (eventName, ...args) => {
    const { events } = this;

    const callbacks = events.get(eventName);
    for (const callback of callbacks.values()) {
      callback[0].call(callback[1] ? callback[1] : this, args);
    }
  };

  off = (eventName, callback) => {
    const { events } = this;

    const callbacks = events.get(eventName);
    //eslint-disable-next-line no-undefined
    if (callback === undefined) {
      callbacks.clear();
      events.set(eventName, callbacks);
      return;
    }

    callbacks.delete(callback.toString());
    events.set(eventName, callbacks);
  };
}
module.exports = Events;
