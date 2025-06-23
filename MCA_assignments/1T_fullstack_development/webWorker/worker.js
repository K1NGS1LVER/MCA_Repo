let counts = 0;

onmessage = function(e) {
    if (e.data == "start") {
        count();
    }
}

function count() {
    counts++;
    postMessage(counts);
}
