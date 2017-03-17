/**
 * Created by jcwang on 2017/3/15.
 */
var mongoose=require('mongoose'),
  Schema=mongoose.Schema;

var schema=new Schema({
  Name:{
    type:String,
    required:'Name cannot be blank',
    trim:true
  },
  CreatedDateTime:{
    type:Date,
    default:Date.now
  }
});


mongoose.model('PermissionCategory',schema);
