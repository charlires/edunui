/**
 * User: carlos_andonaegui
 * Date: 7/17/13
 */
// Related Image Memory Game
// copyright Stephen Chapman, 28th February 2006, 22nd May 2010
// you may copy this script provided that you retain the copyright notice
(function () {
    var back = 'q.png';
    var tile = [
        ['a.png', 'graphics\/img0a.gif'],
        ['b.png', 'graphics\/img1a.gif'],
        ['c.png', 'graphics\/img2a.gif'],
        ['d.png', 'graphics\/img3a.gif'],
        ['e.png', 'graphics\/img4a.gif'],
        ['graphics\/img5.gif', 'graphics\/img5a.gif'],
        ['graphics\/img6.gif', 'graphics\/img6a.gif'],
        ['graphics\/img7.gif', 'graphics\/img7a.gif'],
        ['graphics\/img8.gif', 'graphics\/img8a.gif'],
        ['graphics\/img9.gif', 'graphics\/img9a.gif'],
        ['graphics\/img10.gif', 'graphics\/img10a.gif'],
        ['graphics\/img11.gif', 'graphics\/img11a.gif'],
        ['graphics\/img12.gif', 'graphics\/img12a.gif'],
        ['graphics\/img13.gif', 'graphics\/img13a.gif'],
        ['graphics\/img14.gif', 'graphics\/img14a.gif']
    ];

    function randOrd(a, b) {
        return (Math.round(Math.random()) - 0.5);
    }

    var im = [];
    var tilen = [];
    for (var i = 0; i < 15; i++) {
        im[i] = new Image();
        im[i].src = tile[i];
        tilen[i] = [];
        tilen[i][0] = '<img src="img/letras/' + tile[i][0] + '" width="100" height="100" alt="tile" \/>';
        tilen[i][1] = i;
        tilen[i + 15] = [];
        tilen[i + 15][0] = '<img src="img/letras/' + tile[i][1] + '" width="100" height="100" alt="tile" \/>';
        tilen[i + 15][1] = i;
    }
    function displayBack(i) {
        document.getElementById('t' + i).innerHTML = '<img src="img/letras/' + back + '" width="100" height="100" alt="back" \/>';
        document.getElementById('t' + i).onclick = function () {
            disp(i)
        };
    }

    var ch1, ch2, tmr, tno, tid, cid, cnt;

    function begin() {
        for (var i = 0; i <= 29; i++) displayBack(i);
        clearInterval(tid);
        tmr = tno = cnt = 0;
        tilen.sort(randOrd);
        cntr();
        tid = setInterval(cntr, 1000);
    }

    function cntr() {
        var min = Math.floor(tmr / 60);
        var sec = tmr % 60;
        document.getElementById('cnt').value = min + ':' + (sec < 10 ? '0' : '') + sec;
        tmr++;
    }

    function disp(sel) {
        if (tno > 1) {
            clearTimeout(cid);
            conceal();
        }
        document.getElementById('t' + sel).innerHTML = tilen[sel][0];
        if (tno == 0) ch1 = sel; else {
            ch2 = sel;
            cid = setTimeout(conceal, 900);
        }
        tno++;
    }

    function conceal() {
        tno = 0;
        if (tilen[ch1][1] != tilen[ch2][1]) {
            displayBack(ch1);
            displayBack(ch2);
        } else cnt++;
        if (cnt >= 15) clearInterval(tid);
    }

    function createGame(nm) {
        var d = document.createElement('div');
        d.align = 'center';
        var t = document.createElement('table');
        t.cellpadding = 0;
        t.cellspacing = 0;
        t.borders = 0;
        for (var a = 0; a <= 5; a++) {
            t.insertRow(a);
            for (var b = 0; b <= 4; b++) {
                t.rows[a].insertCell(b);
                t.rows[a].cells[b].className = 'blk';
                t.rows[a].cells[b].id = 't' + ((5 * a) + b);
                t.rows[a].cells[b].align = 'center';
            }
        }
        d.appendChild(t);
        var f = document.createElement('form');
        f.id = 'mem';
        var bt = document.createElement('input');
        bt.type = 'button';
        bt.id = 'cnt';
        bt.value = '0.00';
        bt.className = "btn btn-large";
        bt.onclick = begin;
        f.appendChild(bt);
        d.appendChild(f);
        document.getElementById(nm).appendChild(d);
    }

    createGame('memory');
    begin();
})();