var feed = "";

function parseRSS(url) {
$.get(url, function(data) {
    var $xml = $(data);
    $xml.find("item").each(function() {
        var $this = $(this),
            item = {
                title: $this.find("title").text(),
                link: $this.find("link").text(),
                description: $this.find("description").text(),
                pubDate: $this.find("pubDate").text(),
                author: $this.find("author").text()
        }
        dumpRSS(item);
    });
});
}

function dumpRSS(data){
	$(".result").append(data);
	console.log("dumped");
}