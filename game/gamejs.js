var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var x=c.width/2;
var y=c.height-30;
var dx=2;
var dy=-2;
var ballradius=10;
var paddleheight=10;
var paddlewidth=65;
var paddlex=(c.width-paddlewidth)/2;
var rightpressed=false;
var leftpressed=false;
var brickcolcount=5;
var brickrowcount=3;
var brickcount=brickrowcount*brickcolcount;
var brickwidth=75;
var brickheight=20;
var brickpadding=10;
var bricktopoff=30;
var brickhoroff=30;
var bricks=[];
var score=0;
var lives=3;
for (col=0;col<brickcolcount;col++)
{
	bricks[col]=[];
	for(row=0;row<brickrowcount;row++)
		bricks[col][row]={ x: 0, y:0 , status : 1};
}
function drawbricks()
{
	for( col=0;col<brickcolcount;++col)
	{
		for(row=0;row<brickrowcount;++row)
		{
		if (bricks[col][row].status==1)
		{
		var brickx=brickhoroff+(col*(brickwidth+brickpadding));
		var bricky=bricktopoff+(row*(brickheight+brickpadding));
		bricks[col][row].x=brickx;
		bricks[col][row].y=bricky; 
		ctx.beginPath();
		ctx.rect(brickx,bricky,brickwidth,brickheight);
		ctx.fillStyle="#0095DD";
		ctx.fill();
		ctx.closePath();
		}}
	}
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
function keyDownHandler(e)
{
	if (e.keyCode==39)
		{rightpressed=true;}
	else if (e.keyCode==37)
		{leftpressed=true;}


}
function keyUpHandler(e)
{
	if (e.keyCode==39)
		{rightpressed=false;}
	else if (e.keyCode==37)
		{leftpressed=false;}
}
function collisiondetect()
{
	for( col=0;col<brickcolcount;++col)
	{
		for(row=0;row<brickrowcount;++row)
		{
			var b=bricks[col][row];
			if (b.status==1)
			{

				if ( x>b.x && x<b.x+brickwidth && y>b.y && y<b.y+brickheight)
				{dy=-dy;b.status=0;score++;
				if (score==brickcount)
				{
					alert("You won!!!");
					document.location.reload();
				}
				}
			}
		}
	}
}
function drawscore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score: "+score,8,20);
}
function drawlives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives: "+lives,c.width-60,20);
}
function drawpaddle()
{
	ctx.beginPath()
	ctx.rect(paddlex,c.height-paddleheight,paddlewidth,paddleheight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function drawball()
{
	
	ctx.beginPath();
	ctx.arc(x,y,ballradius,0,2*Math.PI);
	ctx.fillStyle="blue";
	ctx.fill();
	ctx.closePath();
}
function draw()
{
	ctx.clearRect(0,0,c.width,c.height);
	drawscore();
	drawlives();
	drawbricks();
	drawball();
	drawpaddle();
	collisiondetect();
	
	if (x+dx>c.width-ballradius || x+dx<ballradius)
		dx=-dx;
	if (y+dy<ballradius)
		dy=-dy;
	else if (y+dy+ballradius>c.height)
	{
		if (x>paddlex && x<paddlex+paddlewidth)
			dy=-dy;
		else
		{
		lives--;
		if (!lives)
		{
		alert("Game Over!!!");
		document.location.reload();
		}
		else
		{
			x=c.width/2;
			y=c.height-30;
			dx=2;
			dy=-2;
			paddlex=(c.width-paddlewidth)/2;
		}
		}
	}

	if (rightpressed && paddlex<c.width)
		paddlex+=7;
	else if (leftpressed && paddlex>0)
		paddlex-=7;
	x+=dx;
	y+=dy;
}

setInterval(draw,20);
