const Storage = {
	keys:{
		balance:'balance',
		wins:'wins',
		loses:'loses',
		streaks:'streaks'
	},
	streaks:{

	},
	wins:0,
	loses:0,
	init(){
		let str = this.get(this.keys.streaks);
		console.log('init',JSON.parse(str));
		if(str)this.streaks = JSON.parse(str);

		str = this.get(this.keys.wins);
		if(str)this.wins = Number(str);

		str = this.get(this.keys.loses);
		if(str)this.loses = Number(str);
	},
	get(key){
		let content = localStorage.getItem(key);
		return content ;
	},
	set(key, value){
		localStorage.setItem(key,value);
	},
	setStreak(key){
		if(this.streaks[key] == undefined)this.streaks[key] = 0;
		this.streaks[key]++;
		this.set(this.keys.streaks,JSON.stringify(this.streaks));
	},
	setWins(count,loses){
		this.wins+=count;
		this.loses+=loses;
		this.set(this.keys.wins,this.wins);
		this.set(this.keys.loses,this.loses);
	},
	setBalance(balance){
		this.set(this.keys.balance,balance);
	},
	getStreaks(){
		let str = this.get(this.keys.streaks);
		if(!str) return;
		let json = JSON.parse(str);
		return json;
	}
}
Storage.init();