function Timer(funct, delayMs, times)
{
  if(times==undefined)
  {
    times=-1;
  }
  if(delayMs==undefined)
  {
    delayMs=10;
  }
  this.funct=funct;
  var times=times;
  var timesCount=0;
  var ticks = (delayMs/10)|0;
  var count=0;
  Timer.instances.push(this);

  this.tick = function()
  {
    if(count>=ticks)
    {
      this.funct();
      count=0;
      if(times>-1)
      {
        timesCount++;
        if(timesCount>=times)
        {
          this.stop();
        }
      }
    }
    count++; 
  };

  this.stop=function()
  {
    var index = Timer.instances.indexOf(this);
    Timer.instances.splice(index, 1);
  };
}

Timer.instances=[];

Timer.ontick=function()
{
  for(var i in Timer.instances)
  {
    Timer.instances[i].tick();
  }
};

window.setInterval(Timer.ontick, 10);
				
function maikuli()
{
  clickButton('work click maikuli');
  console.log(new Date().toLocaleString()+" 卖苦力领取");
}
function duancha()
{
  clickButton('work click duancha');
  console.log(new Date().toLocaleString()+" 端茶送水领取");
}

var timer = new Timer(maikuli, 5000,-1);
var timer = new Timer(duancha, 10000,-1);