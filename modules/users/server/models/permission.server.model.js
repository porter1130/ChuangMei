/**
 * Created by jcwang on 2017/3/15.
 */
var mongoose=require('mongoose'),
  Schema=mongoose.Schema;

var PermissionSchema=new Schema({
  Code:{
    type:String,
    required:'Code cannot be blank',
    trim:true
  },
  Name:{
    type:String,
    trim:true
  },
  Category:{
    type:Schema.ObjectId,
    ref:'PermissionCategory'
  },
  CreateDateTime:{
    type:Date,
    default:Date.now
  }
});

mongoose.model('Permission',PermissionSchema);
