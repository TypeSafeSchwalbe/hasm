
const HasmType = {
    Number: "number",
    Register: "register",
    Block: "block"
};

class HasmAssembler {
    constructor() {
        this.instructions = {};
        this.addInstruction(
            "mov",
            [
                [HasmType.Number, HasmType.Register],
                [HasmType.Register]
            ],
            (machine, value, dest) => {
                if (value.isRegister()) { value = machine.readRegister(value); }
                machine.writeRegister(dest, value);
            }
        );
    }

    addInstruction(name, argTypes, handler) {
        this.instructions[name] = { name, argTypes, handler };
    }

    parseWords(src) {
        let srcSplit = src.split(/(\s+)/);
        let line = 0;
        let charIndex = 0;
        let words = [];
        for (const wordRaw of srcSplit) {
            if (!(/\s+/.test(wordRaw))) {
                words.push({ text: wordRaw, index: charIndex, line });
            }
            charIndex += wordRaw.length;
            line += wordRaw.split(/\r\n|\r|\n/).length - 1;
        }
        return words;
    }

    parseWord(text) {
        let type;
        let value;
        if (text === "{") {
            type = "BlockOpen";
            value = null;
        }
        else if (text === "}") {
            type = "BlockClose";
            value = null;
        }
        else if (text.startsWith("[") && text.endsWith("]") && text.length >= 3) {
            type = "Register";
            value = text.substring(1, text.length - 1);
        }
        else if (/^[a-zA-Z]+$/.test(text)) {
            type = "Instruction";
            value = text;
        }
        else if (/^\d+(\.\d+)?$/.test(text)) {
            type = "Number";
            value = parseFloat(text);
        }
        else {
            type = "Unknown";
            value = text;
        }
        return { type, value };
    }

    createProgramInstruction(instruction, args) {
        return { handler: instruction.handler, args };
    }

    assemble(src) {
        let program = [];

        let words = this.parseWords(src);
        console.log(words);

        while (words.length > 0) {
            let instructionWord = words.splice(0, 1)[0];
            let instructionName = this.parseWord(instructionWord.text);
            if (instructionName.type !== "Instruction") {
                return new HasmError(
                    `Expected the name of an instruction, got '${instructionWord.text}' instead`,
                    instructionWord.index, instructionWord.line
                );
            }
            if (!(instructionWord.text in this.instructions)) {
                return new HasmError(
                    `'${instructionWord.text}' is not a known instruction`,
                    instructionWord.index, instructionWord.line
                );
            }
            let instruction = this.instructions[instructionWord.text];
            let args = [];
            while (args.length < instruction.argTypes.length) {
                // TODO: ARGUMENT PARSING :D
            }
        }

        return new HasmProgram(program);
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
    constructor(instructions) {
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
        for (const instruction of program.instructions) {
            instruction.handler(this, ...instruction.args);
        }
    }

    writeRegister(register, value) {
        if (!(register instanceof HasmValue) || !register.isRegister) { throw new Error("provided register is not a HasmValue of type Register"); }
        if (!(value instanceof HasmValue) || !value.isNumber()) { throw new Error("provided value is not a HasmValue of type Number"); }
        this.registers[register.getValue()] = value.getValue();
    }

    readRegister(register) {
        if (!(register instanceof HasmValue) || !register.isRegister) { throw new Error("provided register is not a HasmValue of type Register"); }
        return new HasmValue(HasmType.Number, this.registers[register.getValue()]);
    }
}