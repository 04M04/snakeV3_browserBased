const playerTable = document.getElementById("playerTabel");

const update_playerTable = (snakes = []) => {
    let temp_players = "";

    if (snakes != []) {
        snakes.map(snake => {
            temp_player = "";

            temp_player += "<td>" + 0 + "</td>";
            temp_player += "<td>" + snake.color + "</td>";
            temp_player += "<td>" + snake.user_name + "</td>";
            temp_player += "<td>" + snake.points + "</td>";
            // temp_player += "<td>" + snake.body.length + "</td>";
            if(snake.items.length == 0){
                temp_player += "<td>" + "</td>";
                temp_player += "<td>" + "</td>";
            }

            if(snake.items.length > 0) {
                temp_player += "<td>" + snake.items[0] + "</td>"; 
            }

            if(snake.items.length > 1) {
                temp_player += "<td>" + snake.items[1] + "</td>";
            }

            temp_players += "<tr>" + temp_player + "</tr>";
        });
    }
    playerTable.innerHTML = temp_players;
};
