/* eslint-disable prefer-arrow-callback */

import Events from './events';

import sinon from 'sinon';

describe('Event Dispatcher', () => {
  let events;
  beforeEach(() => {
    events = new Events();
  });

  it('is a function', () => {
    expect(typeof Events).toBe('function');
  });

  it('can register a callback', () => {
    events.on('foo', () => {});
  });

  it('can register a callback with a scope', () => {
    events.on('foo', () => {}, this);
  });

  it('can trigger an event', () => {
    const listener = sinon.spy();
    events.on('foo', listener);

    events.trigger('foo');
    expect(listener.called).toEqual(true);
  });

  it('can trigger an event registered with scope', done => {
    const scope = {};

    events.on(
      'foo',
      function() {
        expect(this).toBe(scope);
        done();
      },
      scope,
    );

    events.trigger('foo');
  });

  it('can trigger an event with arguments', () => {
    const listener = sinon.spy();
    events.on('foo', listener);

    events.trigger('foo', 'bar', 'baz');
    expect(listener.calledWith(['bar', 'baz'])).toEqual(true);
  });

  it('can trigger multiple callbacks on an event', () => {
    const listenerOne = sinon.spy(function firstCallBack() {});
    const listenerTwo = sinon.spy(function secondCallback() {});

    events.on('foo', listenerOne);
    events.on('foo', listenerTwo);

    events.trigger('foo');

    expect(listenerOne.called).toEqual(true);
    expect(listenerTwo.called).toEqual(true);
  });

  it('can remove callbacks from an event', () => {
    const listener = sinon.spy();
    events.on('foo', listener);

    events.trigger('foo');
    expect(listener.callCount).toEqual(1);

    events.off('foo');
    events.trigger('foo');
    expect(listener.callCount).toEqual(1);
  });

  it('can remove a specific callback from an event', () => {
    const listenerOne = sinon.spy(function firstCallBack() {});
    const listenerTwo = sinon.spy(function secondCallback() {});

    events.on('foo', listenerOne);
    events.on('foo', listenerTwo);

    events.trigger('foo');
    expect(listenerOne.callCount).toEqual(1);
    expect(listenerTwo.callCount).toEqual(1);

    events.off('foo', listenerOne);
    events.trigger('foo');
    expect(listenerOne.callCount).toEqual(1);
    expect(listenerTwo.callCount).toEqual(2);
  });

  it('can remove a specific callback registered with a scope from an event', () => {
    const listenerOne = sinon.spy(function firstCallBack() {});
    const listenerTwo = sinon.spy(function secondCallback() {});

    const scope1 = {};
    const scope2 = {};

    events.on('foo', listenerOne, scope1);
    events.on('foo', listenerTwo, scope2);

    events.trigger('foo');
    expect(listenerOne.callCount).toEqual(1);
    expect(listenerTwo.callCount).toEqual(1);

    events.off('foo', listenerOne);
    events.trigger('foo');
    expect(listenerOne.callCount).toEqual(1);
    expect(listenerTwo.callCount).toEqual(2);
  });
});
