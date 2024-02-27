function triangle(value1, type1, value2, type2) {
    if (value1 <= 0 || value2 <= 0) {
        console.log("Zero or negative input");
        return "failed";
    }

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "hypotenuse") {
        a = value1;
        c = value2;
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = 90 - alpha;
    } else if (type1 === "hypotenuse" && type2 === "leg") {
        c = value1;
        a = value2;
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = 90 - alpha;
    } else if (type1 === "leg" && type2 === "adjacent angle") {
        a = value1;
        alpha = value2;
        beta = 90 - alpha;
        c = a / Math.sin(beta * (Math.PI / 180));
        b = Math.sqrt(c * c - a * a);
    } else if (type1 === "adjacent angle" && type2 === "leg") {
        alpha = value1;
        a = value2;
        beta = 90 - alpha;
        c = a / Math.sin(beta * (Math.PI / 180));
        b = Math.sqrt(c * c - a * a);
    } else if (type1 === "leg" && type2 === "opposite angle") {
        a = value1;
        beta = value2;
        alpha = 90 - beta;
        c = a / Math.sin(beta * (Math.PI / 180));
        b = Math.sqrt(c * c - a * a);
    } else if (type1 === "opposite angle" && type2 === "leg") {
        beta = value1;
        a = value2;
        alpha = 90 - beta;
        c = a / Math.sin(beta * (Math.PI / 180));
        b = Math.sqrt(c * c - a * a);
    } else if (type1 === "hypotenuse" && type2 === "angle") {
        alpha = value2
        beta = 90 - value2
        c = value1
        a = c * Math.sin(alpha * (Math.PI / 180))
        b = c * Math.sin(beta * (Math.PI / 180))
    }
    else if (type1 === "angle" && type2 === "hypotenuse") {
        alpha = value1
        beta = 90 - value1
        c = value2
        a = c * Math.sin(alpha * (Math.PI / 180))
        b = c * Math.sin(beta * (Math.PI / 180))
    }
    else if (type1 === "leg" && type2 === "leg") {
        a = value1
        b = value2
        c = Math.sqrt(a * a + b * b)
        alpha = Math.asin(a / c) * (180 / Math.PI)
        beta = Math.asin(b / c) * (180 / Math.PI)

    }
    else {
        console.log("Некоректна комбінація типів аргументів.");
        return "failed";
    }

    if (alpha <= 0 || beta <= 0 || alpha >= 90 || beta >= 90) {
        console.log("Введені значення не утворюють прямокутний трикутник.");
        return "failed";
    }

    // Виведення результатів
    console.log("a =", a);
    console.log("b =", b);
    console.log("c =", c);
    console.log("alpha =", alpha);
    console.log("beta =", beta);

    return "success";
}
