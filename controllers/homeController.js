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
module.exports.updateDates = async function (request, response) {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    // console.log(date, value, id);

    //  Then add/update the date in map then finally update map
    try {
        let habit = await Habit.findById(id);
        const recordTracker = habit.record_tracker;
        if (date in recordTracker) {
            recordTracker[date] = value;
        }
        else {
            recordTracker.set(date, value);
        }
        // console.log(recordTracker);

        try {
            await Habit.updateOne({ "_id": id }, { $set: { record_tracker: recordTracker } });
            return response.end('{ "status":"success"}');
        } catch(err) {
            console.log("Error in updating habit!!!!");
            return response.end('{ "status":"failed"}');
        }

    } catch(error) {
        console.log("Error in updating habit!!!!");
        return response.end('{ "status":"failed"}');
    }

}