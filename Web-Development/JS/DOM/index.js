// // var thirdListItem =
// //   (document.firstElementChild.lastElementChild.lastElementChild.querySelector(
// //     "ul",
// //   ).lastElementChild.innerHTML = "Olly");

// // Returns a list of Elements
// var listOfLi = document.getElementsByTagName("li");

// // This will return an error as it expects an array of "li" elements
// // document.getElementsByTagName("li").style.color = "red";

// // This will work due to accessing the array of items by index
// document.getElementsByTagName("li")[2].style.color = "purple";

// console.log(document.getElementsByTagName("li").length);

// // Allows us to get an element by the class name
// // Also is plural so it will return us back an array
// document.getElementsByClassName("btn");

// // ========== SINGLE ELEMENT SELECTORS =========
// // Returns a single item by its ID
// // Should only have a single id and no duplicates
// var title = document.getElementById("title");

// // Save it into a local variable and then we can access its properties
// // Changing it's Text to Good Bye -> from Hello
// title.innerHTML = "Good Bye";

// // This querySelector also only returns a single item
// // Takes in anything, class, id or element
// // EXAMPLE USECASES
// // document.querySelector("h1");
// // document.querySelector("#title");
// // document.querySelector(".btn");

// //Hierarchial Selector
// document.querySelector("li a"); // Returns the a ref in our li
// document.querySelector("a"); // Returns the a ref in our li same as above

// document.querySelector("li.item");

// // These are good and better for more complex selections
// // Returns the first one it finds
// document.querySelector("#list .item");

// //Whereas this will return all that it finds,in this case the three list items
// document.querySelectorAll("#list .item");

// document.querySelector("li a").style.color = "red";
// document.querySelector("h1").style.color = "red";

// var button = document.querySelector(".btn");
// button.style.backgroundColor = "yellow";
// button.style.border = "none";

// Returns us the classes attached to this element
document.querySelector("button").classList;

// We can then add classes to an element like so
document.querySelector("button").classList.add("invisible");

// Then if we have some logic or styles attached to the invisible classes
// and we want to remove them depending on some state
document.querySelector("button").classList.remove("invisible");

// This is what it says, if our styles are applied it removes them.
// if they are not applied then it applies them
document.querySelector("button").classList.toggle("invisible");
