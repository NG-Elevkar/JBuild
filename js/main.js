var site = {"components": {}};
var components = {
    "paragraph": {
	"name": "Paragraph",
	"icon": "./img/components/paragraph.png",
	"properties": {
	    "content": {
		"type": "textarea",
		"name": "content",
		"value": "Type some content in here"
	    },
	    "font": {
		"type": "textline",
		"name": "font",
		"value": "Roboto"
	    },
	    "fontsize": {
		"type": "int",
		"name": "fontsize",
		"value": 12,
		"min": 0,
		"max": 72
	    }
	}
    }
};
var properties = {
    "textarea": {
	"generate": function(object, index) {
	    var input = $("<textarea/>", {class: object["name"]}).val(object["value"]);
	    return $("<div/>", {
		class: "section"
	    }).append(generateTitle(object["name"])).append(input).data("index", index);
	},
	"retrieve": function(name, index) {
	    site["components"][index]["properties"][name]["value"] = $(".property-editor ." + name).val();
	}
    },
    "textline": {
	"generate": function(object, index) {
	    var input = $("<input/>", {class: object["name"], type: "text"}).val(object["value"]);
	    return $("<div/>", {class: "section"}).append(generateTitle(object["name"])).append(input);
	},
	"retrieve": function(name, index) {
	}
    },
    "int": {
	"generate": function(object, index) {
	    var input = $("<input/>", {class: object["name"], type: "number", min: object["min"], max: object["max"]}).val(object["value"]);
	    return $("<div/>", {class: "section"}).append(generateTitle(object["name"])).append(input);
	},
	"retrieve": function(name, index) {
	    
	}
    }
};
function generateTitle(name) {
    return $("<div/>", {class: "header"}).text(capitalize(name));
}
function capitalize(string) {
    return string[0].toUpperCase() + string.substring(1)
}
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
function genId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function handleDrop(type) { // Called everytime a component is dropped on the work-area
    var index = genId();
    site["components"][index] = $.extend(true, {}, components[type]); // Add an instance of the component to the site object
    var root = $(".work-area"); // The root element for the work-area
    var newComponent = $("<div/>", {class: "component", onclick: "selectComponent($(this));"}).data("index", index); // The new component element that will be added to the work-area. will also have the position in site["components"] stored in dom
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
    for(var i = 0; i < content.length ; i++) { // For item in content
	newComponent.append(content[i]);
    }
    try {
	saveProperties($(".selected").data()["index"]);
    } catch(error) {
	console.log("First component");
    }
    $(".selected").removeClass("selected");
    newComponent.addClass("selected");
    root.append(newComponent);
    clearProperties();
    loadProperties(site["components"][index], index);
}
// End drag and drop handler
function selectComponent(jObject) {
    console.log($(".selected").data()["index"]);
    saveProperties($(".selected").data()["index"]);
    $(".selected").removeClass("selected");
    jObject.addClass("selected");
    clearProperties();
    loadProperties(site["components"][jObject.data("index")], jObject.data("index"));
}
function saveProperties(index) {
    console.log(index);
    console.log(site["components"][index]["properties"]);
    for(property in site["components"][index]["properties"]) {
	var tmp = site["components"][index]["properties"][property];
	properties[tmp["type"]]["retrieve"](tmp["name"], index);
    }
}
function clearProperties() {
    $(".property-editor").empty();
}
function loadProperties(component, index) {
    for(property in component["properties"]) {
	console.log(property);
	var tmp = component["properties"][property];
	$(".property-editor").append(properties[tmp["type"]]["generate"](tmp, index));
    }
}
$(document).ready(function() {
    for(component in components) {
	parseComponent(components[component]);
    }
});
