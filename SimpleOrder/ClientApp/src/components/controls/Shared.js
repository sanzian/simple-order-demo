export function setName(obj, alt = "") {
    obj.name = obj.props.name;
    if (obj.name == undefined && (alt || "").trim() !== "") {
        let temp = alt.split(' ');
        for (let i = 0; i < temp.length; i++) {
            temp[i] = (temp[i] || '').toLowerCase();
            if (i > 0) {
                temp[i] = temp[i].substr(0, 1).toUpperCase() + temp[i].substr(1);
            }
        }
        obj.name = temp.join('');
    }
}

export function formatCurrency(value) {
    return Number(value.toString()).toFixed(2);
}

export function browserNotSupported() {
    if (/Trident\/[0-9]+\.[0-9]+/g.test((window.clientInformation || {}).userAgent || "")) {
        window.location.href = "/not-supported.html";
    }
}
