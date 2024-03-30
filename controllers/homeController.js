const Habit = require('../models/habit');

module.exports.load = async function (req, res) {

    try {
        let habits = await Habit.find();
        
        return res.render('home', { "habit_list" : habits });
    } catch (error) {
        console.log('Error fetching habits from DB', error);
        return res.redirect('back');
    }
    // Habit.find({}, function (err, habits) {
    //     if (err) {
    //         console.log("Error in fetching habits from DB");
    //         return;
    //     }
    //     else {
    //         return response.render('home', { habit_list: habits });
    //     }
    // })
}

// This function helps in adding a habit in list.
module.exports.add = async function (request, response) {
    request.body.record_tracker = {};
    request.body.user = "AnyUser";
    

    try {
        
        let newHabit = Habit.create(request.body);
        return response.redirect("back");
    } catch (error) {
        console.log('Error creating habits from DB', error);
        return res.redirect('back');
    }

}

// This function helps in deleting a habit from list.
module.exports.delete = async function (request, response) {
    let id = request.query.id;

    try {
        let habit = await Habit.findByIdAndDelete(id);
        return response.redirect('back');
    } catch (error) {
        console.log('Error deleting habit from DB', error);
        return res.redirect('back');
    }
    
    // Habit.findByIdAndDelete(id, function (err) {
    //     if (err) {
    //         console.log("error in deletion");
    //         return;
    //     }
    //     else {
    //         return response.redirect('back');
    //     }
    // })
}

// Finds a habit by id given in query params and renders it
module.exports.viewHabit = async function (request, response) {
    let id = request.query.id;

    try {
        let habit = await Habit.findById(id);
        response.render("habit.ejs", { "habit": habit });
    } catch (error) {
        console.log('Error viewing habit from DB', error);
        return response.redirect('back');
    }

}

// Finds a habit by it's id given in query params and returns it's json
module.exports.fetchHabit = async function (request, response) {
    let id = request.query.id;
    try {
        let habit = await Habit.findById(id);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(habit));
    } catch(error) {
        console.log('Error in finding habit', error);
        return response.redirect('back');
    }

}

// first find an element in database using id
module.exports.updateDates = function (request, response) {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    console.log(date, value, id);

    //  Then add/update the date in map then finally update map
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("Error in updating habit!!!!");
            return response.end('{ "status":"failed"}');
        }
        else {
            const r_t = habit.record_tracker;
            if (date in r_t) {
                r_t[date] = value;
            }
            else {
                r_t.set(date, value);
            }
            console.log(r_t);
            Habit.updateOne({ "_id": id }, { $set: { record_tracker: r_t } }, function (err) {
                if (err) {
                    console.log("Error in updating habit!!!!");
                    return response.end('{ "status":"failed"}');
                }
                else {
                    return response.end('{ "status":"success"}');
                }
            });
        }
    });

}