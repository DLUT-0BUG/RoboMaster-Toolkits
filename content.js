chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "saveAnswer") {
        var nodes = document.querySelectorAll("div.form-group");
        var infos = [];
        for (var i = 0; i < nodes.length; i++) {
            questionString = nodes[i].children[0].innerHTML;
            question = questionString.slice(questionString.indexOf("."));
            for (var j = 1; j < nodes[i].children.length; j++) {
                if (nodes[i].children[j].children[1].checked) {
                    infos.push({
                        "question": question,
                        "answer": nodes[i].children[j].children[2].innerHTML
                    })
                }
            }
        }
        sendResponse({
            infos: infos
        })
    }
})


chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "searchAnswer") {
        var nodes = document.querySelectorAll("div.form-group");
        var infos = [];
        for (var i = 0; i < nodes.length; i++) {
            questionString = nodes[i].children[0].innerHTML
            question = questionString.slice(questionString.indexOf("."));
                    infos.push({
                        "question": question,
                    })
                }
        sendResponse({
            infos: infos
        })
    }
})


chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "choose") {
        var nodes = document.querySelectorAll("div.form-group");
        var node = nodes[request.no];
        for (var j = 1; j <node.children.length; j++) {
            if (node.children[j].children[2].innerHTML === request.answer) {
                node.children[j].children[1].checked = true;
            }
        }
    }
})


chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "mark") {
        var nodes = document.querySelectorAll("div.form-group");
        var node = nodes[request.no];
        node.style.color = "red";
    }
})