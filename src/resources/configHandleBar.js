module.exports = {
    ifCheckBoxGender: function(genderInput, genderDefault, options){
        if( genderInput == genderDefault)
            return options.fn(this) 
        return options.inverse(this)
    }
}

/*
// define own handlebar
exphbs.registerHelper('ifCheckBoxGender', function(genderInput, genderDefault, options){
    if( genderInput == genderDefault)
        options.fn(this) 
    else options.inverse(this)
})
*/