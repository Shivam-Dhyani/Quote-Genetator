const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading()
{
    loader.hidden = false; // To Show 'loader'(Added .hidden CSS property to the loader ID and set it false)

    quoteContainer.hidden = true; // To Hide 'quoteContainer'(Added .hidden CSS property to the loader ID and set it true)
}

// Hide Loading
function complete()
{
    loader.hidden = true; // To Hide 'loader'(Added .hidden CSS property to the loader ID and set it true)

    quoteContainer.hidden = false; // To Show 'quoteContainer'(Added .hidden CSS property to the loader ID and set it false)
}

//Show New Quote
function newQuote() /* Created a new function to print new Quote which is randomly generated when the website loads, reloads
                       or when user clicks the New Quote Button.
                       
                       We are not printing randomly generated quote inside the 'getQuotes' function because if it's that way 
                       then we need to load 'getQuotes' function again & again whenever user clicks New-Quote button, so 
                       everytime the API will be fetched again & make the website slow. Hence used 'newQuote' function.
                    */
{
    loading(); /* 'loading()' function is added here so that when New-Quote button is clicked and if there is some delay in 
                   generating random quote then loading animation will be displayed.

                   When the website is loaded first time or reloaded again, this function will get by-passed as it has been 
                   already been called from the getQuotes() asyncronous function.
               */

    var randomNumber = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomNumber];

    console.log(quote);

    //Check Quote Length to determine styling

    if(quote.text.length > 120)
        quoteText.classList.add('long-quote');

    else quoteText.classList.remove('long-quote');
    
    quoteText.textContent = quote.text; // Adding randomly generated Quote to the 'quoteText' ID.

    // Check if Author Field is NULL(i.e. empty) and replace it with 'UNKNOWN'

    if(!quote.author) // Simplified way of writing (quote.author == NULL)
        authorText.textContent = 'UNKNOWN';

    else authorText.textContent = quote.author; // Adding Author-Name of the randomly generated Quote to the 'authorText' ID.

    complete();   /* The 'complete()' function is added in the end so that when quote has been completely loaded then only 
                     hide the loading animation & un-hide(i.e. display) quote to the user.
                  */

}

// Get Quotes from API
async function getQuotes() /* 'getQuotes' in a Asyncronous function, so it will not affect the execution of the other
                               part of the program(i.e. it will run paralley with the program without affecting the 
                                loading time of the program).
                           */
{
    loading(); /* The 'loading' animation is added before fetching API, so that the animation will run while the API gets loaded.
                  
                  Also we are not adding 'complete()' function here because it is supposed to be executed after API is loaded &
                  the random Quote is been selected from the array of Quotes API.
               */ 

    const apiUrl = 'https://type.fit/api/quotes';

    try /* try-catch statements are used for error handling. If the code written in try runs perfectly then it will run that, 
           else it will execute the code writen in catch statements.
        */  
    {
        const response = await fetch(apiUrl); /* As we are using 'await' here and also it is inside a 'asyncronous function' so          
                                                 JavaScript engine will wait until the API(i.e. stored in apiUrl variable) gets 
                                                 fetched completely(here we have used fetch() function to fetch the API), & then 
                                                 only assign it to the 'response' const array.

                                                 If 'await' wasn't used here then the 'response' variable might store 'undefined'
                                                 value in it because fetching an API requires time which depend on the internet 
                                                 speed.
                                              */

        apiQuotes = await response.json(); /* Similar like previous statement here also due to 'await' the JavaScript engine will  
                                              wait for 'response' array to convert it's objects into JSON format & then only assign
                                              it to 'apiQuotes' global array.
                                           */

        newQuote();

    }
    catch(error)
    {
        // Catch error here
        alert("API Loading Error!!");
        console.log("API Loading Error!!");
    }
}

// Post on LinkedIn

function postQuote()
{
    // Used String Literals here because we want to add text to the URL as well as save it in a variable simultaneously
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl); // Used to open a new window & open the URL passed in it.
}

// Event Listeners : Generally added in the bottom of the JavaScript Document

twitterBtn.addEventListener('click', postQuote);

newQuoteBtn.addEventListener('click', newQuote);

// On Load

getQuotes();