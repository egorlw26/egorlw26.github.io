class Ray{
    constructor(pos, x2, y2)
    {
        this.orig = pos;
        this.dir = createVector(x2, y2);    
    }

    lookAt(x, y)
    {
        this.dir.x = x - this.orig.x;
        this.dir.y = y - this.orig.y;
        this.dir.normalize();
    }

    stretchTo(x, y)
    {
        stroke(255);
        line(this.orig.x, this.orig.y, x, y);
    }

    intersectSegment(segment)
    {
        const x1 = this.orig.x;
        const y1 = this.orig.y;
        const x2 = x1 + this.dir.x;
        const y2 = y1 + this.dir.y;

        const x3 = segment.a.x;
        const y3 = segment.a.y;
        const x4 = segment.b.x;
        const y4 = segment.b.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);        
        if(den == 0)
            return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;  
        const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if(t >= 0 && u >=0 && u <= 1)
        {
            let pt = createVector(this.orig.x + this.dir.x * t, this.orig.y + this.dir.y * t);
            return pt;
        }
        else
            return;
    }

    nearestSegment(segments)
    {
        let bestDistance = Infinity;
        let bestPoint = this.orig + this.dir * bestDistance;

        for(let segment of segments)
        {
            let pt = this.intersectSegment(segment);
            if(pt != null)
            {
                let dist = this.orig.dist(pt);
                if(dist <= bestDistance)
                {
                    bestDistance = dist;
                    bestPoint = pt;
                }
            }
        }
        return bestPoint;
    }

    show()
    {
        stroke(255);
        line(this.orig.x, this.orig.y, 
            this.orig.x + this.dir.x * 10, this.orig.y + this.dir.y * 10);
    }
}