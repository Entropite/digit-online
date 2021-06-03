function run() {

    prog = document.getElementById("program_input").value;
    //process inputted program
    prog = prog.replaceAll("\n", "").replaceAll(" ", "");
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
                var suspend = confirm("Your program is taking quite a while to complete, would you like to suspend it?")
                if (suspend){
                    break;
                }else{
                    cycles = 5000
                }
            }
            if(prog[index] in registers){
                keyRegister = parseInt(prog[index], 10);
                if(index < prog.length-1 && prog[index+1] in registers){
                    if(prog[index+1] == prog[index]){
                        registers[keyRegister] = 0;
                    }else{
                        registers[parseInt(prog[index+1], 10)] = registers[keyRegister];
                    }
                }
            }else{
                switch(prog[index]){
                    case "0":
                        if(registers[keyRegister] == 0){
                            index += 2;
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
                        if(index < prog.length-1 && prog[index+1] == "."){
                            index+=2;
                            let integerValue = "";
                            while(index < prog.length-1 && prog[index] != "."){
                                integerValue += prog[index];
                                index += 1;
                            }
                            console.log(integerValue);
                            registers[keyRegister] = parseInt(integerValue);
                        }else{
                            let userInput = NaN
                            while (true){
                                userInput = parseInt(prompt("Input an integer value", "0"))
                                if (userInput == null){
                                    userInput = 0
                                }
                                if (!isNaN(userInput)){
                                    break;
                                }
                                alert("Please submit a valid integer response");

                            }
                            registers[keyRegister] = userInput;
                        }
                        break;
                    default:
                        break;
                }
            }
        
        index++;

    }

    toggleLoader(false);

}

function toggleLoader(toggle){
    if (toggle){
        let loadingSymbol = document.createElement("DIV");
        loadingSymbol.id = "loader";
        document.getElementById("program_area").appendChild(loadingSymbol);
        setTimeout(run, 1);
    }else{
        document.getElementById("loader").remove();
    }
}

function clearProgramOutput(){
    document.getElementById("program_output").innerText = "";
}