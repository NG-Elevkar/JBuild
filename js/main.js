var components = [
    {
	"name": "Paragraph",
	"icon": "./img/components/paragraph.png",
	"properties": [
	    {
		"type": "textarea",
		"name": "content"
	    },
	    {
		"type": "textline",
		"name": "font"
	    },
	    {
		"type": "int",
		"name": "fontsize"
	    }
	]
    }
];
var properties = {
    "textarea": function(name) {
	var title = $("<div/>", {
	    class: "header"
	}).text(name);
	var input = $("<textarea/>", {class: "content"});
	$("<div/>", {
	    class: "section"
	}).append(title).append(input);
    }
};
function parseComponent(component) {
    var compContainer = $("<div/>", {
	class: "component",
	draggable: true,
	ondragstart: "dragStart(event);"
    }).attr("data-id", component["name"].toLowerCase());
    var name = $("<div/>", {class: "name"}).text(component["name"]);
    var icon = $("<div/>", {class: "icon"}).append($("<img/>", {src: component["icon"], draggable: false}));
    compContainer.append(icon).append(name);
    $(".component-list").append(compContainer);
}
function parseComponentProperties(properties) {
    for(property in properties) {
	
    }
}

// Begin drag and drop handler
function dragStart(event) {
    event.dataTransfer.setData("id", event.target.dataset.id);
    var img = new Image();
    img.src = "/img/components/" + event.target.dataset.id + ".png"; 
    console.log(img.src);
    event.dataTransfer.setDragImage(img, 10, 10);
}
function dragOver(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var type = event.dataTransfer.getData("id");
    console.log(type);
}
// End drag and drop handler
$(document).ready(function() {
    for(component in components) {
	parseComponent(components[component]);
    }
});
