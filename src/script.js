function run() {
    prog = document.getElementById("program_input").value.trim();
    //clear output
    document.getElementById("program_output").innerText = ""
    
    let registers = {}
    for(let i = 4; i < 9; i++){
        registers[i.toString()] = 0
    }


    let index = 0
    let keyRegister = 4
    let cycles = 5000

    while (index < prog.length){
            cycles--;
            if (cycles < 0){
                if (confirm("Your program is taking quite a while to complete, would you like to keep it running or suspend it?")){
                    break;
                }
            }
            if(prog[index] in registers){
                keyRegister = parseInt(prog[index], 10)
            }else{
                switch(prog[index]){
                    case "0":
                        if(registers[keyRegister] == 0){
                            index += 2
                        }
                        break;
                    case "1":
                        registers[keyRegister]++;
                        break;
                    case "2":
                        registers[keyRegister]--;
                        break;
                    case "3":
                        index -= registers[keyRegister];
                        break;
                    case "9":
                        document.getElementById("program_output").innerText += "\n" + registers[keyRegister];
                        break;
                    case ".":
                        let userInput = NaN
                        while (true){
                            userInput = parseInt(prompt("Input an integer value", "0"))
                            if (!isNaN(userInput)){
                                break;
                            }
                            alert("Please submit a valid integer response");

                        }
                        registers[keyRegister] = userInput;

                        break;
                    default:
                        break;
                }
            }
        
        index++;

    }

}