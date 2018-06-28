var site = {"components": []};
var components = {
    "paragraph": {
	"name": "Paragraph",
	"icon": "./img/components/paragraph.png",
	"properties": [
	    {
		"type": "textarea",
		"name": "content",
		"value": {}
	    },
	    {
		"type": "textline",
		"name": "font",
		"value": {}
	    },
	    {
		"type": "int",
		"name": "fontsize",
		"value": {}
	    }
	]
    }
};
var properties = {
    "textarea": {
	"generate": function(name, index) {
	    var title = $("<div/>", {
	    class: "header"
	    }).text(name);
	    var input = $("<textarea/>", {class: "content"});
	    return $("<div/>", {
		class: "section"
	    }).append(title).append(input);
	},
	"retrieve": function(name, index) {

	}
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
    handleDrop(type);
}
function handleDrop(type) { // Called everytime a component is dropped on the work-area
    site["components"].push(components[type]); // Add an instance of the component to the site object
    var root = $(".work-area"); // The root element for the work-area
    var newComponent = $("<div/>", {class: "component", onclick: "selectComponent($(this));"}).data("index", site["components"].length - 1); // The new component element that will be added to the work-area. will also have the position in site["components"] stored in dom
    var content = []; // An array with all the elements that will be added to the new component
    content.push( // Component Icon Container
	$("<div/>",
	  {class: "icon"}
	 ).append( // Component Icon <img/>
	     $("<img/>",
	       {src: components[type]["icon"]}
	      )
	 )
    );
    content.push( // Component Label
	$("<div/>",
	  {class: "label"}
	 ).html(components[type]["name"])
    );
    content.push( // Right Floating Container
	$("<div/>",
	  {class: "righty"}
	 ).append( // Properties Icon (appended to the right floating container)
	$("<div/>",
	  {class: "icon"}
	 ).append( // Properties Icon </img>
	     $("<img/>",
	       {src: "./img/properties.png"}
	      )
	 )
	 ).append( // Up Arrow Glyph
	     $("<div/>", {class: "icon"}).html("&#9650;")
    ).append( // Down Arrow Glyph
	$("<div/>", {class: "icon"}).html("&#9660;")
    )
    );
    console.log(content);
    for(var i = 0; i < content.length ; i++) { // For item in content
	newComponent.append(content[i]);
    }
    root.append(newComponent);
}
// End drag and drop handler
function selectComponent(jObject) {
    $(".selected").removeClass("selected");
    jObject.addClass("selected");
    saveProperties();
    clearProperties();
    loadProperties(site["components"][jObject.data()["index"]]);
}
function saveProperties() {
    
}
function clearProperties() {
    $(".property-editor").empty();
}
function loadProperties(component, index) {
    clearProperties();
    for(property in component["properties"]) {
	var tmp = component["properties"][property];
	$(".property-editor").append(properties[tmp["type"]]["generate"](tmp["name"], index));
    }
}
$(document).ready(function() {
    for(component in components) {
	parseComponent(components[component]);
    }
});
