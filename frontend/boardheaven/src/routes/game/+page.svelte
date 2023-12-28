<script>
    import Wuerfel from '$lib/images/Wuerfel.png';
</script>
<style>
    .button-container {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background-color: rgb(165, 165, 165);
        border: none;
        border-radius: 40px;
        color: white;
        cursor: pointer;
    }
    .board {
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        grid-template-rows: repeat(11, 1fr);
        gap: 10px;
    }

    .circle {
        width: 70px;
        height: 70px;
        border: 2px solid black;
        border-radius: 50%;
    }
    .circleGreen {
        width: 70px;
        height: 70px;
        border: 6px solid green;
        border-radius: 50%;
    }
    .circleRed {
        width: 70px;
        height: 70px;
        border: 6px solid red;
        border-radius: 50%;
    }   
    .circleBlack {
        width: 70px;
        height: 70px;
        border: 6px solid black;
        border-radius: 50%;
    }
    .circleYellow {
        width: 70px;
        height: 70px;
        border: 6px solid yellow;
        border-radius: 50%;
    }
    .circleFullGreen {
        width: 70px;
        height: 70px;
        background-color: green;
        border-radius: 50%;
    }
    .circleFullRed {
        width: 70px;
        height: 70px;
        background-color: red;
        border-radius: 50%;
    }
    .circleFullBlack {
        width: 70px;
        height: 70px;
        background-color: black;
        border-radius: 50%;
    }
    .circleFullYellow {
        width: 70px;
        height: 70px;
        background-color: yellow;
        border-radius: 50%;
    }

.circle:nth-child(1) { grid-column: 5; grid-row: 1; }
.circle:nth-child(2) { grid-column: 6; grid-row: 1; }
.circleGreen:nth-child(3) { grid-column: 7; grid-row: 1; }
.circle:nth-child(4) { grid-column: 7; grid-row: 2; }
.circle:nth-child(5) { grid-column: 7; grid-row: 3; }
.circle:nth-child(6) { grid-column: 7; grid-row: 4; }
.circle:nth-child(7) { grid-column: 7; grid-row: 5; }
.circle:nth-child(8) { grid-column: 8; grid-row: 5; }
.circle:nth-child(9) { grid-column: 9; grid-row: 5; }
.circle:nth-child(10) { grid-column: 10; grid-row: 5; }
.circle:nth-child(11) { grid-column: 11; grid-row: 5; }
.circle:nth-child(12) { grid-column: 11; grid-row: 6; }
.circleRed:nth-child(13) { grid-column: 11; grid-row: 7; }
.circle:nth-child(14) { grid-column: 10; grid-row: 7; }
.circle:nth-child(15) { grid-column: 9; grid-row: 7; }
.circle:nth-child(16) { grid-column: 8; grid-row: 7; }
.circle:nth-child(17) { grid-column: 7; grid-row: 7; }
.circle:nth-child(18) { grid-column: 7; grid-row: 8; }
.circle:nth-child(19) { grid-column: 7; grid-row: 9; }
.circle:nth-child(20) { grid-column: 7; grid-row: 10; }
.circle:nth-child(21) { grid-column: 7; grid-row: 11; }
.circle:nth-child(22) { grid-column: 6; grid-row: 11; }
.circleBlack:nth-child(23) { grid-column: 5; grid-row: 11; }
.circle:nth-child(24) { grid-column: 5; grid-row: 10; }
.circle:nth-child(25) { grid-column: 5; grid-row: 9; }
.circle:nth-child(26) { grid-column: 5; grid-row: 8; }
.circle:nth-child(27) { grid-column: 5; grid-row: 7; }
.circle:nth-child(28) { grid-column: 4; grid-row: 7; }
.circle:nth-child(29) { grid-column: 3; grid-row: 7; }
.circle:nth-child(30) { grid-column: 2; grid-row: 7; }
.circle:nth-child(31) { grid-column: 1; grid-row: 7; }
.circle:nth-child(32) { grid-column: 1; grid-row: 6; }
.circleYellow:nth-child(33) { grid-column: 1; grid-row: 5; }
.circle:nth-child(34) { grid-column: 2; grid-row: 5; }
.circle:nth-child(35) { grid-column: 3; grid-row: 5; }
.circle:nth-child(36) { grid-column: 4; grid-row: 5; }
.circle:nth-child(37) { grid-column: 5; grid-row: 5; }
.circle:nth-child(38) { grid-column: 5; grid-row: 4; }
.circle:nth-child(39) { grid-column: 5; grid-row: 3; }
.circle:nth-child(40) { grid-column: 5; grid-row: 2; }

