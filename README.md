# SparkBinder 2 <br> <sub style="font-size: 0.1rem">*Now with 100% more React!*</sub>
As a user, I want to search for MTG cards using [Scryfall's API](https://scryfall.com/docs/api). Then I want to add my own attributes (such as Condition, Foil vs Paper, Full Art or Standard, and a comment) and add the card to my collection. I would also like to be able to update or remove cards and have all of these changes tracked. Lastly, all of this should be persistent across sessions as my collection grows/changes.

### Project Setup
- The app is currently deployed on [Netlify](https://sparkbinder.netlify.app/)!
  - Click the link to try it out without any setup :D
- To run the app locally, follow these instructions: 
  - Pull the app down from GitHub
    - `git clone git@github.com:LiamKirkland/SparkBinder-2-Electric-Boogaloo.git`
  - Navigate to the project directory and then install the dependencies
    - This can be done by running `cd SparkBinder-2-Electric-Boogaloo` and then `npm install`
  - Once the packages are done installing, run the following commands:
    - Run `npm run dev` to start your json-server
    - In a new terminal window/tab, run `npm start` in the project directory to open SparkBinder 2 in your default browser

### Core Features
- ***Search Page***
  - Search results should display up to the first 10 cards found by Scryfall's API
  - Clicking one of the results should display it and its relevant information
  - Store card attributes in State to reduce reliance on Scryfall's API/reduce redundant calls
  - From this display window, users can add their own attributes and add the card to their collection
- ***Collection Page***
  - Cards in the collection will be displayed on this page
  - The card display will appear at the top and automatically select the first card in the collection on page load
  - Users can click on a card to display it and see both the card's information and the user's custom-set attributes
  - Users can delete or update the card from this display window
- ***Audits Page***
  - Any changes to the Collection will be tracked here
    - These changes include cards Added, Removed, or Updated
    - If a card is updated, its updated attributes are displayed on the audit
  - These Audits can be sorted by Newest or Oldest first (Newest by default), and can be filtered by action type (Add, Update, Delete)
- ***App Persistence***
  - SparkBinder 2 uses a local DB file to store the user's collection and the collection's audit history to allow for persistence across sessions
  - Both the audits and the collection are stored within the same file
  - The Audits are added to from the back-end, as this should in theory represent the true history of the collection and should not be edited by the user directly
 
### User Notes
- The Search functionality relies on Scryfall's public API
  - This API has a rate-limit of 2 queries per second
  - When spammed, the API will block additional calls and throw a 429 error in the console
    - If this does happen, simply wait a minute or two then try again
- The application assumes your json-server will be running on port 3000
  - If after running `json-server --watch db.json` you see that it is running on a different port, you can do one of two things:
    - Close any other local servers that may be running, then rerun the json-server
    - Change the `collURL` and `auditURL` variables in `constants.js` to reflect which port your server is running on
- If you aren't familiar with Magic the Gathering, no worries! There are over 29,000 uniquely named cards, so it is easy to find cards with general searches
  - Magic is in a fantasy setting, so words like Elf, Mage, Wizard, Spell, etc will yield plenty of results
  - You can also use Scryfall's [Random Feature](https://scryfall.com/random) to find cards and search them within SparkBinder
    - *Some of the art on SparkBinder may not line up with what you see on Scryfall, as some cards get reprinted with new art and SparkBinder does not account for cards that span across multiple sets.*
