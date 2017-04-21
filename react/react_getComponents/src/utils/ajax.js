const serializeData = (data) => {
    var buffer = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) {
            continue;
        }
        var value = data[name];
        buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null)
            ? ""
            : value));
    }
    var source = buffer.join("&").replace(/%20/g, "+");
    return (source);
}

const get = (url) => {
    return new Promise(function(resolve, reject){
        let ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function(res) {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve(JSON.parse(ajax.responseText));
            }
        }
        ajax.send();
    })
}


const post = (url,data) => {
    let composeData = serializeData(data);
    return new Promise(function(resolve, reject){
        let ajax = new XMLHttpRequest();
        ajax.open("POST", url, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve(ajax.responseText);
            }
        }
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(composeData);
    })

}

export {get, post}
