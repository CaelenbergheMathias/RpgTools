<h1>Readme</h1>

<p>the dropdown menu's are not visible in the screencast for some reason but they are there.</p>

<p>As you may know I made a Character Generator for rpgs, it was planned to make them for dnd, grups and call of cthulhu.
but I only managed to make a basic dnd character generator.</p>
<p>The repo is located <a href="https://github.com/CaelenbergheMathias/RpgTools.git">here</a>. And the app is hosted via
githubpages <a href="https://caelenberghemathias.github.io/RpgTools/">here</a></p>

<p>Instead of using the DnD api I used the databasefiles from the same api because the api does not use all of the databasefiles
which I got from <a href="https://github.com/adrpadua/5e-database.git">this</a> repo.</p>

<p>No multiclassing characters at the moment due to time constraints</p>

<p>The serviceworker dynamicaly adds webpages you have visited. I use localforage to save created characters, it is a
single key/value pair. namely "dndchars" where the value is an array of dndcharacters.
You can also delete characters created characters.
</p>
<p>i have used Typescript for the functionality and Sass for the styling.</p>

<p>I attempted to use nodejs as a backend in order to save the characters on the server, but I had troubles 
getting the sockets to send data from the clientside to the server and i was unable to find the reason. </p>

<p>I have not used webpack nor security headers.</p>

<h2>Links</h2>
<ul>
<li>repo: <a href="https://github.com/CaelenbergheMathias/RpgTools.git">https://github.com/CaelenbergheMathias/RpgTools.git</a></li>
<li>app: <a href="https://caelenberghemathias.github.io/RpgTools/">https://caelenberghemathias.github.io/RpgTools/</a></li>
<li>used databasefiles: <a href="https://github.com/adrpadua/5e-database.git">https://github.com/adrpadua/5e-database.git</a></li>
</ul>