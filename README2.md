Notes for the revamp of this app

<h3>Goals</h3>
<ol align=left>
   <li>Posts should be generated by by information from the APIs from each store.  Users should NOT be able to add any games to the database.</li>
   <li>Detailed Game page needs to be able to show lowest price but also have the option to see all prices upon request.  This can be a seperate page or modal but ideally its a toggle on the page</li>
   <li>Add in DLC as part of the store while making sure the base game is attached on the page as well.</li>
   <li></li>
</ol>

1. Model for 'game' needs to stay lightweight.  Need to add columns for the three base APIs to use (and possibly more in the future) as well as a 'DLC' column.  To create games now, app should be going through API and taking the name of the game.  Will start off with lowercase of the name without spaces to sift through.  If the name matches a lowercase no space version in the database, it just checks the price and moves on.  If not, creates a new record in the game table.
*Need to make sure that there is some DLC indicator in each of the APIs to determine if DLC column should be filled or null.
If possible, post the an example record from each of the APIs that will be used (Steam, Epic, GoG)