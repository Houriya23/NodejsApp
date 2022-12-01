# Backend challenge
This is a code repository for a Node.js REST API application that handles the following:

● Search for an artist by name based on the following endpoint artist.search, return all the results for this artist. 

● Writes the result to a user-supplied CSV filename.

● The CSV file should include the following information (name, mbid, url, image_small,image)

Steps to follow in order to execute the application: PS:I used node verion:16.14.2

PS:I used Last.fm API that allows anyone to build their own programs using Last.fm data. Go to the directory of the project and execute the following steps

1/npm init

2/npm i lastfmapi

3/npm i --save-dev @types/lastfmapi

4/node app.js

Then go to http://localhost:3000

you can try to fetch the data by taping the name of an artist

For example:

If you are looking for the artist "Drake", type as follows:

http://localhost:3000/?artist=drake

Then go back to your text editor, (I used Vs Code) and open the file called"artist.csv".

You will find all the data in a table with required information(name, mbid, url, image_small,image).
