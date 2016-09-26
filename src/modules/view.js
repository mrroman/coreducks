function View(type) {
    this.type = type;
}

function El(name) {
    View.call(this, 'element');
    this.name = name;
    this.props = {};
    this.listeners = {};
    this.body = [];
}

El.prototype = {
    prop(name, value) {
        if (this.props[name]) {
            console.warn(`Property ${name} has been duplicated.`);
        }
        this.props[name] = value;
        return this;
    },
    propIf(condition, name, value) {
        if (condition) {
            this.prop(name, value);
        }
        return this;
    },
    on(event, listener) {
        if (this.listeners[event]) {
            console.warn(`Listener on event ${event} has been duplicated.`);
        }
        this.listeners[event] = listener;
        return this;
    },
    focus() {
        this.focused = true;
        return this;
    },
    has(...views) {
        Array.prototype.push.apply(this.body, views);
        return this;
    },
    hasIf(condition, ...views) {
        if (condition) {
            this.has(...views);
        }
        return this;
    }
};

function Text(s) {
    View.call(this, 'text');
    this.text = s;
}

function Input(type) {
    El.call(this, 'input');
    this.type = 'input';
    this.props.type = type;
}

Input.prototype = Object.create(El.prototype);

const Views = {
    el(name, txt) {
        if (typeof txt === 'string') {
            return new El(name).has(new Text(txt));
        } else {
            return new El(name);
        }
    },
    text(s) {
        return new Text(s);
    },
    input(type) {
        return new Input(type);
    }
};
