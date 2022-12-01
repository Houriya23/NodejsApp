import querystring from 'querystring';
import http from 'http';
import url from 'url';
import LastfmAPI from 'lastfmapi';
import fastcsv from 'fast-csv';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 3000;
const ws = fs.createWriteStream("artist.csv");

var lfm = new LastfmAPI({
    'api_key': '1e3f616d20ccb2062251dbedb7d64ab3',
    'secret': '1c7b8d21b9fcf5d9e589b85002be1dd5'
});

let results = [];
function getArtist(name) {
    lfm.artist.search({ 'artist': name }, function (err, artist) {
        if (err) { throw err; }

        for (var i = 0; i < artist['artistmatches']['artist'].length; i++) {

            for (var j = 0; j < artist['artistmatches']['artist'][i]['image'].length; j++) {
                var image_small;
                var image;
                if (artist['artistmatches']['artist'][i]['image'][j]['size'] == 'small') {

                    image_small = artist['artistmatches']['artist'][i]['image'][j]['#text']
                }
                if (artist['artistmatches']['artist'][i]['image'][j]['size'] == 'large') {
                    image = artist['artistmatches']['artist'][i]['image'][j]['#text']
                }


            }
            var newobject = {
                'name': artist['artistmatches']['artist'][i]['name'],
                'mbid': artist['artistmatches']['artist'][i]['mbid'],
                'url': artist['artistmatches']['artist'][i]['url'],
                'image': image,
                'image_small': image_small
            }
            console.log(newobject)
            results.push(newobject);
        }
        fastcsv
            .write(results, { headers: true })
            .on("finish", function () {
                console.log("Write to CSV successfully!");
            })
            .pipe(ws);
    })
}

const server = http.createServer((req, res) => {
    var params = querystring.parse(url.parse(req.url).query);
    if ("artist" in params) {
        getArtist(params['artist'])
        res.end("look to your csv file")
    }
    else {
        res.end("Please enter your artist name !!!")
    }


});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

