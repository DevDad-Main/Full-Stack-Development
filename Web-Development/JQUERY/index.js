// $(document).ready(() => {
//   $("h1").css("color", "black");
// });

// Normally selecting an element
document.querySelector("h1");

// Using JQUERY => to add classes
$("h1").addClass("big-title");

// No difference between selecting all buttons compared to one h1
$("button");

// How to check if an element has a class
$("h1").hasClass("big-title");

// Modify text of an element
$("h1").text("bye");

// Example of changing all of our buttons using the same method

$("button").text("Don't Click Me");
