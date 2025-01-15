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
function choose(M_Tile){
    if(ChooseOffOn){
        M_Tile--;//M_Tile je v choose nastavena o 1 víc, takhle se nebude muset furt psát M_Tile - 1;
        choosenMTile = M_Tile;
        TurnOffOn = true;
        ChooseOffOn = false;
        setAroundColor(choosenMTile, "red");
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
            ChooseOffOn = true;
        }
    }
}
//Kontrolovač jestli někdo nevyhrál v daném MTile;
function controlM_Tile(M_Tile){

}