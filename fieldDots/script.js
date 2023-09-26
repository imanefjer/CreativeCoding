const canvas =document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle ='white';
ctx.strokeStyle ='white';
ctx.lineWidth = 10;
ctx.lineWidth = 1;
// ctx.beginPath();
// ctx.moveTo(100,200);
// ctx.lineTo(400,500);
// ctx.stroke();
class Particle{
    constructor(effect){
        this.effect = effect;
        this.x =Math.floor( Math.random()*this.effect.width);
        this.y= Math.floor(Math.random()* this.effect.height);
    }

    draw(context){
        context.fillRect(this.x, this.y, 10,10);
    }

}
class Effect{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles= 150;
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
        });
    }
}
const effect = new Effect(canvas.width, canvas.height);
effect.init();
effect.render(ctx);