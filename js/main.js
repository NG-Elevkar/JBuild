var components = [
    {
	"name": "Paragraph",
	"icon": "./img/components/paragraph-icon.png",
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
    var icon = $("<div/>", {class: "icon"}).append($("<img/>", {src: component["icon"]}));
    compContainer.append(icon).append(name);
    $(".component-list").append(compContainer);
}
function parseComponentProperties(properties) {
    for(property in properties) {
	
    }
}

// Begin drag and drop handler
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
    var img = new Image();
    img.src = "./img/compontents/" + event.target.dataset.id + "-icon.png"; 
    ev.dataTransfer.setDragImage(img, 10, 10);
}
// End drag and drop handler
$(document).ready(function() {
    for(component in components) {
	parseComponent(components[component]);
    }
});
