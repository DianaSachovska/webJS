//task 1.2.3 - 1.2.10
var car1 = new Object();
car1.color = "black";
car1.maxSpeed = 180;
car1.driver = {
    name: "Diana Sachovska",
    category: "C",
    "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;



var car2 = {
    color: "red",
    maxSpeed: 200,
    driver: {
        name: "Diana Sachovska",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

car1.drive = function () {
    console.log("I am not driving at night");
};
car1.drive();


car2.drive = function () {
    console.log("I can drive anytime");
};
car2.drive();


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

Truck.prototype.trip = function () {
    if (!this.driver) {
        console.log("No driver assigned");
    } else {
        var message = "Driver " + this.driver.name;
        if (this.driver.nightDriving) {
            message += " drives at night";
        } else {
            message += " does not drive at night";
        }
        message += " and has " + this.driver.experience + " years of experience";
        console.log(message);
    }
};

var truck1 = new Truck("blue", 5000, 90, "Audi", "RS6");
truck1.AssignDriver("Diana Sachovska1", true, 3);

var truck2 = new Truck("red", 6000, 120, "BMW", "X5");
truck2.AssignDriver("Diana Sachovska2", false, 11);

truck1.trip();
truck2.trip();

// task 1.2.12 - 1.2.24

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Квадрат - це фігура з однаковими сторонами та усіма прямими кутами.");
    }

    length() {
        console.log("Сума довжин сторін квадрата:", 4 * this.a);
    }

    square() {
        console.log("Площа квадрата:", this.a ** 2);
    }

    info() {
        console.log("Характеристика квадрата:");
        console.log("Довжина сторони:", this.a);
        console.log("Величина кута: 90");
        this.length();
        this.square();
    }
}


class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Прямокутник - це чотирикутник з рівними протилежними сторонами та усіма прямими кутами.");
    }

    length() {
        console.log("Сума довжин сторін прямокутника:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Площа прямокутника:", this.a * this.b);
    }

    info() {
        console.log("Характеристика прямокутника:");
        console.log("Довжина:", this.a);
        console.log("Ширина:", this.b);
        console.log("Величина кута: 90");
        this.length();
        this.square();
    }
}


class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Ромб - це чотирикутник з усіма сторонами однакової довжини.");
    }
    length() {
        console.log("Сума довжин сторін ромба:", 4 * this.a);
    }

    square() {
        console.log("Площа ромба:",  (this.a ** 2) * Math.sin(this.beta * Math.PI / 180));
    }

    info() {
        console.log("Характеристика ромба:");
        console.log("Довжина сторони:", this.a);
        console.log("Тупий кут (alpha):", this.alpha, "градусів");
        console.log("Гострий кут (beta):", this.beta, "градусів");
        this.length();
        this.square();
    }
}


class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Паралелограм - це чотирикутник, у якого протилежні сторони паралельні та рівні і протилежні кути рівні.");
    }
    length() {
        console.log("Сума довжин сторін паралелограма:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Площа паралелограма:", this.a * this.b * Math.sin(this.alpha * Math.PI / 180));
    }
    info() {
        console.log("Характеристика паралелограма:");
        console.log("Довжина:", this.a);
        console.log("Ширина:", this.b);
        console.log("Тупий кут (alpha):", this.alpha, "градусів");
        console.log("Гострий кут (beta):", this.beta, "градусів");
        this.length();
        this.square();
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

const square = new Square(5);
square.info();

const rectangle = new Rectangle(4, 6);
rectangle.info();

const rhombus = new Rhombus(5, 60, 120);
rhombus.info();

const parallelogram = new Parallelogram(4, 6, 60, 120);
parallelogram.info();

// task 1.2.25 - 1.2.30
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const triangle1 = Triangular();
const triangle2 = Triangular(6, 8, 10);
const triangle3 = Triangular(9, 12, 15);

console.log(triangle1);
console.log(triangle2);
console.log(triangle3);


function PiMultiplier(number) {
    return function () {
        return Math.PI * number;
    };
}

const Pi2 = PiMultiplier(2);
const Pi2_3 = PiMultiplier(2 / 3);
const Pi1_2 = PiMultiplier(1 / 2);

console.log(Pi2());
console.log(Pi2_3());
console.log(Pi1_2());


function Painter(color) {
    return function (obj) {
        if (obj.type !== undefined) {
            obj.color = color;
            console.log(`Object type: ${obj.type}, Color: ${obj.color}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", avgSpeed: 90, "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);

console.log(obj1)
console.log(obj2)
console.log(obj3)
