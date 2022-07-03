var main = function (toDoObjects) {
    "use strict";

/*    var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});
*/
    $(".tabs div").toArray().forEach(function (element) {
        $(element).on("click", function () {

            var $element=$(element),
                $content,$taglist;

            $(".tabs div").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ol>");
                toDoObjects.forEach(function (todo) {
                    $taglist = $("<ul>");
                    todo.tags.forEach(function (tag) {
                        $taglist.append($("<li>").text(tag));
                    });
                    $content.prepend($taglist);
                    $content.prepend($("<li>").text(todo.description));
                });
                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();
            }

            else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ol>");
                toDoObjects.forEach(function (todo) {
                    $taglist = $("<ul>");
                    $content.append($("<li>").text(todo.description));
                    todo.tags.forEach(function (tag) {
                        $taglist.append($("<li>").text(tag));
                    });
                    $content.append($taglist);
                });
                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();
            }

			else if ($element.parent().is(":nth-child(3)")) {
				var organizedByTag = tagOrg(toDoObjects);

				organizedByTag.forEach(function (tag) {
					var $tagName=$("<h3>").text(tag.name),
						$content=$("<ul>");

					tag.todos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			}

            else if ($element.parent().is(":nth-child(4)")) {
                var ntodo,ntags;
                $content=$("<div>");

				$content.append($("<p>").text("Description"));
                $content.append($("<input>").attr({"type":"text","id":"newtodo"}));

				$content.append($("<p>").text("Tags"));
				$content.append($("<input>").attr({"type":"text","id":"newtag"}));
                $content.append($("<button>").text("+"));

                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();

                $("#newtodo").on("keypress", function (event) {
                    if (event.keyCode==13) {
                        ntodo=$("#newtodo").val();
                        ntags=$("#newtag").val();
                        if (ntodo && ntags) {
                            toDoObjects.push({"description":ntodo, "tags":ntags.split(",")});
                            $.post("todos", toDoObjects[toDoObjects.length-1], function (response) {
                                console.log("We posted and the server responded!");
                                console.log(response);
                            });
                            showAlert(ntodo);
                            $("#newtodo").val("");
                            $("#newtag").val("");
                        }
                    }
                });
                
                $("#newtag").on("keypress", function (event) {
                    if (event.keyCode==13) {
                        ntodo=$("#newtodo").val();
                        ntags=$("#newtag").val();
                        if (ntodo && ntags) {
                            toDoObjects.push({"description":ntodo, "tags":ntags.split(",")});
                            $.post("todos", toDoObjects[toDoObjects.length-1], function (response) {
                                console.log("We posted and the server responded!");
                                console.log(response);
                            });
                            showAlert(ntodo);
                            $("#newtodo").val("");
                            $("#newtag").val("");
                        }
                    }
                });

                $("main .content button").on("click", function () {
                    ntodo=$("#newtodo").val();
                    ntags=$("#newtag").val();
                    if (ntodo && ntags) {
                        toDoObjects.push({"description":ntodo, "tags":ntags.split(",")});
                        $.post("todos", toDoObjects[toDoObjects.length-1], function (response) {
                            console.log("We posted and the server responded!");
                            console.log(response);
                        });
                       showAlert(ntodo);
                        $("#newtodo").val("");
                        $("#newtag").val("");
                    }
                });
            }

            return false; 
        });
    });

    $(".tabs a:nth-child(4) div").trigger("click");

};

var tagOrg = function (toDoObjects) {
	var tagList=[],tagsObject=[];
	toDoObjects.forEach(function (todo) {
		todo.tags.forEach(function (tag) {
			if (tagList.includes(tag)) {
				tagsObject[tagList.indexOf(tag)].todos.push(todo.description);
			}
			else {
				tagList.push(tag);
				tagsObject.push({"name":tag,"todos":[todo.description]});
			}
		});
	});
	return tagsObject;
	console.log(tagsObject);
};


var showAlert = function (item) {
    var $alertline = $("<div>");
    var $alertbox = $("<span>").attr("style","margin-bottom: 5px; border-radius: 5px 5px 5px 5px; padding: 5px; color: white; background: green; opacity: 0.6; float: left;");
    $alertbox.text("\""+item+"\" was added to the list!");
    $alertline.append($alertbox);
    $alertline.append($("<div>").attr("style","clear: both"));
    $alertbox.hide();
    $("main .content").prepend($alertline);
    $alertbox.fadeIn();
    sleep(1000).then(() => $alertbox.fadeOut());
};

var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
};


$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});