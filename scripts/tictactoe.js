let playerOnTurn = 1;
let DataArray = [];
//Proměná co při false bude blokovat fungovaní klikací funkce
let choosenMTile = -1; //-1 znamená nevybráno
let TurnOffOn = false;
let ChooseOffOn = false;
document.addEventListener("DOMContentLoaded", function () {
    drawBoard();
    StartPlayerTurn();
    ChooseOffOn = true;
});
let bannedMtiles = [];
//Funkce vykreslující herní plochu + vytvoření datové proměnné
function drawBoard(){
    for(let x = 0; x < 9; x++){
        DataArray.push([]);
        let text = ``;
        //Hodnota y je brána je políčko na které se bude klikat
        let y = 0;
        for(let i1 = 0; i1 < 3; i1++){
            DataArray[x].push([]);
            text += `<div class="row">`;
            for(let i2 = 0; i2 < 3; i2++){
                DataArray[x][i1].push(false);
                //Potřeba sem poté přidat onclick něco, aby pole interagovali
                text += `<div class="tile" id="M${x + 1}T${y}" onclick="revealTile(${x}, ${y})" ></div>`;
                y++;
            }
            text += `</div>`;
        }
        document.getElementById(`M${x + 1}`).innerHTML = text;
    }
    //Potřeba po dokončení odstranit
    console.log(DataArray);
}

