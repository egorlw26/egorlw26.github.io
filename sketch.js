let p;
let testRay;
let segments;
let viewAngleSlider;
let numberOfReflectionsSlider;
let rotationButtonLeft;
let rotationButtonRight;
let angleSliderText;
let reflSliderText;

function setup()
{
    createCanvas(400, 400);

    viewAngleSlider = createSlider(0, 360, 45, 1);
    viewAngleSlider.position(20, 20);
    viewAngleSlider.style('width', '120px');

    numberOfReflectionsSlider = createSlider(0, 20, 0, 1);
    numberOfReflectionsSlider.position(20, 40);
    numberOfReflectionsSlider.style('width', '120px');

    rotationButtonLeft = createButton("LEFT");
    rotationButtonLeft.position(width/2 - rotationButtonLeft.width, height - 20);

    rotationButtonRight = createButton("RIGHT");
    rotationButtonRight.position(rotationButtonLeft.x + rotationButtonLeft.width, height - 20);

    p = new Particle(viewAngleSlider.value());

    rotationButtonLeft.mousePressed(() => {p.rotate(-10);});
    rotationButtonRight.mousePressed(() => {p.rotate(10);});

    segments = [];
    
    addBorders();


    for(let i = 0; i < 10; ++i)
    {
        const x1 = 50 + Math.random() * width;
        const y1 = 50 + Math.random() * height;
        const x2 = 50 + Math.random() * width;
        const y2 = 50 + Math.random() * height;

        segments.push(new Segment(x1, y1, x2, y2));
    }    
}

function draw()
{
    background(0);

    fill(255);
    angleSliderText = text("view angle", viewAngleSlider.x + viewAngleSlider.width,
     viewAngleSlider.y + 2);
    reflSliderText = text("reflections", numberOfReflectionsSlider.x + 
    numberOfReflectionsSlider.width, numberOfReflectionsSlider.y + 2);

    for(let segment of segments)
        segment.show();

    p.show();
    p.followMouse();
    let angle = viewAngleSlider.value();
    p.updateViewAngle(angle);
    p.rayCasting(segments);

    for(ray of p.rays)
    {
        ray.showReflections(segments, numberOfReflectionsSlider.value());
    }

}

function keyPressed()
{
    if(keyCode === LEFT_ARROW)
    {
        p.rotate(-10);
    }
    if(keyCode === RIGHT_ARROW)
    {
        p.rotate(10);
    }
}

function addBorders()
{
    segments.push(new Segment(0, 0, width, 0));
    segments.push(new Segment(0, 0, 0, height));
    segments.push(new Segment(width, height, width, 0));
    segments.push(new Segment(width, height, 0, height));
}