function setup() {
    createCanvas(700, 500)
    background(0)
    noStroke()
    translate(width / 2, height / 2)
    db = new DarkBramble(20)
    db.Generate_the_bramblesList()
}

setInterval(function() {
    db.Traverse_the_List()
    db.Change_the_List()
}, 50)


class DarkBramble {
    constructor(bramblesNum) {
        this.tn = bramblesNum
        this.bramblesList = new Array()
    }

    Generate_the_bramblesList() {
        for (let i = 0; i < this.tn; i++) {
            let wid = random(Array.from({ length: 4 }, (item, index) => index + 5))
            let bramble = new Array()
            for (let j = 0; j < (wid * 2 - 2); j++) {
                let angle = random(TWO_PI)
                let len = random(100)
                let section = [angle, len, wid - 0.5 * j]
                bramble.push(section)
            }
            this.bramblesList.push(bramble)
        }
    }

    Change_the_List() {
        this.bramblesList.shift()
        let wid = random(Array.from({ length: 4 }, (item, index) => index + 5))
        let bramble = new Array()
        for (let j = 0; j < (wid * 2 - 2); j++) {
            let angle = random(TWO_PI)
            let len = random(100)
            let section = [angle, len, wid - 0.5 * j]
            bramble.push(section)
        }
        this.bramblesList.push(bramble)
    }

    Traverse_the_List() {
        for (let bramble of this.bramblesList) {
            push()
            for (let section of bramble) {
                fill(
                    max((
                        (((this.bramblesList.indexOf(bramble) - 1) / this.bramblesList.length)) * 255 +
                        (1 - ((bramble.indexOf(section) + bramble.length - 2) / bramble.length)) * 150), 0)
                )
                rotate(section[0])
                rect(
                    0, -section[2] / 2, section[1], section[2]
                )
                translate(section[1], 0)
                ellipse(0, 0, section[2])
            }
            pop()
        }
    }
}