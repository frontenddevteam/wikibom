const fs = require('fs');

module.exports = function(app){
    app.get('/api/questionlist',(req,res)=>{
        fs.readFile('./data/questionList.json','utf8',(err,data)=>{
            if(err) {
                console.log(err);
                return res.json({status : 'FAIL', mess : 'Could not read data'});
            }
            res.json({status : 'SUCCESS', data : JSON.parse(data)});
        })
    });

    app.get('/api/question',(req,res)=>{
        fs.readFile('./data/questionList.json','utf8',(err,data)=>{
            if(err) {
                console.log(err);
                return res.json({status : 'FAIL', mess : 'Could not read data'});
            }
            let questionId = req.query.questionId;
            res.json({status : 'SUCCESS', data : JSON.parse(data)[questionId]});
        })
    })

    app.post('/api/question',(req,res)=>{
        let questionId = req.query.questionId;
        let question = req.body;
        fs.readFile('./data/questionList.json','utf8',(err,data)=>{
            if(err) {
                console.log(err);
                return res.json({status : 'FAIL', mess : 'Could not access database'});
            }
    
            let dataObj = JSON.parse(data);
            if(questionId && questionId !== 'undefined' && typeof questionId !== undefined){
                dataObj[questionId] =  Object.assign({}, dataObj[questionId], question, {dateModified: Date.now()});
            }
                
            else {
                question.createdBy = req.session.username;
                question.dateCreated = Date.now();
                dataObj.push(question);
            }
            console.log(dataObj);
            // save
            fs.writeFile('./data/questionList.json', JSON.stringify(dataObj), 'utf8', (err)=>{
                if(err) return res.json({status : 'FAIL' , mess : 'Could not save data'});
                res.json({status : 'SUCCESS' , mess : 'Save question success'});
            })
    
            
        })
    })
    
    app.post('/api/deletequestion', (req,res)=>{
        let questionIds = req.body.questionIds;
        
        fs.readFile('./data/questionList.json','utf8',(err,data)=>{
            if(err) {
                console.log(err);
                return res.json({status : 'FAIL', mess : 'Could not delete database'});
            }
    
            let dataObj = JSON.parse(data);
            if(questionIds && questionIds !== 'undefined' && typeof questionIds !== undefined){
                for (let i = questionIds.length - 1; i > -1; i--) {
                    console.log(questionIds.length);
                     if (questionIds[i]) {
                         console.log(i + ' : ' + questionIds[i])
                         dataObj.splice(i, 1);
                         questionIds.splice(i, 1);
                     }
                }
                
            }
            console.log(dataObj);
            // save
            fs.writeFile('./data/questionList.json', JSON.stringify(dataObj), 'utf8', (err)=>{
                if(err) return res.json({status : 'FAIL' , mess : 'Could not delete data'});
                res.json({status : 'SUCCESS' , mess : 'Delete data success'});
            })
            
        })
    })
    
}