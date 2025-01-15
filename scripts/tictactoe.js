let playerOnTurn = 1;
let DataArray = [];
//Proměná co při false bude blokovat fungovaní klikací funkce
let TurnOffOn = false;
document.addEventListener("DOMContentLoaded", function () {
    drawBoard();
    StartPlayerTurn();
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

            controlM_Tile(M_Tile);
            StartPlayerTurn();
        }
    }
}
//Funkce co vždycky po změně tahu bude zahájena
function StartPlayerTurn(){
    TurnOffOn = true;

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

}
//Kontrolovač jestli někdo nevyhrál v daném MTile;
function controlM_Tile(M_Tile){

}