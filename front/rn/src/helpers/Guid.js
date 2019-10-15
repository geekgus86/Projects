function gen(count) {
    var out = "";
    for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return out;
}

export function guid() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
};