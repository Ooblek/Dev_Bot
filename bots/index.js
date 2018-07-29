const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token: 'xoxb-406125847410-406680745922-YxY4nJulzAcgAqKPiqepkKal',
	name: 'devbot'
});

var rules = ' \nRules of SelfDev\n 1. Be respectful towards the community members and appreciate that others may have an opinion different from yours.\n2. No Spamming.\n3. Before heading towards a new project contact core members for guidance and support\n4. Try contributing to the community as much as possible and share your knowledge. Do not hold back in sharing your knowledge – its likely someone will find it inserting or useful.\n5. Communication language must be in English. No other languages are accepted on the site.\n6. Mobile numbers must remain discreet for security purposes.\n\n\nSPREAD THE WORD!\nDespite this being an IT community, your Non-Tech related skills will also be appreciated.';

//start handles
bot.on('start',()=> {
	bot.postMessageToChannel('selfdev','Dev_bot has started');
});


//error handler

bot.on('error', (err) => console.log(err));

bot.on('message', function(data) {
	var me = this;
	if('team_join' == data.type)
	{

		me.postMessageToChannel('selfdev',"Welcome "+data.user.name+" "+rules);
		console.log(data.user.name+" Has joined");
	}


});

bot.on('message', data =>{
	if(data.type!='message'){
		return;
	}

	messageProcess(data.text);

});

function messageProcess(message)
{
	if(message.includes(' rules'))
	{
		bot.postMessageToChannel('selfdev',rules);
	}
	if(message.includes(' xkcd'))
	{
		xkcd();
	}
	if(message.includes(' yesorno'))
	{
		yesno();
	}


}

function xkcd()
{
	var r2 =  (Math.floor(Math.random() * (2400 - 2 + 1)) +2);
	rand=r2.toString();
	console.log(rand)
	axios.get('https://xkcd.com/'+rand+'/info.0.json').then(res => {
		const title = res.data.safe_title;
		const imgUrl = res.data.img;
		bot.postMessageToChannel('selfdev',title+"\n"+imgUrl);
	})
}

function yesno()
{
	axios.get('https://yesno.wtf/api/').then(res => {
		const ans = res.data.answer;
		bot.postMessageToChannel('selfdev',ans);
	})
}
