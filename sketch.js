let p;
let segments;

function setup()
{
    segments = [];
    createCanvas(500, 500);

    drawBorders();

    for(let i = 0; i < 5; ++i)
    {
        const x1 = 50 + Math.random() * width;
        const y1 = 50 + Math.random() * height;
        const x2 = 50 + Math.random() * width;
        const y2 = 50 + Math.random() * height;

        segments.push(new Segment(x1, y1, x2, y2));
    }
    p = new Particle();
}

function draw()
{
    background(0);
    p.show();
    p.followMouse();

    for(let segment of segments)
        segment.show();

    for(let ray of p.rays)
    {
        let pt = ray.nearestSegment(segments);
        if(pt != null)
            ray.stretchTo(pt.x, pt.y);
    }
}

function drawBorders()
{
    segments.push(new Segment(0, 0, width, 0));
    segments.push(new Segment(0, 0, 0, height));
    segments.push(new Segment(width, height, width, 0));
    segments.push(new Segment(width, height, 0, height));
}