/* eslint-env jasmine */

const Events = require('./events');

describe('Event Dispatcher', function() {

    let events;
    beforeEach(function() {
        events = new Events();
    });

    it('is a function', function() {
        expect(typeof Events).toBe('function');
    });

    xit('can register a callback', function() {
        events.on('foo', function() {});
    });

    xit('can register a callback with a scope', function() {
        events.on('foo', function() {}, this);
    });

    xit('can trigger an event', function() {
        const listener = jasmine.createSpy('listener');
        events.on('foo', listener);

        events.trigger('foo');

        expect(listener).toHaveBeenCalled();
    });

    xit('can trigger an event registered with scope', function(done) {
        const scope = {};

        events.on('foo', function() {
            expect(this).toBe(scope);
            done();
        }, scope);

        events.trigger('foo');
    });

    xit('can trigger an event with arguments', function() {
        const listener = jasmine.createSpy('listener');
        events.on('foo', listener);

        events.trigger('foo', 'bar', 'baz');

        expect(listener).toHaveBeenCalledWith('bar', 'baz');
    });

    xit('can trigger multiple callbacks on an event', function() {
        const listener1 = jasmine.createSpy('listener1');
        const listener2 = jasmine.createSpy('listener2');
        events.on('foo', listener1);
        events.on('foo', listener2);

        events.trigger('foo');

        expect(listener1).toHaveBeenCalled();
        expect(listener2).toHaveBeenCalled();
    });

    xit('can remove callbacks from an event', function() {
        const listener = jasmine.createSpy('listener');
        events.on('foo', listener);

        events.trigger('foo');
        expect(listener.calls.length).toBe(1);

        events.off('foo');
        events.trigger('foo');
        expect(listener.calls.length).toBe(1);
    });

    xit('can remove a specific callback from an event', function() {
        const listener1 = jasmine.createSpy('listener1');
        const listener2 = jasmine.createSpy('listener2');
        events.on('foo', listener1);
        events.on('foo', listener2);

        events.trigger('foo');
        expect(listener1.calls.length).toEqual(1);
        expect(listener2.calls.length).toEqual(1);

        events.off('foo', listener1);
        events.trigger('foo');
        expect(listener1.calls.length).toEqual(1);
        expect(listener2.calls.length).toEqual(2);
    });

    xit('can remove a specific callback registered with a scope from an event', function() {
        const listener1 = jasmine.createSpy('listener1');
        const listener2 = jasmine.createSpy('listener2');

        const scope1 = {};
        const scope2 = {};

        events.on('foo', listener1, scope1);
        events.on('foo', listener2, scope2);

        events.trigger('foo');
        expect(listener1.calls.length).toEqual(1);
        expect(listener2.calls.length).toEqual(1);

        events.off('foo', listener1);
        events.trigger('foo');
        expect(listener1.calls.length).toEqual(1);
        expect(listener2.calls.length).toEqual(2);
    });

});
