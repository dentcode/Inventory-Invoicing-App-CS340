// app.js

app.get('/', function (req, res) {
    // Declare Query 1
    let query1 = "SELECT * FROM bsg_people;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM bsg_planets;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the people
        let people = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let planets = rows;

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, { homeworld: planetmap[person.homeworld] })
            })

            // END OF NEW CODE

            return res.render('index', { data: people, planets: planets });
        })                 // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query