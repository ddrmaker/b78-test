// Simu B78 : accès privé pendant la période de test.
// Pour ouvrir le jeu à tout le monde, il suffit de SUPPRIMER ce fichier (acces.js).
(function(){
  var H='d3e04fc52ecdeb088127e6954f2a383fdbb1c38da01a4cbcd1bd31639d75defe';
  var m=document.createElement('meta');m.name='robots';m.content='noindex,nofollow';document.head.appendChild(m);
  if(/[?&]manette=/.test(location.search))return;                 // la manette du téléphone passe
  if(!window.isSecureContext||!window.crypto||!crypto.subtle)return; // test local sur le Mac (http)
  try{if(localStorage.getItem('b78acces')===H)return;}catch(e){}
  var d=document.createElement('div');d.id='gate';
  d.innerHTML='<style>#gate{position:fixed;inset:0;z-index:2147483647;background:#0c1015;color:#f4f2ec;display:grid;place-items:center;font:16px system-ui,sans-serif;padding:16px}#gate form{background:#151b22;border:1px solid #2a323c;border-radius:16px;padding:22px;max-width:340px;width:100%;box-sizing:border-box;text-align:center}#gate h1{margin:0 0 6px;font-size:22px}#gate p{margin:0 0 14px;color:#9aa4ae;font-size:14px}#gate input{width:100%;box-sizing:border-box;font-size:18px;padding:10px 12px;border-radius:10px;border:1px solid #2a323c;background:#0c1015;color:#fff;margin-bottom:10px}#gate button{width:100%;font-size:17px;font-weight:700;padding:11px;border-radius:10px;border:0;background:#ffcc1a;color:#111}#gate .err{color:#ff6b6b;min-height:18px;margin:8px 0 0;font-size:14px}</style>'+
    '<form><h1>Simu B78</h1><p>Version de test privée.</p><input type="password" autocomplete="current-password" placeholder="Code d\'accès" aria-label="Code d\'accès"><button type="submit">Entrer</button><div class="err"></div></form>';
  document.body.appendChild(d);
  var inp=d.querySelector('input'),err=d.querySelector('.err');
  ['keydown','keyup','keypress'].forEach(function(t){d.addEventListener(t,function(e){e.stopPropagation();});});
  setTimeout(function(){inp.focus();},50);
  d.querySelector('form').addEventListener('submit',function(e){e.preventDefault();
    crypto.subtle.digest('SHA-256',new TextEncoder().encode(inp.value.trim())).then(function(b){
      var h=Array.prototype.map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2);}).join('');
      if(h===H){try{localStorage.setItem('b78acces',H);}catch(_){}d.remove();}else{err.textContent='Code incorrect.';inp.value='';}});});
})();
