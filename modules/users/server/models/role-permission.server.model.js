/**
 * Created by jcwang on 2017/3/15.
 */
var mongoose=require('mongoose'),
  Schema=mongoose.Schema;

var schema=new Schema({
  Role:{
    type:Schema.ObjectId,
    ref:'Role'
  },
  Permission:{
    type:Schema.ObjectId,
    ref:'Permission'
  }
});

mongoose.model('RolePermission',schema);
