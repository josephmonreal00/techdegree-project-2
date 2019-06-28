/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//........................................GLOBAL VARIABLES........................................

/*
students variable retrieves all elements with class name "student-item cf" and allows us too
reference this list throughout our code
*/
let students = document.getElementsByClassName('student-item cf');

/*
numOfItems variable stores the number of students that should show up on each page
*/
const numOfItems = 10;

/*
retrieving div element with class name as 'page'

This variable will have an unordered list appended to it
*/
let pageElement = document.getElementsByClassName('page')[0];

/*
pageCount variable is for pageNums function and each time studentCount variable == 10
pageCount will be iterated by 1
*/
let pageCount = 0;

/*
studentCount variable will iterate by one and once it accumulates to 10 it'll be reset to 0
in order to count another 10 to add to pageCount variable
*/
let studentCount = 0;

//........................................GLOBAL VARIABLES........................................

window.addEventListener('load', () => {
    for (let i = 0; i < students.length; i++) {
        if (i >= 10 && i <= students.length) {
            students[i].style.display = "none";
        }
    }
});

/*........................................showPage()........................................

Parameters:

 list:

  --> The list parameter takes in a list that represents all of the students existent
   on the page

 page:

  --> The page number that user clicks on and from this number function is able to
   display the correct students within browser

Local Variables:

 startIndex  = (page parameter * items per page) - items per page

 endIndex  = page parameter * items per page

showPage:

 Function hides all of the items in the list except for the ten you want to show.
 Inside the loop, display any list item with and index that is greater than or equal
 to the `startIndex` and less than the `endIndex` variable



........................................showPage()........................................*/

let showPage = (list, page) => {
    let startIndex = (page * numOfItems) - numOfItems;
    let endIndex = page * numOfItems;

    for (let i = 0; i <= students.length - 1; i++) {
        if (i >= startIndex && i < endIndex) {
            students[i].style.display = "inherit";
        } else {
            students[i].style.display = "none";
        }
    }
}

/*........................................pageNums()........................................

 Parameters:

  takeInStudents: the list of students to iterate through

 Global Variables:

  studentCount:

 Returns:

  pageCount: the numbers of pages

 pageNums():

  the purpose of this function is too count the number of pages


........................................pageNums()........................................*/


let pageNums = (takeInStudents) => {
    if(takeInStudents.length > 0 && takeInStudents.length < 10 || takeInStudents.length % 10 > 0 && takeInStudents.length % 10 < 10) {
        pageCount += 1;
    }
    
    for (let i = 0; i < takeInStudents.length; i++) {
        studentCount += 1;
        if (studentCount == 10) {
            pageCount += 1;
            studentCount = 0;
        }
    }

    return pageCount;
}

/*........................................appendPageLinks()........................................

Parameters:

 listOfStudents:

  --> takes the global `students` variable giving the function access
   too all students stored in list

 global_:

  --> takes in an empty global array and inside function a for loop will
   run to store


Local Variables:

 divElement:  holds the `DIV` element that is created

 ulElement:  holds the `UL` element that is created

 liElement:   holds the `LI` element that is created

 aElement:   holds the `A` element that is created

 anchorList:  an empty array that stores the list elements created

 thepagenumbers: holds the number of pages that is returned from the pageNums function

Global Variables:

 pageElement:  is appended a DIV element at the end of the function that contains all
     the list items with appropriate information.


Calls To Other Functions:

 setActive(): function is called when pagination is clicked and event listener runs and
     takes in the current link being used.

 showPage():  is passed the global students list and page number user is currently on.


appendPageLinks:

 Function generates, appends, and adds functionality to the pagination buttons. Function takes
 in two different arguments. Inside the function the DOM elements that represent pagination links
 are created and appended. A oontainer DIV element is created and then given the class name of
 `pagination` and is then appended to the DIV element with class name of `page`.

 A nested UL element containing an LI element for every ten students in the list is created and also
 given a HYPERLINK element `A`. The A element should then set the href attribute to `#`.

 The `active` class name should initially be given to the first pagination link. Each pagination link
 is also given and event listener and when click the active class name is removed from all pagination links.

........................................appendPageLinks()........................................*/

let globalAnchors = [];

let appendPageLinks = (listOfStudents, global_) => {

    let divElement = document.createElement('DIV');
    divElement.className = "pagination";

    let ulElement = document.createElement('UL');
    divElement.appendChild(ulElement);

    /*

     The for loop below will iterate however many times based on the pagenumbers
     local variable which gets its value from the pageNums function. Inside the
     for loop it will create an `LI` element and append it to an unordered list.
     Then an anchor element will be created in order to append it to the list element
     that is already sitting in the unordered list.


    */

    let thepagenumbers = pageNums(students);

    let anchorList = [];

    for (let i = 0; i < thepagenumbers; i++) {

        let liElement = document.createElement('LI');
        ulElement.appendChild(liElement);

        let aElement = document.createElement('A');
        liElement.appendChild(aElement);

        aElement.href = '#';
        aElement.innerHTML = i + 1;

        anchorList.push(aElement);

    }

    /*
     Looping through the anchors stored in the list to add an event listener for each.

     1. Entering the loop we set the anchors className attribute blank.
     2. We then add a click event for each anchor element that is stored in the anchorList
     3. When the click event is triggered we want to set the className for that particular
      element to 'active'.

    */

    for (let i = 0; i < anchorList.length; i++) {
        anchorList[0].className = 'active';
        anchorList[i].addEventListener('click', (event) => {
            setActive(event.currentTarget);
            showPage(students, parseInt(event.target.innerHTML));
        });
    }

    for (let i = 0; i < anchorList.length; i++) {
        global_.push(anchorList[i]);
    }

    pageElement.appendChild(divElement);
}

/*........................................setActive()........................................

 Parameters:

  element: takes in the current element being used and set its className attribute
     to active

 Calls To Other Functions:

  setBlank: passes the current element that is being used to setBlank function
  

 setActive()
    Function that sets the className attribute for the current pagination link being used to 
    `active`.

  ........................................setActive()........................................*/

let setActive = (element) => {
    element.className = 'active';
    setBlank(element);
}

/*........................................setBlank()........................................

 Parameters:

  ele:
   takes in the current pagination element that is being used in order to create
   for loops that will ignore this element and change the rest.

 Local Variables:

  elementIndex:
   represents the page number of the element but is a value less and is turned into
   an integer to use within for loops.

 setBlank:

  This function sets all other pagination links as '' and leaves the current element
  being used as 'active'.

  ........................................setBlank()........................................*/

let setBlank = (ele) => {
    elementIndex = parseInt(ele.innerHTML) - 1;
    if (elementIndex == 0) {
        for (let i = 1; i <= globalAnchors.length - 1; i++) {
            globalAnchors[i].className = '';
        }
    } else if (elementIndex == globalAnchors.length - 1) {
        for (let i = 0; i <= globalAnchors.length - 2; i++) {
            globalAnchors[i].className = '';
        }
    } else {
        for (let i = 0; i <= elementIndex - 1; i++) {
            globalAnchors[i].className = '';
        }
        for (let i = elementIndex + 1; i <= globalAnchors.length - 1; i++) {
            globalAnchors[i].className = '';
        }
    }
}

/*......................................................................................................................*/

appendPageLinks(students, globalAnchors);
