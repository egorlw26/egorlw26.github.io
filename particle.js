class Particle
{
    constructor(viewAngle)
    {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.viewAngle = viewAngle;
        this.startAngle = 0;

        this.fillRays();       
    }

    updateViewAngle(nViewAngle)
    {
        if(this.viewAngle != nViewAngle)
        {
            this.viewAngle = nViewAngle;
            this.fillRays();
        }
        
    }

    rotate(angle)
    {
        this.startAngle += angle;
    }

    fillRays()
    {
        this.rays = [];
        for(let angle = this.startAngle; angle <= this.startAngle + this.viewAngle; angle += 1)
        {
            this.rays.push(new Ray(this.pos, 
                Math.cos(radians(angle)), Math.sin(radians(angle))));
        }
    }

    rayCasting(segments)
    {
        for(let ray of this.rays)
        {
            let pt = ray.nearestSegment(segments)[0];            
            if(pt != null)
            {
                ray.stretchTo(pt.x, pt.y);                
            }
        }
    }

    show()
    {
        stroke(255);
        ellipse(this.pos.x, this.pos.y, 0, 0);
        this.fillRays();
        for(let ray of this.rays)
            ray.show();
    }

    followMouse()
    {
        this.pos.set(mouseX, mouseY);
    }
}