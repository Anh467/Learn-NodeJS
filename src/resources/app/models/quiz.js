const mongoose  = require('mongoose')
const Quiz = new mongoose.Schema({
        num: Number,
        questions: [
            {
                question: String,
                answer:[
                    {
                        value: String,  
                        isCorrect: Boolean 
                    }
                ]
            }
        ]
    },
    { 
        timestamps: true 
    })

module.exports = mongoose.model('Quiz', Quiz)