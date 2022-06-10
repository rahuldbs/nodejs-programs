function pubSub() {
    const subscribers = new Map();

    function publish(event, ...data) {
        if (!subscribers.has(event)) {
            return;
        }

        subscribers.get(event).forEach(callback => {
            callback(...data);
        });
    }

    function subscribe(event, callback) {
        if (!subscribers.has(event)) {
            subscribers.set(event, []);
        }
        const index = subscribers.get(event).push(callback) - 1;

        return {
            unsubscribe() {
                subscribers.get(event).splice(index, 1);
            }
        };
    }

    return {
        publish,
        subscribe
    };
}

const ps = pubSub();

const { unsubscribe } = ps.subscribe("test", (...args) => {
    console.log(`"test" event published with arguments: `, ...args);
});
ps.subscribe("test", (...args) => {
    console.log(`"test" event with arguments: `, ...args);
});
ps.publish("test", "abc", "xyz");
unsubscribe();
ps.publish("test", 10, 20, 30);

ps.subscribe("sum", (...args) => {
    console.log(`"sum" event published with arguments: `, ...args);
});
ps.publish("sum", 11, 22, 33);


// Second approach
function PubSub() {
    this.map = new Map();
}

PubSub.prototype.publish = function (event) {
    const cbs = this.map.get(event) || [];
    cbs.forEach(cb => {
        if (cb) {
            cb();
        }
    });
}

PubSub.prototype.subscribe = function (event, cb) {
    if (!this.map.has(event)) {
        this.map.set(event, []);
    }
    const index = this.map.get(event).push(cb) - 1;
    const cbRef = this.map.get(event)[index]
    return () => {
        // console.log("map--", this.map.get(event));
        if (this.map.has(event)) {
            const idx = this.map.get(event).findIndex(ele => ele === cbRef);
            this.map.get(event).splice(idx, 1);
        }
        // console.log("after unsubscribe map--", this.map.get(event));
    }
}

let myPubSub = new PubSub();

let callback1 = function () {
    console.log('Callback 1 executed');
}

let callback2 = function () {
    console.log('Callback 2 executed');
}


let callback3 = function () {
    console.log('Callback 3 executed');
}


const sub1Off = myPubSub.subscribe('add', callback1);
const sub2Off = myPubSub.subscribe('add', callback2);
const sub3Off = myPubSub.subscribe('add', callback3);
const sub4Off = myPubSub.subscribe('mul', callback3);
const sub5Off = myPubSub.subscribe('mul', callback3);

myPubSub.publish('mul'); // Prints 7, 11 and 16
sub1Off();
sub2Off();
sub3Off();
myPubSub.publish('add'); // Print 11 and 16

let myPubSub1 = new PubSub();
const subAdd1 = myPubSub1.subscribe('add', callback1);
const subAdd2 = myPubSub1.subscribe('add', callback2);
myPubSub1.publish("add");

