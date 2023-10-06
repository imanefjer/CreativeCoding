const canvas =document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle ='black';
ctx.strokeStyle ='blue';
ctx.lineWidth = 1;
class Particle{
    constructor(effect){
        this.effect = effect;
        this.x =Math.floor( Math.random()*this.effect.width);
        this.y= Math.floor(Math.random()* this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier  = Math.floor(Math.random() * 5 +1);
        this.angle = 0;
        this.maxLength =Math.floor(Math.random * 200 +10);
        this.history = [{x:this.x, y:this.y}];

    }

    draw(context){
        // context.fillRect(this.x, this.y, 10,10);
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i =0; i <this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
        
        }
        context.stroke();
    }
    update(){
        let x = Math.floor(this.x /  this.effect.cellsize);
        let y = Math.floor(this.y /  this.effect.cellsize);
        let index = x + y * this.effect.cols;
        this.angle = this.effect.flowfield[index];
        this.speedX = Math.cos(this.angle);
        this.speedY = Math.sin(this.angle);

        this.x += this.speedX * this.speedModifier;
        this.y += this.speedY * this.speedModifier;

        this.history.push({x:this.x, y:this.y})
        if(this.history.length > this.maxLength){
            this.history.shift();
        }
    }
}
class Effect{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles= 1000;
        this.cellsize = 20;
        this.rows;
        this.cols;
        this.flowfield = [];
        this.curve= 0.5;
        this.zoom = 0.2;
        this.init();
    }
    init(){

        this.rows = Math.floor(this.height / this.cellsize);
        this.cols = Math.floor(this.width / this.cellsize);
        this.flowfield = [];
        for (let y= 0; y < this.rows; y++){
            for(let x = 0; x < this.cols; x++){
                let angle = (Math.cos(x*this.zoom)+Math.sin(y*this.zoom)) * this.curve; 
                this.flowfield.push(angle);
            }
            
        }

        for (let i =0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
        this.particles.push(new Particle(this));
    }
    render(ctx){
        this.particles.forEach(particle=>{
            particle.draw(ctx);
            particle.update();

        });
    }
}
const effect = new Effect(canvas.width, canvas.height);
console.log(effect);
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(animate);
}
animate();
let isBlue = false; 
document.addEventListener("click", function(event) {
  if (isBlue) {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'blue';
    canvas.style.backgroundColor = 'black';
  } else {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'black';
    canvas.style.backgroundColor = 'blue';
  }

  isBlue = !isBlue;
});