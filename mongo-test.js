import mongoose from 'mongoose';
import exec from 'child_process';

exec.execFile('mongo.exe', function(err, data) {  
    console.log(err)
    console.log(data.toString());                       
});  

mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});