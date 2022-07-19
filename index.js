let number = document.getElementById("number")

const OPERATIONS = {  
    ADD: "+",
    SUB: "-",
    MULTI: "*",
    DIV: "/",
    MOD: "`",
    POW: "^",
    NOT: '!',
    NEYTRAL: ""
}

const KEYS = {
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    ESCAPE: 'Escape'
}

let A, B, Operation
let display_text = "0"
let loop = false
let Operations = "+-*/`^!".split("")
let currentOperation = OPERATIONS.NEYTRAL
let rewrite = false

window.addEventListener("keydown", (e) => {
    const el = document.getElementById(`btn${e.key}`)
    if (el)
        el.classList.add("on")
    if (e.key >= 0 && e.key <= 9) {
        if (display_text === "0" || rewrite) {
            rewrite = false
            display_text = ""
        }
        display_text += e.key
        render()
    }
    if (e.key === KEYS.BACKSPACE) {
        if (display_text !== "0")
            display_text = display_text.substring(0, display_text.length - 1)
        if (display_text === "") display_text = "0"
        render()
    }
    if (e.key === '.') {
        if (!display_text.includes('.')) display_text += '.'
        render()
    }
    if (Operations.includes(e.key)) {
        currentOperation = e.key
        A = parseFloat(display_text)
        rewrite = true
        loop = false
    }
    if (e.key === KEYS.ENTER) {
        if (!loop) {
            B = parseFloat(display_text);
            loop = true
        } else
            A = parseFloat(display_text)
        switch (currentOperation) {
            case OPERATIONS.ADD:
                display_text = A + B
                break
            case OPERATIONS.SUB:
                display_text = A - B
                break
            case OPERATIONS.MULTI:
                display_text = A * B
                break
            case OPERATIONS.DIV:
                if (B == 0) {
                    display_text = "Can't div by zero!";
                    rewrite = true
                } else display_text = A / B
                break
            case OPERATIONS.MOD:
                display_text = A % B
                break
            case OPERATIONS.POW:
                display_text = Math.pow(A, B)
        }
        rewrite = true
        render()
    }
    if (e.key === '!') {
        display_text = -parseFloat(display_text)
        render()
    }
    if (e.key === KEYS.ESCAPE) {
        display_text = '0'
        rewrite = false
        currentOperation = OPERATIONS.NEYTRAL
        render()
    }
})

window.addEventListener("keyup", (e) => {
    const el = document.getElementById(`btn${e.key}`)
    if (el)
        el.classList.remove("on")
})

const render = () => {
    number.value = display_text
}

let gool = 3
// adding comment