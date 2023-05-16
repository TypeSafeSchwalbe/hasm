
const HasmType = {
    Number: "number",
    Register: "register",
    Block: "block"
};

class HasmAssembler {
    constructor() {
        this.instructions = {};
        this.registers = [];
    }

    addInstruction(name, argDescriptions, argTypes, handler) {
        if(typeof name !== "string") { throw new Error("instruction name is not a string"); }
        if(!(argDescriptions instanceof Array)) { throw new Error("argument descriptions are not an array"); }
        for(const argDescription of argDescriptions) { if(typeof argDescription !== "string") { throw new Error("one of the argument descriptions is not a string"); } }
        if(!(argTypes instanceof Array)) { throw new Error("argument types are not an array"); }
        for(const argType of argTypes) {
            if(!(argType instanceof Array)) { throw new Error("possible types for argument are not an array"); }
            if(argType.length === 0) { throw new Error("no possible types for argument"); }
            for(const argTypeV of argType) { if(!Object.values(HasmType).includes(argTypeV) ) { throw new Error("one of the possible types for an argument is not a type"); } }
        }
        if(argDescriptions.length != argTypes.length) { throw new Error("argument description count does not match argument types count"); }
        if(typeof handler !== "function") { throw new Error("handler is not a function"); }
        this.instructions[name] = { name, argDescriptions, argTypes, handler };
    }

    addMoveInstruction() {
        this.addInstruction(
            "mov",
            ["the value", "the register to store the value in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, value, dest) => {
                if(value.isRegister()) { value = machine.readRegister(value); }
                machine.writeRegister(dest, value);
            }
        );
    }

