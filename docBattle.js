'use strict';
// 敵・味方のステータス決定用定数
// 「すばやさ」値としても使用
const enemy = Math.random();
const me = Math.random();

// 敵・味方のステータス math.floorで0にならないよう、1の位が9の定数を使用
let [enemyHP, enemyATC] = [Math.floor(109*enemy), Math.floor(19*enemy)];
let [meHP, meATC] = [Math.floor(109*me), Math.floor(19*me)];

console.log(`私の体力${meHP}`);
console.log(`敵の体力${enemyHP}`);
console.log(`私のすばやさ${me}`);
console.log(`敵のすばやさ${enemy}`);

//メッセージボックスの格納
const msg = document.getElementById('msg'); 

// スタートボタンを押したとき
document.getElementById('start').onclick = function(){
  document.getElementById('img').src = 'dragon.png';
  msg.textContent = 'ドラゴンが現れた！';
}

// リセットボタンを押したとき
document.getElementById('reset').onclick = function(){
  document.getElementById('anker').href = 'docBattle.html';
}

// 敵の攻撃時
const enemyTurn = function(){
  meHP -= enemyATC;
  console.log(`私の体力${meHP}`);
  msg.textContent= `ドラゴンの攻撃！あなたに${enemyATC}のダメージ！！`;
}

// 私の攻撃時
const meTurn = function(){
  enemyHP -= meATC;
  console.log(`敵の体力${enemyHP}`);
  msg.textContent = `あなたの攻撃！ドラゴンに${meATC}のダメージ！！`;
}

// ゲーム終了判定・処理
const finish = function(){
  if(enemyHP <= 0){
    msg.textContent = 'ドラゴンを倒した！！';
  }else if(meHP <= 0){
    msg.textContent = '目の前が真っ暗になった...';
  }
}

// 攻撃ボタンを押したとき
document.getElementById('attack').onclick = function(){
  if(enemyHP > 0 && meHP > 0){ //両方の体力が1以上
    if(enemyHP > meATC && meHP > enemyATC){ //終了まで2ターン以上かかるとき
      if(enemy > me){
        enemyTurn();
        setTimeout(meTurn, 1500); 
      }else{
        meTurn();
        setTimeout(enemyTurn, 1500);
      }  
    }else if(enemyHP <= meATC){ //あなたの次の攻撃でドラゴンが死ぬとき
      if(enemy > me){
        enemyTurn();
        setTimeout(meTurn, 1500); 
      }else{
        meTurn();
      } 
    }else if(meHP <= enemyATC){ //ドラゴンの次の攻撃であなたが死ぬとき
      if(enemy > me){
        enemyTurn();
      }else{
        meTurn();
        setTimeout(enemyTurn, 1500);
      }  
    }
    finish();
  }
};

