
var notifications = [];
var lastWidget = 0;
var cellQueue = [];
var newsQueue = [];
var newsNum = 0;
function clearEarliestCell() {
    "use strict";
    var gridID = "#grid" + cellQueue.shift();
    $(gridID).fadeOut(2000);
}


function clearLoop() {
    "use strict";
    setInterval(function () {clearEarliestCell(); }, 5000);
}

function getGridNumber() {
    "use strict";
    var n =  Math.floor(Math.random() * 8) + 1;
    //cellQueue.i;
    return n;

}

function emptyCell(gridID) {
    "use strict";
    $(gridID).empty();
}

function addWidget(title, body, time, link) {
    "use strict";

    //pick area on grid to add widget
    var num = getGridNumber(),
        gridID = "#grid" + num,
        blue = randomColor({hue: 'blue', luminosity: 'light'});

    emptyCell(gridID);
    console.log(num);
    cellQueue.push(num);
    console.log(cellQueue);
    $(gridID).hide();


    $(gridID).append("<h2>" + title + "</h2>");

    $(gridID).css({"background": blue});
    $(gridID).append("<small>" + time + "</small>");
    $(gridID).append("<p>" + body + "</p>");

    $(gridID).fadeIn(2000);

}




function emptyGrid() {
    "use strict";
    var i;
    for (i = 1; i < 10; i += 1) {
        $("#grid" + i).fadeOut(1000, emptyCell("#grid" + i));
    }
}



function sourcesSetUp() {
    "use strict";
    var rss = ["http://feeds.bbci.co.uk/news/rss.xml", "http://www.theguardian.com/world/rss", "http://mf.feeds.reuters.com/reuters/UKTopNews"];
    console.log("startload");
    google.load("feeds", "1");

        var i;
        for (i = 0; i < 3; i += 1) {
            console.log(i);
            var feed = new google.feeds.Feed(rss[i]);
            feed.setNumEntries(10);

        // feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

            feed.load(function (result) {
                if (!result.error) {
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        var widget = new Object();
                        var entry = result.feed.entries[i];
                        widget.title = entry.title;
                        console.log(entry.title);
                        console.log("tesy");
                        widget.body = entry.contentSnippet;
                        widget.time = entry.publishedDate;
                        widget.link = entry.link;
                        newsQueue.push(widget);
                    }
                } else{
                    console.log("Feed Error");
                }

        //IMAGE CODE item.getElementsByTagName("thumbnail")[0].getAttribute('url')
            });
        }
    /*newsQueue.sort(function (a, b) {
        "use strict";
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.time) - new Date(a.tune);
    });*/
}




function test() {
    "use strict";
    var nextWidget = newsQueue[newsNum];
    console.log(nextWidget);
    addWidget(nextWidget.title, nextWidget.body, nextWidget.time, nextWidget.link);
    lastWidget += 1;
    if (newsNum < (newsQueue.length - 1)) {
        newsNum += 1;
    } else {
        newsNum = 0;
        //reload RSS
    }
    console.log(newsNum);
    console.log(newsQueue);
}

function app() {
    "use strict";
    console.log("startload");
    sourcesSetUp();
    console.log(newsQueue);
    //set up feeds etc
    console.log(newsQueue);
    //adds widgets
    //test();
    setInterval(function () {test(); }, 5000);
    setTimeout(function () {clearLoop(); }, 5000);
    //wait a certain amount of time between adding widgets from sources
}
