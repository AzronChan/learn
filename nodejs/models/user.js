function user(id,name,age){
	this.id = id;
	this.name = name;
	this.age = age;
	this.fn = function(){
		console.log(this.name + '在看视频')
	}
}

module.exports = user;