/*
Full Circles
*/
.circleFullGreen:nth-child(41) { grid-column: 6; grid-row: 2; }
.circleFullGreen:nth-child(42) { grid-column: 6; grid-row: 3; }
.circleFullGreen:nth-child(43) { grid-column: 6; grid-row: 4; }
.circleFullGreen:nth-child(44) { grid-column: 6; grid-row: 5; }

.circleFullRed:nth-child(45) { grid-column: 7; grid-row: 6; }
.circleFullRed:nth-child(46) { grid-column: 8; grid-row: 6; }
.circleFullRed:nth-child(47) { grid-column: 9; grid-row: 6; }
.circleFullRed:nth-child(48) { grid-column: 10; grid-row: 6; }

.circleFullBlack:nth-child(49) { grid-column: 6; grid-row: 7; }
.circleFullBlack:nth-child(50) { grid-column: 6; grid-row: 8; }
.circleFullBlack:nth-child(51) { grid-column: 6; grid-row: 9; }
.circleFullBlack:nth-child(52) { grid-column: 6; grid-row: 10; }

.circleFullYellow:nth-child(53) { grid-column: 2; grid-row: 6; }
.circleFullYellow:nth-child(54) { grid-column: 3; grid-row: 6; }
.circleFullYellow:nth-child(55) { grid-column: 4; grid-row: 6; }
.circleFullYellow:nth-child(56) { grid-column: 5; grid-row: 6; }

/*
Home Circles
*/
.circleGreen:nth-child(57) { grid-column: 10; grid-row: 1; }
.circleGreen:nth-child(58) { grid-column: 11; grid-row: 1; }
.circleGreen:nth-child(59) { grid-column: 10; grid-row: 2; }
.circleGreen:nth-child(60) { grid-column: 11; grid-row: 2; }

.circleRed:nth-child(61) { grid-column: 10; grid-row: 10; }
.circleRed:nth-child(62) { grid-column: 11; grid-row: 10; }
.circleRed:nth-child(63) { grid-column: 10; grid-row: 11; }
.circleRed:nth-child(64) { grid-column: 11; grid-row: 11; }

.circleBlack:nth-child(65) { grid-column: 1; grid-row: 10; }
.circleBlack:nth-child(66) { grid-column: 2; grid-row: 10; }
.circleBlack:nth-child(67) { grid-column: 1; grid-row: 11; }
.circleBlack:nth-child(68) { grid-column: 2; grid-row: 11; }

.circleYellow:nth-child(69) { grid-column: 1; grid-row: 1; }
.circleYellow:nth-child(70) { grid-column: 2; grid-row: 1; }
.circleYellow:nth-child(71) { grid-column: 1; grid-row: 2; }
.circleYellow:nth-child(72) { grid-column: 2; grid-row: 2; }


</style>
<div>
    <div class="board">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circleGreen"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circleRed"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circleBlack"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circleYellow"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    
        <div class="circleFullGreen"></div>
        <div class="circleFullGreen"></div>
        <div class="circleFullGreen"></div>
        <div class="circleFullGreen"></div>
    
        <div class="circleFullRed"></div>
        <div class="circleFullRed"></div>
        <div class="circleFullRed"></div>
        <div class="circleFullRed"></div>
    
        <div class="circleFullBlack"></div>
        <div class="circleFullBlack"></div>
        <div class="circleFullBlack"></div>
        <div class="circleFullBlack"></div>
    
        <div class="circleFullYellow"></div>
        <div class="circleFullYellow"></div>
        <div class="circleFullYellow"></div>
        <div class="circleFullYellow"></div>

        <div class="circleGreen"></div>
        <div class="circleGreen"></div>
        <div class="circleGreen"></div>
        <div class="circleGreen"></div>

        <div class="circleRed"></div>
        <div class="circleRed"></div>
        <div class="circleRed"></div>
        <div class="circleRed"></div>

        <div class="circleBlack"></div>
        <div class="circleBlack"></div>
        <div class="circleBlack"></div>
        <div class="circleBlack"></div>

        <div class="circleYellow"></div>
        <div class="circleYellow"></div>
        <div class="circleYellow"></div>
        <div class="circleYellow"></div>
    </div>

    <button class="button-container">
        <img src={Wuerfel} alt="Würfel bild" />
        <h2>Würfeln</h2>
    </button> 
</div>