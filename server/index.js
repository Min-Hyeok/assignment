const express = require('express');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const Paths = {
    RANKING: 'ranking',
    LIFE: 'life',
    TRIP: 'trip',
    FOOD: 'food',
    CULTURE: 'culture',
}

const parseJSON = (() => {
    const cache = {};
    return fileName => {
        if (cache[fileName]) {
            return cache[fileName];
        }
        const file = fs.readFileSync(`./data/${fileName}.json`, { encoding: 'utf-8' });
        cache[fileName] = JSON.parse(file);
        return cache[fileName];
    }
})();

const parseDetail = (() => {
    const cache = {};
    return async fileName => {
        const url = decodeURIComponent(fileName);
        const path = `./data/detail/${encodeURIComponent(fileName)}`;
        if (cache[url]) {
            return cache[url];
        }
        if (fs.existsSync(path)) {
            cache[url] = fs.readFileSync(path);
        } else {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const content = $('.article_body').html();

            cache[url] = content;
            fs.writeFileSync(path, content);
        }
        return cache[url];
    }
})();

app.use(express.static('dist'));

app.get('/api/best', (req, res) => {
    res.json(parseJSON(Paths.RANKING));
});

app.get('/api/content/:categoryID', (req, res) => {
    res.json(parseJSON(req.params.categoryID));
});

app.get('/api/main', (req, res) => {
    const life = parseJSON(Paths.LIFE);
    const food = parseJSON(Paths.FOOD);
    const trip = parseJSON(Paths.TRIP);
    const culture = parseJSON(Paths.CULTURE);
    res.json({
        life: life.slice(0, 4),
        food: food.slice(0, 4),
        trip: trip.slice(0, 4),
        culture: culture.slice(0, 4),
    });
});

app.get('/api/detail/:url', async (req, res) => {
    res.send(await parseDetail(req.params.url));
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
