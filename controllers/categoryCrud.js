const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


AWS.config.update({
    region: "YOUR REGION, EXAMPLE: us-east-1",
    accessKeyId: "YOUR ACCESS KEY ID",
    secretAccessKey: "YOUR SECRET ACCESS KEY",
    endpoint: "YOUR ENDPOINT, EXAMPLE: https://dynamodb.us-east-1.amazonaws.com"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "YOUR TABLE NAME, EXAMPLE: category";


exports.add = (req,res) => {

    var params = {
        TableName: table,
        Item:{
            "id":uuidv4(),
            "categoryName": req.body.categoryName
        }
    };

    docClient.put(params, function(err, data) {
        if(err) {
            console.log("Unable to add item, Error JSON:", JSON.stringify(err, null, 2));
            res.send({status: false, message: 'Add failed'});
        } else {
            console.log('Added item:', JSON.stringify(data, null, 2));
            res.send({status: true, message: 'Data added'})
        }
    });

}



exports.get = (req,res) => {

    var params = {
        TableName: table,
        Key:{
            "id": req.params.id
        
        }
    };


    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send({status: false, message: 'Get failed'});
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.send({status: true, message: 'Data fetched', data: data})
        }
    });


}



exports.update = (req,res) => {

    var params = {
        TableName:table,
        Key:{
            "id": req.params.id
        },
        UpdateExpression: "set categoryName = :categoryName",
        ExpressionAttributeValues:{
            ":categoryName": req.body.categoryName,
        },
        ReturnValues:"UPDATED_NEW"
    };


    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        res.send({status: false, message: 'Update failed'});
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        res.send({status: true, message: 'Data updated', data: data})
    }
    });


}



exports.delete = (req,res) => {

    var params = {
        TableName:table,
        Key:{
            "id": req.params.id
        }
    };


    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        res.send({status: false, message: 'Delete failed'});
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        res.send({status: true, message: 'Data deleted'})
    }
    });


}