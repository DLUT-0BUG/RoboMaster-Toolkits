chrome.contextMenus.create({
    id: "getDB",
    title: "获取题库"
}, () => { });

chrome.contextMenus.create({
    title: "规则测评题库",
    parentId: "getDB",
    type: "checkbox",
    onclick: function (info) {
        ;
    }
}, () => { });


chrome.contextMenus.create({
    title: "裁判系统题库",
    parentId: "getDB",
    type: "checkbox",
    onclick: function (info) {
        window.localStorage.clear();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://raw.githubusercontent.com/Bye-lemon/Static/main/export.json", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    jsonString = JSON.parse(unescape(xhr.responseText));
                    console.log(jsonString);
                    for (var i = 0; i < jsonString.length; i++) {
                        question = jsonString[i].question;
                        answer = jsonString[i].answer;
                        window.localStorage.setItem(question, answer);
                    }
                }
            }
        }
        xhr.send();
    }
}, () => { });


chrome.contextMenus.create({
    title: "搜索答案",
    type: "normal",
    onclick: function (info, tabs) {
        chrome.tabs.sendMessage(tabs.id, { "action": "searchAnswer" }, function (response) {
            console.log(response.infos);
            for (var i = 0; i < response.infos.length; i++) {
                question = response.infos[i].question;
                var res = window.localStorage.getItem(question);
                if (res !== null) {
                    chrome.tabs.sendMessage(tabs.id, {
                        "action": "choose",
                        "no": i,
                        "answer": res
                    })
                } else {
                    chrome.tabs.sendMessage(tabs.id, {
                        "action": "mark",
                        "no": i
                    })
                }
            }
        })
    }
}, () => { });


chrome.contextMenus.create({
    title: "保存答案",
    type: "normal",
    onclick: function (info, tabs) {
        chrome.tabs.sendMessage(tabs.id, { "action": "saveAnswer" }, function (response) {
            console.log(response.infos);
            var result = JSON.stringify(response.infos);
            var url = "data:application/json;," + escape(result);
            chrome.downloads.download({
                url: url,
                filename: "export.json"
            })
            for (var i = 0; i < response.infos.length; i++) {
                question = response.infos[i].question;
                answer = response.infos[i].answer;
                window.localStorage.setItem(question, answer);
            }
        })
    }
}, () => { });