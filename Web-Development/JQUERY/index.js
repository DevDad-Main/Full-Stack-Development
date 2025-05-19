// $(document).ready(() => {
//   $("h1").css("color", "black");
// });

// Normally selecting an element
// document.querySelector("h1");
//
// // Using JQUERY => to add classes
// $("h1").addClass("big-title");
//
// // No difference between selecting all buttons compared to one h1
// $("button");
//
// // How to check if an element has a class
// $("h1").hasClass("big-title");
//
// // Modify text of an element
// $("h1").text("bye");
//
// // Example of changing all of our buttons using the same method
//
// $("button").text("Don't Click Me");

// Manipulating attriubtes with JQUERY
// Console logging what this attribute this returns
// returns drum.png
// console.log($("img").attr("src"));
//
// // Settign the attribute, first param gets what we want to change
// // then the second one changes it to what we want
// $("a").attr("href", "https://www.yahoo.com");
//
// //Then we can check what classes the attribute has
// $("h1").attr("class");
// // Returns what classes are attached to thi attribute
//
// // Adding event listeners to our elements
// $("h1").click(function () {
//   $("h1").css("color", "purple");
// });
//
// //Adding event listeners for all of our buttons with the default js way
// for (var i = 0; i < 5; i++) {
//   document.querySelectorAll("button")[i].addEventListener("click", function () {
//     document.querySelector("h1").style.color = "purple";
//   });
// }
//
// // now to do the same as above but with the JQuery way
// // Finds all of the buttons in our website and then adds the click event listener to them
// $("button").click(() => {
//   $("h1").css("color", "purple");
// });
//
// $(document).keypress((event) => {
//   // Logs to the console the keys we press on the keyboard
//   //console.log(event.key);
//   console.log(event.key);
//   $("h1").text(event.key);
// });
//
// // using the on function allows us to pass in different event types
// // like click etc
// $("h1").on("mouseover", () => {
//   $("h1").css("color", "purple");
// });
//
// //adding and removing elements on the fly or dynamically
// // Before func allows us to create a new element before the one we select
// $("h1").before("<button>New Button</button>");
//
// // And the After func allows us to create the element After
// // the selected eleemenet
// $("h1").after("<button>New Button</button>");
//
// // Prepend will actually add it to the h1 element
// // before the h1 text
// $("h1").prepend("<button>New Button</button>");
//
// // Append will actually add it to the h1 element
// // after the h1 text
// $("h1").append("<button>New Button</button>");
//
// // Removing element is aactually quite easy
// // we use the remove method
// // $("button").remove();
//
// // Hide is an animation event that will hide the selected element
// $("h1").on("click", () => {
//   $("h1").hide();
// });
//
// // Toggle is an animation event that will toggle the selected element
// $("button").on("click", () => {
//   $("h1").toggle();
// });
//
// // Fade In is an animation event that will Fade In the selected element
// $("button").on("click", () => {
//   $("h1").fadeIn();
// });
//
// // Fade Out is an animation event that will Fade Out the selected element
// $("button").on("click", () => {
//   $("h1").fadeOut();
// });
//
// // Fade Totgle is an animation event that will toggle the selected element
// $("button").on("click", () => {
//   $("h1").fadeToggle();
// });
//
// // slideUp is an animation event that will collapse the selected element
// $("button").on("click", () => {
//   $("h1").slideUp();
// });
//
// // Slide Out is an animation event that will show down the selected element
// $("button").on("click", () => {
//   $("h1").slideDown();
// });
//
// // Side lToggle is an animation event that will show down the selected element
// $("button").on("click", () => {
//   $("h1").slideToggle();
// });
//

// Custom css animations
// We can only animate numeric values, so colours etc wont work but
// things like opacity will, percentages and px need to be in " "
$("button").on("click", () => {
  $("h1").animate({
    opacity: 0.5,
    margin: "20px",
  });
});

// We can also chain multiple tweenings together like so
$("button").on("click", () => {
  $("h1").slideUp().slideDown().animate({
    opacity: 0.5,
  });
});
