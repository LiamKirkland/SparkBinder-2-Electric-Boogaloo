# App Concept: Card Collection Builder

## Stories
### Feature 1 - Search Cards
User story: As a user, I want to search for Magic cards from a database by name. I want to see the first 10 results of the search. This Search Page will also act as the Home Page.  
*Details: GET data from [scryfall](https://scryfall.com/docs/api/cards/search)'s public API.* 

### Feature 2 - View Card Details
User story: As a user, I want to view the specifics of a card from the search by clicking one of the search results.  
*Details: Either a GET from [scryfall](https://scryfall.com/docs/api/cards/id)'s API using the ID given by the above search, or store the data on the component to reduce the API calls.*

### Feature 3 - Add Card to Collection & Display User's Card Collection
User story: As a user, I want to add cards to my collection. Additionally, I would like to add custom attributes. I want to be able to navigate to the collection through a NavBar and see my current collection.  
*Details: Add a form that accepts the custom attributes. On submit, add the card and it's attributes to the collection. Build out the Collection Page to display cards within the collection. Allow users to click on cards from their collection to view their details.*

### Feature 4 - Update or Delete Cards in Collection
User story: As a user, I would like to update the custom attributes or delete the card entirely from my collection. This should be immediately reflected in the UI if deleted.  
*Details: When a user clicks Update, change the info fields for the custom attributes to input fields. Deleting removes the card from the collection displays (then will either display placeholder info or previous card info)*

### Feature 5 - Add Audit History
User story: As a user, I would like to know what changes have been made to my collection.   
*Details: When a change is made to the collection (card added, removed, or updated), store that change and relevant information to the audit history page.*