    addArithmeticInstructions() {
        this.addInstruction(
            "add",
            ["the first thing to add", "the second thing to add", "the register to store the result in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, a, b, dest) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                machine.writeRegister(dest, new HasmValue(HasmType.Number, a.getValue() + b.getValue()));
            }
        );
        this.addInstruction(
            "sub",
            ["the thing to subtract from", "the thing to subtract", "the register to store the result in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, a, b, dest) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                machine.writeRegister(dest, new HasmValue(HasmType.Number, a.getValue() - b.getValue()));
            }
        );
        this.addInstruction(
            "mul",
            ["the first thing to multiply", "the second thing to multiply", "the register to store the result in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, a, b, dest) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                machine.writeRegister(dest, new HasmValue(HasmType.Number, a.getValue() * b.getValue()));
            }
        );
        this.addInstruction(
            "div",
            ["the thing to divide", "the thing to divide by", "the register to store the result in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, a, b, dest) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                machine.writeRegister(dest, new HasmValue(HasmType.Number, a.getValue() / b.getValue()));
            }
        );
        this.addInstruction(
            "mod",
            ["the thing to divide", "the thing to divide by", "the register to store the remainder in"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Register]],
            (machine, a, b, dest) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                machine.writeRegister(dest, new HasmValue(HasmType.Number, a.getValue() % b.getValue()));
            }
        );
    }

    addConditionalInstructions() {
        this.addInstruction(
            "ieq",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the compared things are equal"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() === b.getValue()) { machine.run(body.getValue()); }
            }
        );
        this.addInstruction(
            "ine",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the compared things are not equal"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() !== b.getValue()) { machine.run(body.getValue()); }
            }
        );
        this.addInstruction(
            "ilt",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the first thing is less than the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() < b.getValue()) { machine.run(body.getValue()); }
            }
        );
        this.addInstruction(
            "igt",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the first thing is greater than the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() > b.getValue()) { machine.run(body.getValue()); }
            }
        );
        this.addInstruction(
            "ile",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the first thing is less than or equal to the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() <= b.getValue()) { machine.run(body.getValue()); }
            }
        );
        this.addInstruction(
            "ige",
            ["the first thing to compare", "the second thing to compare", "the instructions to execute if the first thing is greater than or equal to the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                if(a.isRegister()) { a = machine.readRegister(a); }
                if(b.isRegister()) { b = machine.readRegister(b); }
                if(a.getValue() >= b.getValue()) { machine.run(body.getValue()); }
            }
        );
    }

    addLoopInstructions() {
        this.addInstruction(
            "weq",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the compared things are equal"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() === bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
        this.addInstruction(
            "wne",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the compared things are not equal"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() !== bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
        this.addInstruction(
            "wlt",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the first thing is less than the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() < bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
        this.addInstruction(
            "wgt",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the first thing is greater than the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() > bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
        this.addInstruction(
            "wle",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the first thing is less than or equal to the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() <= bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
        this.addInstruction(
            "wge",
            ["the first thing to compare", "the second thing to compare", "the instructions to repeat while the first thing is greater than or equal to the second"],
            [[HasmType.Number, HasmType.Register], [HasmType.Number, HasmType.Register], [HasmType.Block]],
            (machine, a, b, body) => {
                while(true) {
                    let aVal = a;
                    if(aVal.isRegister()) { aVal = machine.readRegister(aVal); }
                    let bVal = b;
                    if(bVal.isRegister()) { bVal = machine.readRegister(bVal); }
                    if(aVal.getValue() >= bVal.getValue()) {
                        machine.run(body.getValue());
                        continue;
                    }
                    break;
                }
            }
        );
    }

    addSayInstruction() {
        this.addInstruction(
            "say",
            ["the thing to say"],
            [[HasmType.Number, HasmType.Register]],
            (machine, thing) => {
                if(thing.isRegister()) { thing = machine.readRegister(thing); }
                console.log(thing.getValue());
            }
        );
    }

    clearInstructions() {
        this.instructions = {};
    }

    addRegisters(...names) {
        for(const name of names) { if(typeof name !== "string") { throw new Error("register name is not a string"); } }
        this.registers = this.registers.concat(names);
    }

    clearRegisters() {
        this.registers = [];
    }

    assemble(src) {
        const parseWords = (src) => {
            let srcSplit = src.split(/(\s+)/);
            let line = 0;
            let charIndex = 0;
            let words = [];
            let inComment = false;
            for(const wordRaw of srcSplit) {
                if(wordRaw.startsWith("#")) { inComment = true; }
                if(!(/\s+/.test(wordRaw)) && wordRaw.length > 0 && !inComment) {
                    words.push({ text: wordRaw, index: charIndex, line });
                }
                charIndex += wordRaw.length;
                line += wordRaw.split(/\n/).length - 1;
                if(wordRaw.includes("\n")) { inComment = false; }
            }
            return words;
        };

        const parseWord = (text) => {
            let type;
            let value;
            if(text === "{") { type = "BlockOpen"; value = null; }
            else if(text === "}") { type = "BlockClose"; value = null; }
            else if(text.startsWith("[") && text.endsWith("]") && text.length >= 3) { type = "Register"; value = text.substring(1, text.length - 1); }
            else if(/^[a-zA-Z]+$/.test(text)) { type = "Instruction"; value = text; }
            else if(/^\d+(\.\d+)?$/.test(text)) { type = "Number"; value = parseFloat(text); }
            else { type = "Unknown"; value = text; }
            return { type, value };
        };

        const constructProgramInstruction = (instruction, args) => {
            return { handler: instruction.handler, args };
        };

        const wordsToProgram = (words) => {
            let program = [];

            while(words.length > 0) {
                let instructionWord = words.splice(0, 1)[0];
                let instructionName = parseWord(instructionWord.text);
                if(instructionName.type !== "Instruction") { return new HasmError(
                    `Expected the name of an instruction, got '${instructionWord.text}' instead`,
                    instructionWord.index, instructionWord.line
                ); }
                if(!(instructionWord.text in this.instructions)) { return new HasmError(
                    `'${instructionWord.text}' is not a known instruction`,
                    instructionWord.index, instructionWord.line
                ); }
                let instruction = this.instructions[instructionWord.text];

                let args = [];
                let argumentWord = instructionWord;
                let argumentParsed = instructionName;
                while(args.length < instruction.argTypes.length) {
                    const errorUnexpected = (displayCurrentWord) => {
                        let expected = instruction.argTypes[args.length][0];
                        for(const expectation of instruction.argTypes[args.length].slice(1)) { expected += " / " + expectation; }
                        let got = displayCurrentWord? "'" + argumentWord.text + "'" : "nothing";
                        return new HasmError(
                            `instruction '${instruction.name}' expected ${instruction.argDescriptions[args.length]} (${expected}), got ${got} instead`,
                            argumentWord.index, argumentWord.line
                        );
                    }

                    if(words.length === 0) { return errorUnexpected(false); }
                    argumentWord = words.splice(0, 1)[0];
                    argumentParsed = parseWord(argumentWord.text);

                    let givenArgumentValue;
                    if(argumentParsed.type === "BlockOpen") {
                        let contentWords = [];
                        let scope = 1;
                        while(true) {
                            if(words.length === 0) { return new HasmError(
                                `block opened using '{', but never closed using '}'`,
                                argumentWord.index, argumentWord.line
                            ); }
                            let currentWord = words.splice(0, 1)[0];
                            let currentParsed = parseWord(currentWord.text);
                            if(currentParsed.type === "BlockOpen") {
                                scope += 1;
                            }
                            if(currentParsed.type === "BlockClose") {
                                scope -= 1;
                                if(scope === 0) { break; }
                            }
                            contentWords.push(currentWord);
                        }
                        let blockProgram = wordsToProgram(contentWords);
                        if(blockProgram instanceof HasmError) { return blockProgram; }
                        givenArgumentValue = new HasmValue(HasmType.Block, blockProgram);
                    }
                    else if(argumentParsed.type === "Register") {
                        if(!this.registers.includes(argumentParsed.value)) { return new HasmError(
                            `'${argumentParsed.value}' is not a known register`,
                            argumentWord.index, argumentWord.line
                        ); }
                        givenArgumentValue = new HasmValue(HasmType.Register, argumentParsed.value);
                    }
                    else if(argumentParsed.type === "Number") { givenArgumentValue = new HasmValue(HasmType.Number, argumentParsed.value); }
                    else { return errorUnexpected(true); }

                    if(!instruction.argTypes[args.length].includes(givenArgumentValue.getType())) { return errorUnexpected(true); }
                    args.push(givenArgumentValue);
                }

                program.push(constructProgramInstruction(instruction, args));
            }

            return new HasmProgram(program);
        };

        return wordsToProgram(parseWords(src));
    }
}

class HasmError {
    constructor(message, index, line) {
        this.message = message;
        this.index = index;
        this.line = line;
    }

    getMessage() { return this.message; }
    getIndex() { return this.index; }
    getLine() { return this.line; }
}

class HasmProgram {
    constructor(instructions, registers) {
        this.instructions = instructions;
    }
}

class HasmValue {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    isNumber() { return this.type == HasmType.Number; }
    isRegister() { return this.type == HasmType.Register; }
    isBlock() { return this.type == HasmType.Block; }

    getType() { return this.type; }
    getValue() { return this.value; }
}

class HasmMachine {
    constructor() {
        this.registers = {};
    }

    run(program) {
        for(const instruction of program.instructions) {
            instruction.handler(this, ...instruction.args);
        }
    }

    writeRegister(register, value) {
        if(!(register instanceof HasmValue) || !register.isRegister) { throw new Error("provided register is not a HasmValue of type Register"); }
        if(!(value instanceof HasmValue) || !value.isNumber()) { throw new Error("provided value is not a HasmValue of type Number"); }
        this.registers[register.getValue()] = value.getValue();
    }

    readRegister(register) {
        if(!(register instanceof HasmValue) || !register.isRegister) { throw new Error("provided register is not a HasmValue of type Register"); }
        if(!(register.getValue() in this.registers)) { this.registers[register.getValue()] = 0; }
        return new HasmValue(HasmType.Number, this.registers[register.getValue()]);
    }
}