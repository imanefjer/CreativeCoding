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
        this.speedX = Math.random()*10-2.5;
        this.speedY = Math.random()*5-2.5;
        this.history = [{x:this.x, y:this.y}]
    }

    draw(context){
        context.fillRect(this.x, this.y, 10,10);
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i =0; i <this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
        
        }
        context.stroke();
    }
    update(){
        this.x += this.speedX+Math.random()*15 -7.5;
        this.y += this.speedY+Math.random()*15 -7.5;
        this.history.push({x:this.x, y:this.y})
    }
}
class Effect{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles= 200;
        this.init();
    }
    init(){
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

  // Invert the state for the next click
  isBlue = !isBlue;
});