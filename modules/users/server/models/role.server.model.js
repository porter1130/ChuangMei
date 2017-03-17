/**
 * Created by jcwang on 2017/3/15.
 */
var mongoose=require('mongoose'),
  Schema=mongoose.Schema;

var schema=new Schema({
  Name:{
    type:String,
    trim:true,
    required:'Name cannot be null'
  },
 CreateDateTime:{
    type:Date,
   default:Date.now()
 }
});

mongoose.model('Role',schema);
