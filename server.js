const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 3000

app.use(express.json());

app.get('/number', async (req, res) => {
    try {
        let response = await axios.post('https://sever1.tempxapi.com/api/numbers', { countryName: 'United States', limit: 20, page: 1 }, {
            headers: {
                'Host': 'sever1.tempxapi.com',
                'X-Platform': 'Android',
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'okhttp/4.9.2'
            }
        })

        let output
        if (typeof response.data === 'object') {
            output = JSON.stringify(response.data);
        } else {
            output = response.data.toString();
        }

        res.setHeader('Content-Type', 'text/plain')
        res.send(output)
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.end('Error')
    }
})

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`)
})