//Funkce která bude zařizovat co se s políčkem stane po kliknutí na něj
function revealTile(M_Tile, T_Tile){
    if(TurnOffOn){
        if(typeof DataArray[M_Tile] === "object"){
            if(choosenMTile === M_Tile){
                let radek = 0;
                radek = Math.floor(T_Tile / 3);
                T_Tile -= radek * 3;
                if(!DataArray[M_Tile][radek][T_Tile]){
                    DataArray[M_Tile][radek][T_Tile] = playerOnTurn + 1;
                    //Nahození znaku do .what
                    if(playerOnTurn){
                        document.getElementById(`M${M_Tile +1}T${T_Tile + (radek * 3)}`).innerHTML = `<div class="textT">○</div>`;
                    }else{
                        document.getElementById(`M${M_Tile +1}T${T_Tile + (radek * 3)}`).innerHTML = `<div class="textT">×</div>`;
                    }
                    setAroundColor(choosenMTile, "black");
                    choosenMTile = T_Tile + (radek * 3);
                    setAroundColor(choosenMTile, "red");
                    controlM_Tile(M_Tile);
                    StartPlayerTurn();
                }
            }
        }
    }
}
function choose(M_Tile){
    if(!bannedMtiles.includes(M_Tile - 1)){
        if(ChooseOffOn){
            M_Tile--;//M_Tile je v choose nastavena o 1 víc, takhle se nebude muset furt psát M_Tile - 1;
            choosenMTile = M_Tile;
            TurnOffOn = true;
            ChooseOffOn = false;
            setAroundColor(choosenMTile, "red");
        }
    }
}
//Měnič barvy MTile
function setAroundColor(M_Tile, color){
    document.getElementById(`M${M_Tile+1}`).style.borderColor = color;
}
//Funkce co vždycky po změně tahu bude zahájena
function StartPlayerTurn(){
    //Změna hráče
    playerOnTurn++;
    if(playerOnTurn === 2){
        playerOnTurn = 0;
    }


    //Nahození znaku do .what
    if(playerOnTurn){
        document.querySelector(".what").innerHTML = "○";
    }else{
        document.querySelector(".what").innerHTML = "×";
    }

    //Kontrola zda v daném poli jde  ještě vůbec hýbat
    if(choosenMTile > -1){
        if(bannedMtiles.includes(choosenMTile)){
            setAroundColor(choosenMTile, "black");
            TurnOffOn = false;
            ChooseOffOn = true;
            console.log("aaa");
        }else{
            let kontrolka = false;
            for(let x = 0; x < 9; x++){
                let radek = 0;
                radek = Math.floor(x / 3);
                let y = x - (radek * 3);
                if(!DataArray[choosenMTile][radek][y]){
                    kontrolka = true;
                }
            }
            if(!kontrolka){
                setAroundColor(choosenMTile, "black");
                TurnOffOn = false;
                ChooseOffOn = true;
                DataArray[choosenMTile] = 0;
                bannedMtiles.push(choosenMTile);
            }
        }
    }else{
        ChooseOffOn = false;
    }
    
    controlFinal();
}
//Kontrolovač jestli někdo nevyhrál v daném MTile;
function controlM_Tile(M_Tile){
    let kontrolka = false;
    let winning = 0;
    //Kontrola řádků
    for(let x = 0; x < 3; x++){
        let cislo = DataArray[M_Tile][x][0];
        let counter = 0;
        for(let y = 0; y < 3; y++){
            if(DataArray[M_Tile][x][y] !== false){
                if(DataArray[M_Tile][x][y] === cislo){
                    counter++;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
        if(counter === 3){
            kontrolka = true;
            winning = cislo;
            break;
        }
    }
    //Kontrola řádků
    for(let x = 0; x < 3; x++){
        let cislo = DataArray[M_Tile][0][x];
        let counter = 0;
        for(let y = 0; y < 3; y++){
            if(DataArray[M_Tile][y][x] !== false){
                if(DataArray[M_Tile][y][x] === cislo){
                    counter++;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
        if(counter === 3){
            kontrolka = true;
            winning = cislo;
            break;
        }
    }
    //Kontrola křížová 1
    let cisloAAA = DataArray[M_Tile][0][0];
    let counterAAA = 0;
    for(let x = 0; x < 3; x++){
        if(DataArray[M_Tile][x][x] !== false){
            if(DataArray[M_Tile][x][x] === cisloAAA){
                counterAAA++;
            }else{
                break;
            }
        }
    }
    if(counterAAA === 3){
        kontrolka = true;
        winning = cisloAAA;
    }
    //Kontrola křížová 2
    let cisloBBB = DataArray[M_Tile][0][2];
    let counterBBB = 0;
    for(let x = 0; x < 3; x++){
        if(DataArray[M_Tile][x][2 - x] !== false){
            if(DataArray[M_Tile][x][2 - x] === cisloBBB){
                counterBBB++;
            }else{
                break;
            }
        }
    }
    if(counterBBB === 3){
        kontrolka = true;
        winning = cisloBBB;
    }

    if(kontrolka){
        DataArray[M_Tile] = winning;
        console.log(DataArray[M_Tile]);
        if(winning === 1){
            document.getElementById(`M${M_Tile +1}`).innerHTML = `<div class="textM">×</div>`;
        }else{
            document.getElementById(`M${M_Tile +1}`).innerHTML = `<div class="textM">○</div>`;
        }
        bannedMtiles.push(M_Tile);
    }
}
//Kontrolovač jestli někdo nevyhrál v daném MTile;
function controlFinal(){
    let doneArray = [];
    let z = 0;
    for(let x = 0; x < 3; x++){
        doneArray.push([]);
        for(let y = 0; y < 3; y++){
            if(typeof DataArray[z] !== "object"){
                doneArray[x].push(DataArray[z]);
            }else{
                doneArray[x].push(false);
            }
            z++;
        }
    }


    //Kontrola řádků
    for(let x = 0; x < 3; x++){
        let cislo = doneArray[x][0];
        let counter = 0;
        for(let y = 0; y < 3; y++){
            if(doneArray[x][y] !== false && doneArray[x][y] !== 0){
                if(doneArray[x][y] === cislo){
                    counter++;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
        if(counter === 3){
            kontrolka = true;
            winning = cislo;
            win(winning);
            break;
        }
    }
    //Kontrola řádků
    for(let x = 0; x < 3; x++){
        let cislo = doneArray[0][x];
        let counter = 0;
        for(let y = 0; y < 3; y++){
            if(doneArray[y][x] !== false && doneArray[x][y] !== 0){
                if(doneArray[y][x] === cislo){
                    counter++;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
        if(counter === 3){
            kontrolka = true;
            winning = cislo;
            win(winning);
            break;
        }
    }

    //Kontrola křížová 1
    let cisloAAA = doneArray[0][0];
    let counterAAA = 0;
    for(let x = 0; x < 3; x++){
        if(doneArray[x][x] !== false){
            if(doneArray[x][x] === cisloAAA){
                counterAAA++;
            }else{
                break;
            }
        }
    }
    if(counterAAA === 3){
        kontrolka = true;
        winning = cisloAAA;
        win(winning);
    }
    //Kontrola křížová 2
    let cisloBBB = doneArray[0][2];
    let counterBBB = 0;
    for(let x = 0; x < 3; x++){
        if(doneArray[x][2 - x] !== false){
            if(doneArray[x][2 - x] === cisloBBB){
                counterBBB++;
            }else{
                break;
            }
        }
    }
    if(counterBBB === 3){
        kontrolka = true;
        winning = cisloBBB;
        win(winning);
    }


    //Kontrola ucpanosti
    let counter2 = 0;
    for(let x = 0; x < 3; x++){
        if(!doneArray[x].includes(false)){
            counter2++;
        }
    }
    if(counter2 === 3){
        alert("Nikdo nevyhrál")
    }

}
function win(cislo){
    ChooseOffOn = false;
    TurnOffOn = false;
    if(cislo === 1){
        alert("Vyhrál ×");
    }else{
        alert("Vyhrál ○");
    }

}